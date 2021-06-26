import React, { useState } from "react";
import { Container, makeStyles, Button } from "@material-ui/core";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useHistory }  from 'react-router-dom'
import { storage } from '../../firebase'
import firebase from 'firebase/app';
import 'firebase/firestore';
import TextEditor from "../../components/texteditor/TextEditor";
import { convertToRaw } from "draft-js";

const useStyles = makeStyles(theme => ({
  editor: {
    marginLeft: "-6rem",
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

export const PartC = ({ values, setValues, setActiveStep, docRef, editorState, setEditorState, uid }) => {

  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const history = useHistory()
  const [loading, setLoading] = useState(false)

  const handleSave = async () => {
    const content = convertToRaw(editorState.getCurrentContent())
    await setValues({ ...values, description: content })
  }

  const handlePrev = () => {
    setActiveStep(step => step - 1)
  }

  const handleOpen = () => {
    handleSave()
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

    let images = []

    const entityMap = description.entityMap
    for (const entity in entityMap) {
      const src = entityMap[entity].data.src
      const first = src.indexOf('%2F') + 3
      const last = src.indexOf('?')
      const sliced = src.slice(first, last)
      const index = sliced.indexOf('%2F') + 3
      images.push(sliced.slice(index))
    }

    const storageRef = storage.ref(`images/${uid}`)
    storageRef.listAll()
      .then(res => {
        res.items.forEach(file => {
          if (!images.includes(file.name)) {
            console.log('deleting ' + file.name)
            storageRef.child(file.name).delete()
          }
        })
       })

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
      images,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })

    history.push('/loading')
  }

  const props = { editorState, setEditorState, uid }

  return(
        <Container component="main" maxWidth="sm">
            <div className={classes.editor}>
                <TextEditor { ...props }/>
            </div>
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
            <Dialog open={open} onClose={handleClose} minWidth={'sm'}>
                <DialogTitle>
                  Post Edit Confirmation
                </DialogTitle>
                <DialogContent>
                  <DialogContentText>
                      Click 'Back' to review and edit your post or 'Save Changes' to confirm 
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose} color="secondary" disabled={loading}>
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