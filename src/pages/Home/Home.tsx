import React, {useContext} from 'react';
import styles from './styles';
import {AppContext} from "../../components/App/App";
import { useHistory } from 'react-router-dom';

const Home: React.FC = () => {
    const classes = styles();
    const history = useHistory();

    const {userLocation, setUserLocation} = useContext(AppContext);

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

    const gotoSearch = async (): Promise<void> => {
       history.push('/search')
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
                        <button onClick={gotoSearch}>
                            Show nearest attractions!
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Home;
