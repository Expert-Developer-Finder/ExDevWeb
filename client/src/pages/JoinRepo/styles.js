import { makeStyles } from '@material-ui/core/styles';
import { display } from '@mui/system';

export default makeStyles((theme) => ({
    container: {
        marginTop:50,
        display: "flex",
        justifyContent:"center",
    },

    left: {
        justifyContent:"center",
        display:"flex",
        flexDirection: "column",
        alignItems:"center",
    },
    page :{
        padding: 25,
        marginTop:15,
        marginBottom: 15
    },
    mt: {
        marginTop: 15,
        
    },
    mr: {marginRight:10},
    or :{
        textAlign: "center"
    }, 
    button: {
        padding: 15,
        background:"lightblue",
        fontWeight: 900,
        width: "100%",
        borderRadius: 10,
        marginTop: 10

    }, 
    img : {
        alignSelf: "center",
        [theme.breakpoints.down('xs')]: {
            width: 400
          },
    }
}));