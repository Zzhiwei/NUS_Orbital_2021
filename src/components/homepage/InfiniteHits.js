import { Grid, Button } from '@material-ui/core'
import React from 'react'
import { connectInfiniteHits } from 'react-instantsearch-dom'
import PostCard from '../PostCard'

function InfiniteHits({ hits, hasPrevious, hasMore, refinePrevious, refineNext }) {
    return (
        <div >
            <Grid container spacing={3} style={{width: '80%', margin: 'auto auto'}} >
                {hits.map(hit => (
                    <Grid item xs={12} sm={6}  key={hit.objectID}>
                        <PostCard hit={hit} />
                    </Grid>
                ))}
            </Grid>
            <div align="center">
                <Button style={{marginTop: '50px'}} onClick={refineNext} variant="contained" color="primary">
                        Load more
                </Button>
            </div>
        </div>
    )
}

export default connectInfiniteHits(InfiniteHits)