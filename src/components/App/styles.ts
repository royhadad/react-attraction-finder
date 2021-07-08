import {makeStyles} from "@material-ui/core/styles";

const styles = makeStyles((theme) => {
    return {
        root: {
            direction: 'rtl',
            width: '100%'
        },
        appContainer: {
            maxWidth: theme.breakpoints.values.md,
            width: '100%',
            margin: '0 auto',
            [theme.breakpoints.up('md')]: {
                margin: '3rem auto'
            }
        }
    }
})

export default styles;