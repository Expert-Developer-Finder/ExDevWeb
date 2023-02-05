import { makeStyles } from '@material-ui/core/styles';


export default makeStyles((theme) => ({
    unauthorisedContainer: {
        marginTop:50,
        display: "flex",
        justifyContent:"center",
        flexDirection: "column",
        alignItems: "center"
    },

    img1: {
        width: 250,
    }, 
    container :{
        marginTop:20,
    },

    appBar: {
        display: "flex",
        justifyContent: "space-between",
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column-reverse',
        },
    },

    menu : {
        display: "flex",
        justifyContent: "flex-end"
    },
    mr: {
        marginRight: 25
    }, 
    divider: {
        marginTop: 15, 
        marginBottom: 25
    }
    
  
}));