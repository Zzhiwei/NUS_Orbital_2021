import { Grid, Button } from '@material-ui/core'
import React from 'react'
import { connectInfiniteHits } from 'react-instantsearch-dom'

import PostCard from '../PostCard'
import NoResults from './NoResults'

function InfiniteHits({ hits, hasPrevious, hasMore, refinePrevious, refineNext }) {
    
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
            <Grid container spacing={4} style={{margin: 'auto auto'}} >
                {hits.map((hit, index) => (
                    <Grid item xs={12} sm={6}  key={index}>
                        <PostCard 
                            id={hit.objectID}
                            title={hit.title}
                            author={hit.name}
                            authorId={hit.author}
                            current={hit.current}
                            total={hit.total}
                            location={hit.location}
                            schedule={hit.schedule}
                            education={hit.education}
                            proficiency={hit.proficiency}
                            chips={hit.skills}
                        />
                    </Grid>
                ))}
            </Grid>
            {renderLoadMore()}
        </div>
    )
}

export default connectInfiniteHits(InfiniteHits)