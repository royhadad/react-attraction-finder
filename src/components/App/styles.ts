import {makeStyles} from "@material-ui/core/styles";

const styles = makeStyles((theme) => {
    return {
        root: {
            direction: 'rtl',
            width: '100%',
            boxSizing: 'border-box',
            minHeight: '100vh'
        },
        appContainer: {
            maxWidth: theme.breakpoints.values.md,
            width: '100%',
            padding: '0 auto',
            [theme.breakpoints.up('md')]: {
                margin: '3rem auto'
            }
        }
    }
})

export default styles;