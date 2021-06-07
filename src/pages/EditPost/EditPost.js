import { useParams } from 'react-router'
import usePostFetch from '../../components/usePostFetch'
import { EditPostForm } from './EditPostForm'

export default function EditPost() {

  const { id } = useParams()
  const { data, pending, error } = usePostFetch(id)

  return (
    <div>
        { pending && <div>Loading...</div> }
        { error && <div>{ error } </div> }
        { data && <EditPostForm data={data}/> }
    </div>    
  )
}
