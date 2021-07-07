import React, {useState} from 'react';
import axios from 'axios';
import styles from './styles';
import Location from "../../types/Location";
import Attraction from "../../types/Attraction";
import {GetAttractionsBody} from "../../../server/apiRoutes";
import {getAttractionsSortedByDistanceFromUserLocation} from "../../utils/attractionsUtils";

const App: React.FC = () => {
    const classes = styles();

    const [userLocation, setUserLocation] = useState<Location | undefined>(undefined);
    const [attractions, setAttractions] = useState<Attraction[] | undefined>(undefined);

    const showUserLocation = (): void => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position): void => {
                const {longitude, latitude} = position.coords;
                setUserLocation(({latitude: longitude, longitude: latitude}));
            });
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    }

    const showNearestAttractions = async (): Promise<void> => {
        const response = await axios.get<GetAttractionsBody>('api/getAttractions');
        const unorderedAttractions = response?.data?.list;
        if (!unorderedAttractions) {
            console.error("couldn't fetch the attractions list!");
        } else if (!userLocation) {
            console.error('user location was not set!')
            return;
        } else {
            const orderedAttractions = getAttractionsSortedByDistanceFromUserLocation(userLocation, unorderedAttractions);
            setAttractions(orderedAttractions)
        }
    };

    return (
        <div className={classes.root}>
            <div className={classes.mainContainer}>
                <h1>Attractions Finder</h1>
                <button onClick={showUserLocation}>show my location!</button>
                {userLocation && (
                    <div>
                        <div>
                            <div>lat: {userLocation.longitude}</div>
                            <div>long: {userLocation.latitude}</div>
                        </div>
                        <button onClick={showNearestAttractions}>
                            Show nearest attractions!
                        </button>
                        {
                            attractions && (
                                <div>
                                    <div>
                                        The best attraction type is!
                                    </div>
                                    <div>
                                    {attractions.map((attraction) => (
                                        <div>
                                            <div>{attraction.Name}</div>
                                            <div>{attraction.Id}</div>
                                            <div>{attraction.Address}</div>
                                            <div>{attraction.Opening_Hours}</div>
                                            <div>{attraction.URL}</div>
                                        </div>
                                    ))}
                                    </div>
                                </div>
                            )
                        }
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
