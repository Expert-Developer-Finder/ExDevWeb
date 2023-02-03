import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
    container: {
        background: "#DAE9F6",
        display:"flex",
        justifyContent:"space-between",
        alignItems:"center",
        margin: 15,
        padding:10,
        paddingLeft: 15,
        paddingRight:15,
        borderRadius: 10,
        [theme.breakpoints.down('xs')]: {
            flexDirection: 'column',
            paddingLeft: 10,
            paddingRight:10,
        },
    },
    bottom: {
        marginTop: 10
    },
    button: {
        marginLeft: 15
    }
  
}));
