import React, {useContext} from 'react';
import styles from './styles';
import {AppContext} from "../../components/App/App";
import {useHistory} from 'react-router-dom';
import text from './text';

const Home: React.FC = () => {
    const classes = styles();
    const history = useHistory();

    const {userLocation, setUserLocation} = useContext(AppContext);

    const showUserLocation = (): void => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position): void => {
                const {longitude, latitude} = position.coords;
                setUserLocation(({latitude, longitude}));
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
                <div className={classes.title}>{text.he.title}</div>
                <div onClick={showUserLocation} className={classes.standardButton}>{text.he.showLocation}</div>
                {userLocation && (
                    <>
                        <div>longitude: {userLocation.longitude}, latitude: {userLocation.latitude}</div>
                        <div onClick={gotoSearch} className={classes.standardButton}>{text.he.findAttractionsNearby}</div>
                    </>
                )}
            </div>
        </div>
    );
}

export default Home;
