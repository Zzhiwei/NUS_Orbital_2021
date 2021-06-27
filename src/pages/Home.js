import React, {useEffect} from 'react';
import algoliasearch from 'algoliasearch';
import { InstantSearch, Configure } from 'react-instantsearch-dom';
import SearchBox from '../components/homepage/SearchBox'
import InfiniteHits from '../components/homepage/InfiniteHits'

import FilterSidebar from '../components/homepage/FilterSidebar'
import { Button, Container } from '@material-ui/core';
import Copyright from '../components/Copyright'

import './Home.css'



export default function Home({autoScrollToTop}) {
    console.log("rerendering home")

    const searchClient = algoliasearch(
        process.env.REACT_APP_ALGOLIA_APP_ID,
        process.env.REACT_APP_ALGOLIA_API_KEY
      );
    
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
                
                <div className="homeContainer" >
                    <div className="filterbar"  >
                        <FilterSidebar scrollToTop={scrollToTop} />
                    </div>
                    <div className="posts" style={{height: "5000px"}}>
                        <SearchBox /> 
                        <InfiniteHits />
                        
                    </div>
                </div>
                </InstantSearch>
                <Copyright />
                </Container>
            </div>
    )
}
