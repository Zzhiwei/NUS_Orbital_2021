import React from 'react';
import algoliasearch from 'algoliasearch';
import { InstantSearch, Configure } from 'react-instantsearch-dom';
import SearchBox from '../components/homepage/SearchBox'
import InfiniteHits from '../components/homepage/InfiniteHits'

const searchClient = algoliasearch(
  'ES79ODFVNM',
  'c57f19049ad61dad541fc8f7659c0f92'
);

export default function Home() {
    console.log("rerendering home")
    return (
        <div style={{marginTop: '50px'}}>
             <InstantSearch
                indexName="posts"
                searchClient={searchClient}
            > 
            <Configure
                hitsPerPage={4}
                analytics={false}
                enablePersonalization={true}
                distinct
            />
            <SearchBox />
            <InfiniteHits />
            </InstantSearch>
        </div>
    )
}
