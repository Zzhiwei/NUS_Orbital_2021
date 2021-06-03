import { Paper, Typography } from '@material-ui/core'
import React from 'react'

export default function NoResults() {
    return (
        <div align="center" style={{marginTop: '100px'}}>
            <Typography variant="h3">
              No results found
            </Typography>   
            <Typography variant="h5">
              Try a different search term or filter!
            </Typography>   
        </div>
    )
}
