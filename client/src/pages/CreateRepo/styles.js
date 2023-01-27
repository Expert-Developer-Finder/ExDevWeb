import { makeStyles } from '@material-ui/core/styles';
import { display } from '@mui/system';

export default makeStyles((theme) => ({
    container: {
        marginTop:50,
        display: "flex",
        justifyContent:"center",
        flexDirection: "column",
        alignItems: "center"
    },
    page :{
        padding: 25,
        marginTop:15,
        marginBottom: 15,
        width:"70%",
       
    },
    form : {
        width: "100%",
        display:"flex",
        justifyContent: "center",
        flexDirection: "column",
    }
  
}));