import React from 'react'
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import { makeStyles } from "@material-ui/core"


export default function Date(props) {

    const useStyles = makeStyles((theme) => ({
        label : {
          textAlign: "left",
          marginLeft: "20px"
        },
        text: {
          background: "white",
          borderRadius: "4px",
        }
      }))

    const classes = useStyles()
    const { name, label, value, onChange, error=null } = props

    const convertToDefEventPara = (name, value) => ({
        target: {
            name, value
        }
    })

    return (
        <div>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker 
                    className={classes.text}
                    autoOk
                    fullWidth
                    label={label}
                    disableToolbar 
                    variant='inline'
                    //inputVariant='outlined'
                    format="dd/MM/yyyy"
                    name={name}
                    value={value}
                    onChange={date => onChange(convertToDefEventPara(name, date))}
                    {...(error && {error:true, helperText:error})}  
                />
            </MuiPickersUtilsProvider>
        </div>
    )
}