import React from 'react';
import algoliasearch from 'algoliasearch';
import { InstantSearch, ExperimentalConfigureRelatedItems } from 'react-instantsearch-dom';
import { Grid, Typography } from '@material-ui/core';
import CustomHits from './CustomHits'

const searchClient = algoliasearch(
    'ES79ODFVNM',
    'c57f19049ad61dad541fc8f7659c0f92'
  );
  
export default function SimilarPosts({ hit, setOpenB, setOpenUb }) {
    return (
        <div>
        <Typography variant="h6" style={{marginBottom: 10}}>
            Similar Posts
        </Typography>
            <InstantSearch
                indexName="posts"
                searchClient={searchClient}
            > 
            <ExperimentalConfigureRelatedItems 
                hit={hit}
                hitsPerPage={3}
                matchingPatterns={{
                    type: { score: 6 },
                    title: { score: 5 },
                    category: { score: 4 },
                    skills: { score : 3 },
                    education: { score: 2 },
                    location: { score: 1 }
                }}
            />
            <Grid container justify="center">
                <Grid item xs={12}>
                    <CustomHits setOpenB={setOpenB} setOpenUb={setOpenUb}/>
                </Grid>
            </Grid>
            </InstantSearch>
        </div>
      )
  }