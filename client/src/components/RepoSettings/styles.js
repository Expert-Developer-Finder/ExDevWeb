import { red } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';


export default makeStyles((theme) => ({
    container :{
        marginTop:20,
        marginBottom: 25
    },

    menu : {
        display: "flex",
        justifyContent: "flex-end"
    },
    mr: {
        marginRight: 25
    }, 
    mt: {
        marginTop: 15
    }, 
    divider: {
        marginTop: 15, 
        marginBottom: 25
    }, 
    item : {
        borderBottomColor: "lightgrey",
        borderBottomWidth: 1,
        borderBottom: "solid",
        width:"100%",
        textAlign: "center"
    },
    itemLast: {
        width:"100%",
        textAlign: "center"
    }, 
    picker: {
        marginLeft: 15,
        width: 100
    }, 
    paper :{
        padding:20,
        borderRadius: 20,
        marginTop: 20
    }
    
  
}));