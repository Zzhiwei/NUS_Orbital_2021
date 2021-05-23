import React from 'react';
import ReactDOM from 'react-dom';
import algoliasearch from 'algoliasearch';
import { InstantSearch, SearchBox, Hits } from 'react-instantsearch-dom';
import ProjectCardTest from '../components/ProjectCardTest'


const searchClient = algoliasearch(
  'ES79ODFVNM',
  'c57f19049ad61dad541fc8f7659c0f92'
);

export default function SearchDummy() {
    return (
        <div>
             <InstantSearch
                indexName="posts"
                searchClient={searchClient}
            >
                <SearchBox />
                <Hits hitComponent={ProjectCardTest}/>
            </InstantSearch>
        </div>
    )
}
