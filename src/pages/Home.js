import React, {useRef} from 'react';
import algoliasearch from 'algoliasearch';
import { InstantSearch, Configure } from 'react-instantsearch-dom';
import SearchBox from '../components/homepage/SearchBox'
import InfiniteHits from '../components/homepage/InfiniteHits'

import FilterSidebar from '../components/homepage/FilterSidebar'
import { Button, Container } from '@material-ui/core';
import UseIntersection from '../utils/UseIntersection'

const searchClient = algoliasearch(
  process.env.REACT_APP_ALGOLIA_APP_ID,
  process.env.REACT_APP_ALGOLIA_API_KEY
);

export default function Home({autoScrollToTop}) {
    console.log("rerendering home")
    
    function scrollToTop() {
            autoScrollToTop.current && autoScrollToTop.current.scrollIntoView(false)
    }

    return (
            <div style={{marginTop: "40px"}}>
                
                <Container>
                <InstantSearch
                    indexName="posts"
                    searchClient={searchClient}
                > 
                <Configure
                    hitsPerPage={8}
                />
                
                <div style={{display: 'flex'}}>
                    <div style={{flex: 1, marginRight: '2vw'}}>
                        <FilterSidebar scrollToTop={scrollToTop} />
                    </div>
                    <div style={{flex: 3, height: '5000px'}}>
                        <SearchBox /> 
                        <InfiniteHits />
                        
                    </div>
                </div>
                </InstantSearch>
                </Container>
            </div>
    )
}
