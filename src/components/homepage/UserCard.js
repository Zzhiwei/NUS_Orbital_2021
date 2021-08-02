import React from 'react'
import { Avatar, Paper, makeStyles, Typography } from '@material-ui/core'
import { useHistory } from 'react-router-dom'


const useStyles = makeStyles(() => {
  return {
    paper: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '90%',
      height: '95%',
      padding: '10px',
      backgroundColor: '#faf6ee',
      // backgroundColor: '#f0ebe1',
      transition: "width, height, border 200ms ease",
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
  const history = useHistory()

  function handleClick() {
    history.push(`/profile/${data.objectID}`)
  }

  return (
        <Paper className={classes.paper} onClick={handleClick}>
            <Avatar src={data.profilePicture} style={{height: '50px', width: '50px'}} />
            <div style={{display: 'flex', height: '100%', alignItems: 'center', marginLeft: '20px'}}>
              <Typography variant="h6">
                  {firstName + " " + lastName}
              </Typography>
            </div>  
        </Paper>
      
  )
}
