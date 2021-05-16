import { makeStyles, Box } from '@material-ui/core';
import PeopleOutlineTwoToneIcon from "@material-ui/icons/PeopleOutlineTwoTone";
import Controls from '../components/Controls';
import Copyright from '../components/Copyright';
import PageHeader from '../components/PageHeader';
import PostDetails from './PostDetails';


const useStyles = makeStyles (theme => ({
  pageContent: {
    margin: theme.spacing(1),
    padding: theme.spacing(3),
  }
}));

function NewPost() {

  const classes = useStyles();

  return (
    <>
      <PageHeader 
        title="Create a New Post"
        subTitle="Please fill in the required details below"
        icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
      />
      <div className={classes.pageContent}>
        <PostDetails />
      </div>
      <Box mt={5} align="center">
        <Copyright />
      </Box>
    </>      
  )
}
  
export default NewPost;
  