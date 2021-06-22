import { Typography, makeStyles, RadioGroup as MuiRadioGroup, FormControlLabel, Radio } from '@material-ui/core'
import React from 'react'

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

export default function RadioGroup(props) {

    const classes = useStyles()
    const { name, label, value, onChange, items } = props

    return (
        <div>
            <Typography className={classes.label}>
                {label}
            </Typography>
            <MuiRadioGroup
                row
                name={name}
                value={value}
                onChange={onChange}
            >
                {
                    items.map(
                        (item, index) => (
                            <FormControlLabel value={item.value} control={<Radio />} label={item.value} />
                        )
                    )
                }
            </MuiRadioGroup>
        </div>
    )
}
