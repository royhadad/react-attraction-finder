import React, {useState} from 'react';
import styles from './styles';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Home from "../../pages/Home";
import Search from "../../pages/Search";
import Location from "../../types/Location";
import {noop} from "../../utils/general";

type AppContextType = {
    userLocation: Location | undefined,
    setUserLocation: React.Dispatch<React.SetStateAction<Location | undefined>>;
}
export const AppContext = React.createContext<AppContextType>({
    userLocation: undefined,
    setUserLocation: noop
});

const App: React.FC = () => {
    const classes = styles();
    const [userLocation, setUserLocation] = useState<Location | undefined>(undefined);

    return (
        <AppContext.Provider value={{
            userLocation,
            setUserLocation
        }}>
            <div className={classes.root}>
                <div className={classes.appContainer}>
                    <Router>
                        <Switch>
                            <Route path="/search">
                                <Search/>
                            </Route>
                            <Route path="/">
                                <Home/>
                            </Route>
                        </Switch>
                    </Router>
                </div>
            </div>
        </AppContext.Provider>
    )
}

export default App;
