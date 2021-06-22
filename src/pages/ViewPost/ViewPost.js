import { useParams } from 'react-router'
import ViewPostForm from './ViewPostForm'
import algoliasearch from 'algoliasearch';
import React, { useState, useEffect } from 'react';
import { makeStyles, CircularProgress } from '@material-ui/core'

const useStyles = makeStyles (() => ({
  loading: {
      position: 'absolute',
      left: '50%',
      top: '50%',
  },
}))

const searchClient = algoliasearch(
  'ES79ODFVNM',
  'c57f19049ad61dad541fc8f7659c0f92'
);

const index = searchClient.initIndex('posts')

function ViewPost() {
  const classes = useStyles()
  const { id } = useParams()
  const [hit, setHit] = useState()
  const [render, setRender] = useState(false)

  useEffect(() => {
    index.getObject(id).then(doc => {
      setHit(doc)
      setRender(true)
    })
  }, [id])

  const renderContent = () => {
    if (!render) {
      return <CircularProgress className={classes.loading}/>
    }
    return <ViewPostForm data={hit}/>
  }

  return renderContent()
}
  
export default ViewPost;