import { Grid, TextField, InputAdornment, IconButton } from '@material-ui/core'
import React from 'react'
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

const Input = ({name, half, label, autoFocus, type, handlePasswordShow, handleChange}) => {

  return (
    <Grid item xs={12} sm={half? 6:12}>
        <TextField 
            name={name}
            onChange={handleChange} 
            variant="outlined"
            required
            fullWidth
            label={label}
            autoFocus={autoFocus}
            type={type}
            InputProps={(name === "password" || name === "confirmPassword" )  ? {
                endAdornment: (
                    <InputAdornment position='end'>
                        <IconButton onClick={handlePasswordShow} >

                            {type==="password" ?  <Visibility/> :<VisibilityOff/>  }
                        </IconButton>
                    </InputAdornment>
                )
            }: null}
            > 

        </TextField>
    </Grid>
  )
}

export default  Input;