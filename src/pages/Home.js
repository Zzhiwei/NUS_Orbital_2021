import React, {useState} from 'react';
import algoliasearch from 'algoliasearch';
import { InstantSearch, Configure } from 'react-instantsearch-dom';
import SearchBox from '../components/homepage/SearchBox'
import InfiniteHits from '../components/homepage/InfiniteHits'

import FilterSidebar from '../components/homepage/FilterSidebar'
import { Button, Container } from '@material-ui/core';
import Copyright from '../components/Copyright'
import UserSearch from '../components/homepage/UserSearch';

import './css/Home.css'



export default function Home({autoScrollToTop}) {
    const [searchFor, setSearchFor] = useState(0)

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

                {searchFor === 0 && (
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
                            <div className="posts" >
                                <SearchBox setSearchFor={setSearchFor} searchFor={searchFor} /> 
                                <InfiniteHits />
                                
                            </div>
                        </div>
                    </InstantSearch>
                )}

                {searchFor === 1 && (
                    <UserSearch searchClient={searchClient} setSearchFor={setSearchFor} searchFor={searchFor}/>
                )}
                
                <Copyright />
                </Container>
            </div>
    )
}
