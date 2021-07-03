import React, { useState, useEffect } from 'react'
import { Avatar, Paper, makeStyles, Typography } from '@material-ui/core'

import { storage } from '../../firebase'


const useStyles = makeStyles((theme) => {
  return {
    paper: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '90%',
      height: '95%',
      padding: '10px',
      backgroundColor: '#faf6ee',
      transition: "width, height 100ms ease",
      '&:hover': {
        width: '100%',
        height: '100%',
        cursor: 'pointer',
        borderBottom: '4px solid grey'
      }
      
    }
  }
})

export default function UserCard({ data }) {
  const classes = useStyles()
  const {firstName, lastName} = data.basicInfo

  return (
        <Paper className={classes.paper}>
            <Avatar src={data.profilePicture} style={{height: '50px', width: '50px'}} />
            <div style={{display: 'flex', height: '100%', alignItems: 'center', marginLeft: '7px'}}>
              <Typography variant="h6">
                  {firstName + " " + lastName}
              </Typography>
            </div>  
        </Paper>
      
  )
}
