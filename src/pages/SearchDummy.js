import React from 'react';
import ReactDOM from 'react-dom';
import algoliasearch from 'algoliasearch';
import { InstantSearch, connectHits, connectSearchBox} from 'react-instantsearch-dom';
import ProjectCardTest from '../components/ProjectCardTest'
import { Grid, TextField, Button } from '@material-ui/core';
import { db } from '../firebase'
import faker from 'faker'


const searchClient = algoliasearch(
  'ES79ODFVNM',
  'c57f19049ad61dad541fc8f7659c0f92'
);

const Hits = ({ hits }) => (
    <Grid container spacing={3} style={{width: '80%', margin: 'auto auto'}} >
      {hits.map(hit => (
        <Grid item xs={12} sm={6}  key={hit.objectID}>
            <ProjectCardTest hit={hit} />
        </Grid>
      ))}
    </Grid>
);

const CustomHits = connectHits(Hits);

const SearchBox = ({ currentRefinement, isSearchStalled, refine }) => (
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



// const genData = () => {
//     return db.collection('posts').add({
//         name: faker.name.firstName() + " " + faker.name.lastName(),
//         title: faker.name.title(),
//         description: faker.name.jobDescriptor(),
//         skills: [faker.name.jobArea(), faker.name.jobArea()],
//         author: "nBKz6PBSLydmtfCqNQGdjTbd0ew2"
//     })
// }

// const handleClick = () => {
//     Array(20).fill(0).forEach(genData)
// }


export default function SearchDummy() {
    
  

    return (
        <div style={{marginTop: '50px'}}>
            
            <Button variant="contained" onClick={handleClick}>genData </Button>
             <InstantSearch
                indexName="posts"
                searchClient={searchClient}
            > 
            <Grid container spacing={2} justify="center">
                <CustomSearchBox />
            </Grid>

            <CustomHits />
            </InstantSearch>
        </div>
    )
}
