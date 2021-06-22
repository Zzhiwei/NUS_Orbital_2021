import { useParams } from 'react-router'
import usePostFetch from '../../components/usePostFetch'
import { EditPostForm } from './EditPostForm'
import { makeStyles, CircularProgress } from '@material-ui/core'

const useStyles = makeStyles(() => ({
  loading: {
      position: 'absolute',
      left: '50%',
      top: '50%',
  },
}))

export default function EditPost() {

  const classes = useStyles()
  const { id } = useParams()
  const { data, pending, error } = usePostFetch(id)

  return (
    <div>
        { pending && <CircularProgress className={classes.loading}/> }
        { error && <div>{ error } </div> }
        { data && <EditPostForm data={data}/> }
    </div>    
  )
}
