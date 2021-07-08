import React, {useContext} from 'react';
import {useHistory} from 'react-router-dom';
import styles from './styles';
import {AppContext} from "../../components/App/App";
import text from './text';

const Home: React.FC = () => {
    const classes = styles();
    const history = useHistory();

    const {userLocation, setUserLocation} = useContext(AppContext);

    const showUserLocation = (): void => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const {longitude, latitude} = position.coords;
                setUserLocation(({longitude, latitude}));
            }, (positionError) => {
                alert(`positionError ${positionError.message}`);
            });
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    }

    const redirectToSearch = () => {
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
                        <div onClick={redirectToSearch}
                             className={classes.standardButton}>{text.he.findAttractionsNearby}</div>
                    </>
                )}
            </div>
        </div>
    );
}

export default Home;
