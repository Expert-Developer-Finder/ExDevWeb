import { Grid, TextField, InputAdornment, IconButton } from '@material-ui/core';
import React from 'react'
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

const Input = ({name, half, label, autoFocus, type, handlePasswordShow, handleChange, required = true}) => {

  return (
    <Grid item xs={12} sm={half? 6:12}  style={{paddingRight: 0, paddingLeft: 15 }}>
        {   required ?
            <TextField 
            name={name}
            onChange={handleChange} 
            variant="outlined"
            fullWidth
            required
            label={label}
            autoFocus={autoFocus}
            type={type}
            margin="normal"
            InputProps={(name === "password" || name === "confirmPassword" )  ? {
                endAdornment: (
                    <InputAdornment position='end'>
                        <IconButton onClick={handlePasswordShow} >
                            {type==="password" ?  <Visibility/> :<VisibilityOff/>  }
                        </IconButton>
                    </InputAdornment>
                )
            }: null}
            ></TextField> :
            

            <TextField 
            name={name}
            onChange={handleChange} 
            variant="outlined"
            fullWidth
            label={label}
            autoFocus={autoFocus}
            type={type}
            margin="normal"

            InputProps={(name === "password" || name === "confirmPassword" )  ? {
                endAdornment: (
                    <InputAdornment position='end'>
                        <IconButton onClick={handlePasswordShow} >
                            {type==="password" ?  <Visibility/> :<VisibilityOff/>  }
                        </IconButton>
                    </InputAdornment>
                )
            }: null}
            > </TextField>
        }
    </Grid>
  )
}

export default  Input;