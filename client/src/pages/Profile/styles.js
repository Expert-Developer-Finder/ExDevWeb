import { makeStyles } from '@material-ui/core/styles';
import { red } from '@mui/material/colors';

export default makeStyles((theme) => ({
   
    form: {
        padding: 25,
        paddingTop:0,
        maxWidth: 450,
    },

    mt: {
        marginTop: 15
    },
    square :{
        aspectRatio: 1/1,
        height: 150,
        marginLeft: 25,
        marginBottom: 15
    },
    avatar: {
        height:"100%",
        width: "100%"
    }, 
   
   
}));