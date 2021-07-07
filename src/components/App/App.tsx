import React from 'react';
import styles from './styles';

const App: React.FC = () => {
    const classes = styles();

    return (
        <div className={classes.root}>
           Hello World!
        </div>
    );
}

export default App;
