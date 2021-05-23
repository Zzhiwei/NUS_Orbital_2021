import { useParams } from 'react-router'
import usePostFetch from '../components/usePostFetch'
import PostOutput from './PostOutput'

function ViewPost() {

  const { id } = useParams()
  const { data, pending, error } = usePostFetch(id)

  return (
    <div>
        { pending && <div>Loading...</div> }
        { error && <div>{ error } </div> }
        { data && <PostOutput data={data}/> }
    </div>    
  )
}
  
export default ViewPost;