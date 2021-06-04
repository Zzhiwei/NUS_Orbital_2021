import { makeStyles } from '@material-ui/core'
import React from 'react'


const useStyles = makeStyles(theme => {
    return {
        root: {
            backgroundColor: 'yellow'
        }
    }
})

export default function ChatBody({ chat }) {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            {chat}
        </div>
    )
}
