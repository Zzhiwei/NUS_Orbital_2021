import React, { useRef, useState } from "react";
import { Container, Grid, makeStyles, Button } from "@material-ui/core";
import MUIRichTextEditor  from 'mui-rte'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useHistory }  from 'react-router-dom'
import { db } from '../../firebase'
import { useAuth } from '../../contexts/AuthContext'
import firebase from 'firebase/app';
import 'firebase/firestore';

const useStyles = makeStyles(theme => ({
  label: {
    textAlign: "left", 
    marginLeft: "15px",
    marginBottom: "10px"
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
    position: "relative",
    left: "50px"
  },
  button: {
    marginTop: theme.spacing(5),
    marginLeft: theme.spacing(1),
  },
}))

const darkTheme = createMuiTheme()

Object.assign(darkTheme, {
  overrides: {
    MUIRichTextEditor: {
        root: {
            marginTop: "1rem",
            marginLeft: "-3rem",
            backgroundColor: "#fff",
            borderRadius: "4px",
            border: "1px solid gray",
            width: "119%",
        },
        container: {
            borderRadius: '4px'
        },
        editor: {
            padding: "5px 15px",
            height: "300px",
            maxHeight: "300px",
            overflow: "auto",
        },
        toolbar: {
            display: "flex",
            justifyContent: "space-evenly",
            borderBottom: "1px solid gray",
            marginTop: "-8px",
            borderTopLeftRadius: "4px",
            borderTopRightRadius: "4px",
            backgroundColor: "#ebebeb",
            //backgroundColor: '#027dc5',
            height: "35px",
        },
        placeHolder: {
            backgroundColor: "#fff",
            padding: "5px 15px",
            height: "285px",
            width: "595px"
        },
        anchorLink: {
            color: "#333333",
            textDecoration: "underline"
        }
      }
    }
})

export const PartC = ({ values, setValues, setActiveStep }) => {

  const validate = () => {
    let temp = {}
    temp.description = values.description ? "" : "This field is required"
    // setErrors({
    //   ...temp
    // })
    return Object.values(temp).every(x => x === "");
  }

  const classes = useStyles()
  const { description } = values
  const ref = useRef()
  const [open, setOpen] = useState(false)
  const { currentUser, currentUserData, setCurrentUserData } = useAuth()
  const history = useHistory()
  const docRef = db.collection("users").doc(currentUser.uid)
  const [loading, setLoading] = useState(false)

  const handleSave = (content) => {
    setValues({...values, description: content})
  }
  
  const handlePrev = () => {
    ref.current?.save()
    setActiveStep(step => step - 1)
  }

  const handleOpen = () => {
    if (!validate()) {
      alert('form not filled in correctly')
      return
    }
    ref.current?.save()
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const {
      type,
      category,
      title,
      skills,
      education,
      location,
      start,
      end,
      current,
      total,
      description
    } = values

    const commitment = start.toString().substring(4,15) + " - " + end.toString().substring(4,15)

    setLoading(true)
    
    await db.collection("posts").add({
      type,
      category,
      title,
      skills,
      education,
      location,
      start,
      end,
      commitment,
      current,
      total,
      description,
      author: currentUser.uid,
      name: currentUserData.basicInfo.firstName + " " + currentUserData.basicInfo.lastName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    })
    .then(
      post => {
        docRef.update({
          posts: firebase.firestore.FieldValue.arrayUnion(post.id)
        })
        const posts = [...currentUserData.posts]
        posts.push(post.id)
        console.log("deleted post")
        setCurrentUserData({
            ...currentUserData, 
            posts
        })
    })
  
    //set timeout because it takes time for algolia index to update
    setTimeout(() => {
      history.push('/myposts')
    }, 1000)
  }


  return(
    
        <Container component="main" maxWidth="sm">
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    {/* <Typography className={classes.label}>
                        Description
                    </Typography> */}
                    <MuiThemeProvider theme={darkTheme}>
                        <MUIRichTextEditor
                            label="Some details ..."
                            onSave={handleSave}
                            defaultValue={description}
                            ref={ref}
                            inlineToolbar={true}
                            controls={['bold', 'italic', 'underline', 'highlight', 'numberList', 'bulletList', 'quote', 'code']}
                          />
                    </MuiThemeProvider>
                </Grid>
            </Grid>
            <div className={classes.buttons}>
                <Button 
                    className={classes.button}
                    variant="contained"
                    color="secondary" 
                    onClick={handlePrev}
                    >
                    Back
                </Button>
                <Button 
                    className={classes.button}
                    variant="contained"
                    color="primary" 
                    onClick={handleOpen}
                    >
                    Post
                </Button>
            </div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>
                  Post Submission Confirmation
                </DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Click 'Back' to review and edit your post or 'Post' to confirm
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose} color="secondary">
                    Back
                  </Button>
                  <Button onClick={handleSubmit} color="primary" disabled={loading}>
                    Post
                  </Button>
                </DialogActions>
            </Dialog>
        </Container>
   
  )
}