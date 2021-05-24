import React from 'react';
import algoliasearch from 'algoliasearch';
import { InstantSearch, connectHits, connectSearchBox} from 'react-instantsearch-dom';
import PostCard from '../components/PostCard'
import { Grid, TextField, Button } from '@material-ui/core';

const searchClient = algoliasearch(
  'ES79ODFVNM',
  'c57f19049ad61dad541fc8f7659c0f92'
);

const Hits = ({ hits }) => (
    <Grid container spacing={3} style={{width: '80%', margin: 'auto auto'}} >
      {hits.map(hit => (
        <Grid item xs={12} sm={6}  key={hit.objectID}>
            <PostCard hit={hit} />
        </Grid>
      ))}
    </Grid>
);

const CustomHits = connectHits(Hits);

const SearchBox = ({ isSearchStalled, refine }) => (
    <Grid item  style={{marginBottom: '20px'}} xs={8} >
        <form noValidate action="" role="search">
            <Grid container>
                <Grid item xs={8}>
                <TextField 
                    style={{background: "white", borderRadius: "4px"}}
                    variant="outlined"
                    label="Search"
                    fullWidth
                    onChange={e => refine(e.currentTarget.value)}
                />
                </Grid>
                <Grid xs={4}>
                    <Button onClick={() => refine('')} color="primary" variant="contained" style={{marginLeft: '20px', marginTop: '0px', height: '55px', width: '100px', color: 'white'}}>
                        reset
                    </Button>
                </Grid>
            </Grid>
            {isSearchStalled ? 'My search is stalled' : ''}
        </form>
    </Grid>
);

const CustomSearchBox = connectSearchBox(SearchBox);

export default function Home() {

    return (
        <div style={{marginTop: '50px'}}>
             <InstantSearch
                indexName="posts"
                searchClient={searchClient}
            > 
            <Grid container spacing={2} justify="center" style={{marginBottom: "20px"}}>
                <CustomSearchBox />
            </Grid>

            <CustomHits />
            </InstantSearch>
        </div>
    )
}
