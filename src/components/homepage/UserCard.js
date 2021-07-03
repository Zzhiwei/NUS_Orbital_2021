import React from 'react'
import { Avatar, Paper, makeStyles, Typography } from '@material-ui/core'

import { storage } from '../../firebase'


const useStyles = makeStyles((theme) => {
  return {
    usercard: {
      height:'80px',
      flex: "0 1 290px",
      margin: '7px',
    },
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
        borderBottom: '5px solid grey'
      }
      
    }
  }
})

export default function UserCard({ data }) {
  // const [link, setLink] = useState(null)
  const classes = useStyles()
  const {firstName, lastName} = data.basicInfo

  // useEffect(async () => {
  //   if ()
  // }, [])


  return (
    <div className={classes.usercard}>
      {/* <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}> */}
        <Paper className={classes.paper}>
            <Avatar style={{height: '50px', width: '50px'}} />
            <div style={{display: 'flex', height: '100%', alignItems: 'center', marginLeft: '7px'}}>
              <Typography variant="h6">
                  {firstName + " " + lastName}
              </Typography>
            </div>  

        </Paper>
      {/* </div> */}
      



    </div>
    
    // <Paper className={classes.paper} align="center">
    //     <div style={{display: 'flex', justifyContent: 'center'}}>
    //       <div style={{flex: 3}}>
    //         <Avatar style={{height: '50px', width: '50px'}} />
    //       </div>
    //       <div style={{flex: 7}}>
    //         <div style={{height: '100%', display: 'flex', alignItems: 'center'}}>
    //           <Typography variant="h6">
    //             {firstName + " " + lastName}
    //           </Typography>
    //         </div>
            
    //       </div>
          
    //     </div>
    //   </Paper>
      
  )
}
