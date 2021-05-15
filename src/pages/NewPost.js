import { makeStyles, Paper, Typography } from '@material-ui/core';
import PeopleOutlineTwoToneIcon from "@material-ui/icons/PeopleOutlineTwoTone";
import Controls from '../components/Controls';
import PageHeader from '../components/PageHeader';
import PostDetails from './PostDetails';

const useStyles = makeStyles (theme => ({
  pageContent: {
    margin: theme.spacing(5),
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
      <Paper elevation={0} className={classes.pageContent}>
        <PostDetails />
      </Paper>
    </>      
  )
}
  
export default NewPost;
  