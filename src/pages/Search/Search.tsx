import React, {useContext, useEffect, useState} from 'react';
import styles from "./styles";
import {AppContext} from "../../components/App/App";
import {useHistory} from 'react-router-dom';
import Attraction, {AttractionWithDistanceFromUser} from "../../types/Attraction";
import {
    AttractionType,
    getAttractionsSortedByDistanceFromUserLocation,
    getAttractionWithDistanceFromUser,
    getMostCommonAttractionTypeIn40KMRadius
} from "../../utils/attractions";
import {useToggle} from "react-use";
import axios from "axios";
import {GetAttractionsBody} from "../../../server/apiRoutes";

const LOCAL_STORAGE_FAVORITES_KEY = 'favoriteAttractions';
type FavoriteAttractions = Record<Attraction['Id'], boolean>;

const Search: React.FC = () => {
    const classes = styles();
    const history = useHistory();
    const {userLocation} = useContext(AppContext);

    const [attractions, setAttractions] = useState<AttractionWithDistanceFromUser[] | undefined>(undefined);
    const [mostCommonAttractionTypeIn40KMRadius, setMostCommonAttractionTypeIn40KMRadius] = useState<AttractionType | undefined>(undefined);
    const [isMostCommonAttractionTypeSelected, toggleIsMostCommonAttractionTypeSelected] = useToggle(false);
    const [favoriteAttractions, setFavoriteAttractions] = useState<FavoriteAttractions>(JSON.parse(localStorage.getItem(LOCAL_STORAGE_FAVORITES_KEY) || "{}") as FavoriteAttractions);

    useEffect(function fetchAttractionsOnMount(): void {
        const fetchAttractions = async (): Promise<void> => {
            const response = await axios.get<GetAttractionsBody>('api/getAttractions');
            const unorderedAttractions = response?.data?.list;
            if (!unorderedAttractions) {
                console.error("couldn't fetch the attractions list!");
            } else if (!userLocation) {
                console.error('user location was not set!')
                return;
            } else {
                const unsortedAttractionsWithDistanceFromUser = unorderedAttractions.map((attraction) => (getAttractionWithDistanceFromUser(userLocation, attraction)));
                const mostCommonAttractionTypeIn40KMRadius = getMostCommonAttractionTypeIn40KMRadius(unsortedAttractionsWithDistanceFromUser);
                const unsortedAttractions = getAttractionsSortedByDistanceFromUserLocation(userLocation, unsortedAttractionsWithDistanceFromUser);

                setMostCommonAttractionTypeIn40KMRadius(mostCommonAttractionTypeIn40KMRadius);
                setAttractions(unsortedAttractions)
            }
        }

        fetchAttractions().catch((e) => {
            console.error(e);
        })
        // will also re-fetch if userLocation changes (shouldn't happen)
    }, [userLocation])
    const isAttractionFavorite = (attraction: Attraction): boolean => (Boolean(favoriteAttractions[attraction.Id]));
    const toggleAttractionInFavorites = ({Id}: Attraction): void => {
        setFavoriteAttractions((currentFavoriteAttractions) => ({
            ...currentFavoriteAttractions,
            [Id]: !currentFavoriteAttractions[Id]
        }));
    }
    useEffect(function syncFavoriteAttractionsToLocalStorage(): void {
        localStorage.setItem(LOCAL_STORAGE_FAVORITES_KEY, JSON.stringify(favoriteAttractions));
    }, [favoriteAttractions])

    if (userLocation === undefined) {
        history.push("/");
    }
    return (
        <div>
            {
                (attractions === undefined ?
                    (
                        <div>loading...</div>
                    ) : (
                        <div>
                            <div>
                                {mostCommonAttractionTypeIn40KMRadius ? (
                                    <div onClick={toggleIsMostCommonAttractionTypeSelected}
                                         className={classes.mostCommonAttractionType}
                                         style={{backgroundColor: isMostCommonAttractionTypeSelected ? 'lightblue' : 'white'}}>
                                        The most common attraction type in 40 km radius
                                        is: {mostCommonAttractionTypeIn40KMRadius}
                                    </div>
                                ) : (
                                    <div>
                                        There are no attractions in a 40 km radius
                                    </div>
                                )}
                            </div>
                            <div>
                                {
                                    (
                                        isMostCommonAttractionTypeSelected ?
                                            (attractions.filter((attraction) => (attraction.Attraction_Type === mostCommonAttractionTypeIn40KMRadius))) :
                                            (attractions)
                                    )
                                        .map((attraction) => (
                                            <div className={classes.attractionContainer} key={attraction.Id}>
                                                <div>{attraction.Name}</div>
                                                <div>{attraction.Id}</div>
                                                <div>{attraction.Address}</div>
                                                <div>{attraction.Opening_Hours}</div>
                                                <div>{attraction.URL}</div>
                                                <div
                                                    onClick={() => (toggleAttractionInFavorites(attraction))}
                                                    className={classes.addToFavorites}
                                                    style={{
                                                        backgroundColor: isAttractionFavorite(attraction) ? 'lightblue' : 'white'
                                                    }}>
                                                    Add to favorites
                                                </div>
                                            </div>
                                        ))
                                }
                            </div>
                        </div>
                    ))
            }
        </div>
    );
}

export default Search;