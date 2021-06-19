import React from 'react';
import algoliasearch from 'algoliasearch';
import { InstantSearch, ExperimentalConfigureRelatedItems, Configure } from 'react-instantsearch-dom';
import { Grid, Typography } from '@material-ui/core';
import CustomHits from './CustomHits'

const searchClient = algoliasearch(
    'ES79ODFVNM',
    'c57f19049ad61dad541fc8f7659c0f92'
  );
  
export default function SimilarPosts({ hit }) {
    return (
        <div>
        <Typography variant="h6" style={{marginBottom: 20}}>
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
                    title: { score: 1 },
                    type: { score: 2 },
                    category: { score: 3 },
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