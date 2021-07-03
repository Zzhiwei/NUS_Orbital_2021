import React from 'react'
import { Typography } from '@material-ui/core'
import { InstantSearch, Configure, InfiniteHits, connectStateResults } from 'react-instantsearch-dom';

import SearchBox from './SearchBox';
import UserHits from './UserHits';

import '../../pages/css/Home.css'


// const NoQuery = () => (
//     <div style={{marginTop: '10px'}} align="center">
//         <Typography variant="h4" color="primary">
//             <div style={{fontWeight: 'normal'}}>
//                 Enter a name
//             </div>
//         </Typography>
//     </div>
// )

const Results = connectStateResults(({ searchState }) => {
    console.log("connecting results")
    const res = searchState && searchState.query 
        ? <UserHits />
        : null
    return res
})

export default function UserSearch({searchClient, setSearchFor, searchFor}) {
  return (
      <InstantSearch
        indexName="users"
        searchClient={searchClient}
      > 
          <Configure
              hitsPerPage={8}
          />
          
          <div className="homeContainer" >
              <div className="posts" >
                  <SearchBox searchFor={searchFor} setSearchFor={setSearchFor} /> 
                  <Results />
              </div>
          </div>
      </InstantSearch>
  )
}
