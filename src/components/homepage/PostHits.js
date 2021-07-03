import { Grid, Button } from '@material-ui/core'
import React, { useState } from 'react'
import { connectInfiniteHits } from 'react-instantsearch-dom'
import PostCard from '../cards/PostCard'
import NoResults from './NoResults'
import { BookmarkSnackBar, UnbookmarkSnackBar } from '../SnackBar'

import './Masonry.css'
import Masonry from 'react-masonry-css'


function PostHits({ hits, hasPrevious, hasMore, refinePrevious, refineNext,  }) {
    
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

    const breakpointColumnsObj = {
        default: 2,
        992: 1,
    };

      
    return (
        <div style={{marginTop: 20}}>
            <Masonry
                breakpointCols={breakpointColumnsObj}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column">
                {hits.map((hit, index) => (
                    <div  key={index} >
                        <PostCard data={hit} setOpenB={setOpenB} setOpenUb={setOpenUb}/>
                    </div>
                ))}
            </Masonry>
            {renderLoadMore()}
            <BookmarkSnackBar open={openB} setOpen={setOpenB}/>
            <UnbookmarkSnackBar open={openUb} setOpen={setOpenUb}/>
        </div>
    )
}

export default connectInfiniteHits(PostHits)