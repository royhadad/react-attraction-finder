import React, {useState} from 'react';
import axios from 'axios';
import styles from './styles';
import Location from "../../types/Location";
import Attraction from "../../types/Attraction";
import {GetAttractionsBody} from "../../../server/apiRoutes";
import {getAttractionsSortedByDistanceFromUserLocation} from "../../utils/attractionsUtils";

function getLocation(callback: (position: Location) => void) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position): void => {
            const {longitude, latitude} = position.coords;
            callback({long: longitude, lat: latitude});
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

const App: React.FC = () => {
    const classes = styles();

    const [userLocation, setUserLocation] = useState<Location | undefined>(undefined);
    const [attractions, setAttractions] = useState<Attraction[] | undefined>(undefined);

    const showUserLocation = (): void => {
        getLocation((position) => {
            setUserLocation(position);
        })
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
                            <div>lat: {userLocation.lat}</div>
                            <div>long: {userLocation.long}</div>
                        </div>
                        <button onClick={showNearestAttractions}>
                            Show nearest attractions!
                        </button>
                        {
                            attractions && (
                                <div>
                                    {attractions.map((attraction) => (
                                        <div>
                                            {JSON.stringify(attraction)}
                                        </div>
                                    ))}
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
