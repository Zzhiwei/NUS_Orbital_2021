import { Typography } from '@material-ui/core'
import React from 'react'

export default function NoResults({ postSearch }) {
  if (postSearch) {
    return (
      <div align="center" style={{marginTop: '100px'}}>
          <Typography variant="h4">
            No users found
          </Typography>   
      </div>
    )
  }
    return (
        <div align="center" style={{marginTop: '100px'}}>
            <Typography variant="h4">
              No results found
            </Typography>   
            <Typography variant="h6">
              Try a different search term or filter.
            </Typography>   
        </div>
    )
}
