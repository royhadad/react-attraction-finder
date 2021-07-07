import React, {useState} from 'react';
import styles from './styles';
import Location from "../../types/Location";

const App: React.FC = () => {
    const classes = styles();

    const [userLocation, setUserLocation] = useState<Location | undefined>(undefined);

    const showUserLocation = (): void => {

    }

    const showNearestAttractions = (): void => {

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
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
