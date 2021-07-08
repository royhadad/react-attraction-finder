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
    // eslint-disable-next-line
    const classes = styles();
    const [userLocation, setUserLocation] = useState<Location | undefined>(undefined);

    return (
        <AppContext.Provider value={{
            userLocation,
            setUserLocation
        }}>
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
        </AppContext.Provider>
    )
}

export default App;
