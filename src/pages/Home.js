import React from 'react';
import algoliasearch from 'algoliasearch';
import { InstantSearch, Configure, RefinementList } from 'react-instantsearch-dom';
import SearchBox from '../components/homepage/SearchBox'
import InfiniteHits from '../components/homepage/InfiniteHits'
import { Grid } from '@material-ui/core';

import FilterSidebar from '../components/homepage/FilterSidebar'



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
                {/* <RefinementList
                    attribute="location"
                />
                <ToggleRefinement
                    attribute="location"
                    label="online"
                    value="Online"
                />
                 */}
                
                <Configure
                    hitsPerPage={8}
                    analytics={false}
                    enablePersonalization={true}
                />
                <SearchBox /> 
                <Grid container>
                    <Grid item xs={12} sm={3}>
                        <FilterSidebar />
                    </Grid>
                    <Grid item xs={12} sm={9}>
                        <InfiniteHits />
                    </Grid>
                </Grid>
                
                

                </InstantSearch>
            </div>
    )
}
