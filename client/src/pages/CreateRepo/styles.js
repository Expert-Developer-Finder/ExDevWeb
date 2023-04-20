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
    },
    branchItem: {
        padding: 10,
        border: "1px solid black",
        borderRadius: 10,
        marginTop: 10,
        "&:hover": {
            backgroundColor: 'rgb(7, 177, 77, 0.42)'
          }
    },
    hasSlackHeader: {
        display: "flex",
        alignItems: "center"
    },
    switchContainer: {
        marginLeft: 15,
        display: "flex",
        alignItems: "center"
    }
  
}));