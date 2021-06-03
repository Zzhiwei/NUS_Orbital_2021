import React from 'react'
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import { makeStyles, Typography } from "@material-ui/core";


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
    const { name, label, value, onChange } = props

    const convertToDefEventPara = (name, value) => ({
        target: {
            name, value
        }
    })

    return (
        <div>
            <Typography className={classes.label}>
                {label}
            </Typography>  
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker 
                    className={classes.text}
                    autoOk
                    disableToolbar 
                    variant='inline'
                    inputVariant='outlined'
                    format="dd MMM yyyy"
                    name={name}
                    value={value}
                    onChange={date => onChange(convertToDefEventPara(name, date))}  
                />
            </MuiPickersUtilsProvider>
        </div>
    )
}