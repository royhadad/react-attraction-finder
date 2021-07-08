import {lighten, makeStyles} from "@material-ui/core/styles";

const lightPeach = '#ffd8b1';
const styles = makeStyles((theme) => {
    const standardBorderMixin = {
        border: '1px solid #aaaaaa',
        borderRadius: '0',
        [theme.breakpoints.up('md')]: {
            borderRadius: '0.5rem'
        }
    }

    return {
        root: {},
        mostCommonAttractionType: {
            padding: '0.5rem 0.5rem',
            cursor: 'pointer',
            marginBottom: '1rem',
            ...standardBorderMixin
        },
        mostCommonAttractionTypeSelected: {
            textDecoration: 'underline',
            fontWeight: 'bold'
        },
        attractionsList: {
            display: 'flex',
            flexDirection: 'column',
            gap: '0',
            [theme.breakpoints.up('md')]: {
                gap: '0.5rem'
            }
        },
        attractionsListItem: {
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            padding: '0.5rem 0.5rem',
            alignItems: 'flex-start',
            backgroundColor: lightPeach,
            ...standardBorderMixin
        },
        addToFavorites: {
            cursor: 'pointer',
            padding: '0.5rem',
            borderRadius: '0.5rem',
            backgroundColor: lighten(lightPeach, 0.55)
        },
        websiteLink: {
            color: 'black',
            fontWeight: 'bold'
        }
    }
})

export default styles;