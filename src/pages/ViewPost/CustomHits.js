import { Grid } from '@material-ui/core'
import React from 'react'
import { connectHits } from 'react-instantsearch-dom'
import PostCard from '../../components/cards/PostCard';

function CustomHits({ hits, setOpenB, setOpenUb }) {

    var posts = hits

    if (hits.length > 3) {
        posts = hits.slice(0, 3)
    }
    
    return (
        <Grid container spacing={4} style={{margin: 'auto auto'}} justify="center">
            {posts.map((hit, index) => (
                <Grid item xs={12} key={index} style={{paddingLeft: 0}}>
                    <PostCard data={hit} setOpenB={setOpenB} setOpenUb={setOpenUb}/>
                </Grid>
            ))}
        </Grid> 
    )
}

export default connectHits(CustomHits)