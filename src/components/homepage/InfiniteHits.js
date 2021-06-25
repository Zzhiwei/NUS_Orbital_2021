import { Grid, Button } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import { connectInfiniteHits } from 'react-instantsearch-dom'
import PostCard from '../cards/PostCard'
import NoResults from './NoResults'
import { BookmarkSnackBar, UnbookmarkSnackBar } from '../SnackBar'

function InfiniteHits({ hits, hasPrevious, hasMore, refinePrevious, refineNext,  }) {
    
    const [openB, setOpenB] = useState(false)
    const [openUb, setOpenUb] = useState(false)

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

    return (
        <div >
            <Grid container spacing={4} style={{margin: "15px -8px"}} justify="center">
                {hits.map((hit, index) => (
                    <Grid item xs={12} sm={6} key={index} style={{paddingLeft: 0}}>
                        <PostCard data={hit} setOpenB={setOpenB} setOpenUb={setOpenUb}/>
                    </Grid>
                ))}
            </Grid>
            {renderLoadMore()}
            <BookmarkSnackBar open={openB} setOpen={setOpenB}/>
            <UnbookmarkSnackBar open={openUb} setOpen={setOpenUb}/>
        </div>
    )
}

export default connectInfiniteHits(InfiniteHits)