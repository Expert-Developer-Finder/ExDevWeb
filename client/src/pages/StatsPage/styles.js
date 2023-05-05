import { makeStyles } from '@material-ui/core/styles';
import { blue } from '@mui/material/colors';



export default makeStyles((theme) => ({
   container: {
   
   },
   seperator: {
    borderTop: "1px solid black",
    marginTop: 15,
    marginBottom: 15,
    height: 1
   },
   row:  {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15
   },
   pie :{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: 400
   },
   bar: {
    marginLeft: 75,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: 400
   },
   space :{
    height: 45,
    width: 45,
   },
   userItem: {
    marginTop: 15,
    marginBottom:10,
    borderBottom: "1px solid grey",
    padding: 20
   },
   footer: {
    height: 100,
    width: 100,
   },
   header: {
      display: "flex",
      alignItems: "center"
   },
   ml: {

      marginLeft: 15
   }
  
}));