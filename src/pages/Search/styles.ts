import {makeStyles} from "@material-ui/core/styles";

const styles = makeStyles((theme) => {
    return {
        root: {},
        mostCommonAttractionType: {
            cursor: 'pointer'
        },
        attractionContainer:{
            border: '1px solid black'
        },
        addToFavorites: {
            cursor: 'pointer'
        }
    }
})

export default styles;