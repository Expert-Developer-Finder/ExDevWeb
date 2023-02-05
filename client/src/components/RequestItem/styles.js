import { red } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';


export default makeStyles((theme) => ({
    container :{
        marginTop:20,
        marginBottom: 25,
        background: "#DEDEDE",
        padding: 15,
        borderRadius: 15,
    },
    gridContainer: {
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
    },
    button: {
        padding: 5,
        marginRight: 10,
        borderRadius: 5
    }
    
  
}));