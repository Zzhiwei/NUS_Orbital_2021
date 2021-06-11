import { useParams } from 'react-router'
import PostOutput from './PostOutput'
import ViewPostForm from './ViewPostForm'
import usePostFetch from '../../components/usePostFetch'

function ViewPost() {

  const { id } = useParams()
  const { data, pending, error } = usePostFetch(id)

  return (
    <div>
        { pending && <div>Loading...</div> }
        { error && <div>{ error } </div> }
        { data && <ViewPostForm data={data}/> }
    </div>    
  )
}
  
export default ViewPost;