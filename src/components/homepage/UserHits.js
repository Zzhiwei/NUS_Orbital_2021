import { Grid, Button, makeStyles } from '@material-ui/core'
import React, { useState } from 'react'
import { connectInfiniteHits } from 'react-instantsearch-dom'
// import PostCard from '../cards/PostCard'
import NoResults from './NoResults'
// import { BookmarkSnackBar, UnbookmarkSnackBar } from '../SnackBar'
import UserCard from './UserCard'



import './Masonry.css'
import Masonry from 'react-masonry-css'
import { IndeterminateCheckBoxOutlined } from '@material-ui/icons'


const useStyles = makeStyles((theme) => {
  return {
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'flex-start',
      marginTop: '20px'
    },
    usercard: {
      height:'80px',
      flex: "0 1 290px",
      margin: '7px',
    },
  }
})


function UserHits({ hits, hasPrevious, hasMore, refinePrevious, refineNext,  }) {
    
    // const [openB, setOpenB] = useState(false)
    // const [openUb, setOpenUb] = useState(false)
    const classes = useStyles()

    const len = hits.length

    const renderLoadMore = () => {
        if (len >= 8 && hasMore) { 
            return (
                <div align="center">
                    <Button style={{marginTop: '50px'}} onClick={refineNext} variant="contained" color="primary">
                            Load more
                    </Button>
                </div>  
            )
        }
    }

    if (len === 0) {
        return <NoResults />
    }

    const breakpointColumnsObj = {
        default: 2,
        992: 1,
    };

      
    return (
        <div className={classes.container}>
            {
              hits.map((hit, index) => {
                return (
                  <div key={index} className={classes.usercard}>
                      <UserCard  data={hit} />
                  </div>
                )
              }) 
            }
        </div>
    )
}

export default connectInfiniteHits(UserHits)