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
            backgroundColor: "#fff",
            borderRadius: "10px",
            border: "1px solid gray"
        },
        container: {
            borderRadius: '4px'
        },
        editor: {
            padding: "5px 15px",
            height: "250px",
            maxHeight: "250px",
            overflow: "auto",
        },
        toolbar: {
            display: "flex",
            justifyContent: "space-around",
            borderBottom: "1px solid gray",
            marginTop: "-8px",
            borderTopLeftRadius: "10px",
            borderTopRightRadius: "10px",
            backgroundColor: "#ebebeb"
        },
        placeHolder: {
            backgroundColor: "#fff",
            padding: "5px 15px",
        },
        anchorLink: {
            color: "#333333",
            textDecoration: "underline"
        }
      }
    }
})

export const PartC = ({ values, setValues, setActiveStep, docRef }) => {

  const classes = useStyles()
  const { description } = values
  const ref = useRef()
  const [open, setOpen] = useState(false)
  const history = useHistory()
  const [loading, setLoading] = useState(false)

  const handleSave = (content) => {
    setValues({...values, description: content})
  }
  
  const handlePrev = () => {
    ref.current?.save()
    setActiveStep(step => step - 1)
  }

  const handleOpen = () => {
    ref.current?.save()
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleSubmit = (e) => {
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
    
    docRef.update({
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
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
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
                            controls={['bold', 'italic', 'underline', 'highlight', 'link', 'numberList', 'bulletList']}
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
                    Save Changes
                </Button>
            </div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>
                  Post Edit Confirmation
                </DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Click 'Back' to review and edit your post or 'Save Changes' to confirm
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose} color="secondary">
                    Back
                  </Button>
                  <Button onClick={handleSubmit} color="primary" disabled={loading}>
                    Save Changes
                  </Button>
                </DialogActions>
            </Dialog>
        </Container>
   
  )
}