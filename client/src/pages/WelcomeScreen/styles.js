import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    container: {
        marginTop: 50,
        display:"flex",
        flexDirection:"row",
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
          },
    },

    buttons: {
        marginTop: 15,

    },
    button: {
        marginLeft:10,
    },
    img: {
        alignSelf: "end",
        [theme.breakpoints.down('sm')]: {
            alignSelf: 'start',
          },
        
    }
}));