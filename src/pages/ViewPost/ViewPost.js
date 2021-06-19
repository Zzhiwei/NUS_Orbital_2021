import { useParams } from 'react-router'
import ViewPostForm from './ViewPostForm'
import algoliasearch from 'algoliasearch';
import { useState } from 'react';

function ViewPost() {

  const { id } = useParams()
  const [hit, setHit] = useState()

  const searchClient = algoliasearch(
    'ES79ODFVNM',
    'c57f19049ad61dad541fc8f7659c0f92'
  );
  const index = searchClient.initIndex('posts')
  index.getObject(id).then(doc => {
    setHit(doc)
  })
  //const data = JSON.parse(id)

  return (
    <div>
        { !hit && <div>Loading...</div>}
        { hit && <ViewPostForm data={hit}/> }
    </div>    
  )
  
}
  
export default ViewPost;