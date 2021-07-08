import {makeStyles} from "@material-ui/core/styles";

const styles = makeStyles((theme) => {
    return {
        root: {},
        mainContainer: {
            padding: '1rem',
            display: "flex",
            flexDirection: 'column',
            alignItems: 'stretch',
            gap: '0.5rem',
            [theme.breakpoints.up('md')]: {
                alignItems: 'flex-start'
            }
        },
        title: {},
        standardButton: {
            cursor: 'pointer',
            border: '1px solid #aaaaaa',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '0.5rem',
            borderRadius: '1rem',
            width: '100%',
            [theme.breakpoints.up('md')]: {
                width: 'auto'
            }
        }
    }
})

export default styles;