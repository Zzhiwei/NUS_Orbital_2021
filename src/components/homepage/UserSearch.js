import React from 'react'
import { InstantSearch, Configure } from 'react-instantsearch-dom';

import SearchBox from './SearchBox';

import '../../pages/css/Home.css'

export default function UserSearch({searchClient, setSearchFor, searchFor}) {
  return (
      <InstantSearch
        indexName="posts"
        searchClient={searchClient}
      > 
          <Configure
              hitsPerPage={8}
          />
          
          <div className="homeContainer" >
              <div className="posts" >
                  <SearchBox searchFor={searchFor} setSearchFor={setSearchFor} /> 
                  {/* <InfiniteHits /> */}
              </div>
          </div>
      </InstantSearch>
  )
}
