import { makeStyles } from '@material-ui/core/styles';
import { blue } from '@mui/material/colors';


export default makeStyles((theme) => ({
    container: {
        marginTop: 30,
        backgroundColor: "#ADD8E6",
        borderRadius: 15,
        padding: 45,
        display: "flex",
        flexDirection: "column"
    },
    left: {
        alignSelf: "center",
        marginBottom: 45,
    },
    right: {
        alignSelf: "center",
        marginBottom: 45,
    },
    center: {
        alignSelf: "center",
    },

  
}));