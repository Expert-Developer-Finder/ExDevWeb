import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    container: {
        marginTop:100,
        display: "flex",
        flexDirection: "row",
        justifyContent:"center",
        alignItems: "center",
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column-reverse',
          },
    },
    form: {
        marginTop:35
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    pat: {
        paddingLeft: 15,
        color: "red",
        fontStyle: "italic"
    },
}));