import React from 'react';
import algoliasearch from 'algoliasearch';
import { InstantSearch, ExperimentalConfigureRelatedItems } from 'react-instantsearch-dom';
import { Grid, Typography } from '@material-ui/core';
import CustomHits from './CustomHits'

const searchClient = algoliasearch(
    'ES79ODFVNM',
    'c57f19049ad61dad541fc8f7659c0f92'
  );
  
export default function SimilarPosts({ hit }) {
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
                    type: { score: 4 },
                    title: { score: 3 },
                    skills: { score: 2 },
                    education: { score: 1 },
                }}
            />
            <Grid container justify="center">
                <Grid item xs={12}>
                    <CustomHits />
                </Grid>
            </Grid>
            </InstantSearch>
        </div>
      )
  }