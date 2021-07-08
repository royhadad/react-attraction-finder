import React, {useContext, useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {useToggle} from "react-use";
import axios from "axios";
import styles from "./styles";
import {AppContext} from "../../components/App/App";
import Attraction, {AttractionWithDistanceFromUser} from "../../types/Attraction";
import {
    AttractionType,
    getAttractionsSortedByDistanceFromUserLocation,
    getAttractionWithDistanceFromUser,
    getMostCommonAttractionTypeIn40KMRadius
} from "../../utils/attractions";
import {GetAttractionsBody} from "../../../server/apiRoutes";
import text from "./text";

const LOCAL_STORAGE_FAVORITES_KEY = 'favoriteAttractions';
type FavoriteAttractions = Record<Attraction['Id'], boolean>;

const Search: React.FC = () => {
    const classes = styles();
    const history = useHistory();
    const {userLocation} = useContext(AppContext);

    const [attractions, setAttractions] = useState<AttractionWithDistanceFromUser[] | undefined>(undefined);
    const [mostCommonAttractionTypeIn40KMRadius, setMostCommonAttractionTypeIn40KMRadius] = useState<AttractionType | undefined>(undefined);
    const [isMostCommonAttractionTypeSelected, toggleIsMostCommonAttractionTypeSelected] = useToggle(false);
    // Gets the items from local storage on initial render
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
        // will also re-fetch if userLocation changes (shouldn't happen without a refresh)
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
                        <div>{text.he.loading}</div>
                    ) : (
                        <div>
                            <div>
                                {mostCommonAttractionTypeIn40KMRadius ? (
                                    <div
                                        onClick={toggleIsMostCommonAttractionTypeSelected}
                                        className={classes.mostCommonAttractionType}
                                        style={{backgroundColor: isMostCommonAttractionTypeSelected ? 'lightblue' : undefined}}
                                    >
                                        {text.he.mostCommonAttractionTypeIn40KmRadius}
                                        &nbsp;
                                        <span className={classes.mostCommonAttractionTypeSelected}>
                                            {mostCommonAttractionTypeIn40KMRadius}
                                        </span>
                                        {isMostCommonAttractionTypeSelected && (
                                            <>&nbsp;({text.he.showing}&nbsp;{mostCommonAttractionTypeIn40KMRadius}&nbsp;{text.he.only})</>
                                        )}
                                    </div>
                                ) : (
                                    <div>
                                        {text.he.noAttractionsFoundIn40KmRadius}
                                    </div>
                                )}
                            </div>
                            <div className={classes.attractionsList}>
                                {
                                    (
                                        // Might consider optimizing by only filtering once
                                        isMostCommonAttractionTypeSelected ?
                                            (attractions.filter((attraction) => (attraction.Attraction_Type === mostCommonAttractionTypeIn40KMRadius))) :
                                            (attractions)
                                    )
                                        .map((attraction) => (
                                            <div className={classes.attractionsListItem} key={attraction.Id}>
                                                <div>{text.he.attractionName}&nbsp;{attraction.Name}</div>
                                                <div>{text.he.attractionId}&nbsp;{attraction.Id}</div>
                                                <div>{text.he.attractionAddress}&nbsp;{attraction.Address}</div>
                                                <div>{text.he.attractionOpeningHours}&nbsp;{attraction.Opening_Hours}</div>
                                                <div>
                                                    <a href={attraction.URL}
                                                       className={classes.websiteLink}>{text.he.toWebsite}</a>
                                                </div>
                                                {isMostCommonAttractionTypeSelected && (
                                                    <div>{text.he.distanceFromYourLocation}&nbsp;{Math.round(attraction.distanceFromUser)}&nbsp;{text.he.km}</div>
                                                )}
                                                <div
                                                    onClick={() => (toggleAttractionInFavorites(attraction))}
                                                    className={classes.addToFavorites}
                                                    style={{backgroundColor: isAttractionFavorite(attraction) ? 'lightblue' : undefined}}
                                                >
                                                    {isAttractionFavorite(attraction) ? (text.he.removeFromFavorites) : (text.he.addToFavorites)}
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