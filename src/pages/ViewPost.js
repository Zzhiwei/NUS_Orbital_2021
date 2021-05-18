import { Box, Container, Grid, TextField, makeStyles } from '@material-ui/core';
import ChipInput from 'material-ui-chip-input';
import { useState } from 'react';
import Copyright from '../components/Copyright';
import PageHeader from '../components/PageHeader';
import { db } from '../firebase'
import DescriptionIcon from '@material-ui/icons/Description';


const useStyles = makeStyles (theme => ({
    pageContent: {
      marginTop: theme.spacing(1),
      padding: theme.spacing(3),
    }
}))

function ViewPost() {

  const classes = useStyles() 

  const [author, setAuthor] = useState("")
  const [type, setType] = useState("")
  const [members, setMembers] = useState("")
  const [title, setTitle] = useState("")
  const [skills, setSkills] = useState([])
  const [edu, setEdu] = useState("")
  const [prof, setProf] = useState("")
  const [loc, setLoc] = useState("")
  const [sched, setSched] = useState("")
  const [desc, setDesc] = useState("")
  
  //const id1 = "0KHI2MTyaNB77oq3vrDU"
  //const id2 = "eMk3VHrEjqHelqtE0BvF"
  const id3 = "zr6wzoqMtODGFf0b0JRy"

  db.collection('posts').doc(id3).get().then((snapshot) => {
      const post = snapshot.data()
      setAuthor(post.author)
      setType(post.type)
      setMembers(post.members)
      setTitle(post.title)
      setSkills(post.skills)
      setEdu(post.education)
      setProf(post.proficiency)
      setLoc(post.location)
      setSched(post.schedule)
      setDesc(post.description)
  })

  return (
    <>
    <PageHeader 
            title={title}
            subTitle={"by " + {author}}
            icon={<DescriptionIcon fontSize="large"/>}
        />
    <Container component="main" maxWidth="sm">
        <div className={classes.pageContent}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField fullWidth multiline rows={1} variant="outlined" label="Type" value={type}/>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField fullWidth multiline rows={1} variant="outlined" label="Group Size" value={members}/>
                </Grid>
                <Grid item xs={12}>
                    <ChipInput fullWidth  multiline rows={1} variant="outlined" label="Skills" value={skills}/>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField fullWidth multiline rows={1} variant="outlined" label="Education"value={edu}/>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField fullWidth multiline rows={1} variant="outlined" label="Proficiency" value={prof}/>  
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField fullWidth multiline rows={1} variant="outlined" label="Location" value={loc}/>  
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField fullWidth multiline rows={1} variant="outlined" label="Commitment Period" value={sched}/>  
                </Grid>
                <Grid item xs={12}>
                    <TextField fullWidth multiline rows={10} variant="outlined" label="Description" value={desc}/>  
                </Grid>
            </Grid>
        </div>
        <Box mt={5} align="center">
            <Copyright />
        </Box>
    </Container>  
    </>    
  )
}
  
export default ViewPost;