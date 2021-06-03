import React, { useState } from "react";
import { Container, Grid, Button, makeStyles } from "@material-ui/core";
import RichTextEditor from 'react-rte';

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiFormControl-root': {
      width: '100%',
      margin: theme.spacing(1) 
    }
  },
}))

export const PartC = ({ values, setValues, navigation }) => {

  const { description } = values
  const [editorValue, setEditorValue] = useState(RichTextEditor.createValueFromString(description, 'markdown'))

  const handleInputChange = val => {
    setEditorValue(val)
    setValues({...values, description: val.toString('markdown')})
  }

  console.log(description)
  // const ref = useRef()
  // const handleInputChange = event => {
  //   // `event` is of type Draft.Model.ImmutableData.EditorState
  //   // Use convertToRaw to save the editor state including inline styles, blocks, etc.
  //   const content = JSON.stringify(convertToRaw(event.getCurrentContent()))
  //   // Or use `getPlainText` method to get the text
  //   // https://draftjs.org/docs/api-reference-content-state#getplaintext
  //   // const content = event.getCurrentContent().getPlainText()
  //   setValues({ ...values, description : content })
  // }
  
  // const handleSave = () => {
  //   ref.current.save();
  // };

  const classes = useStyles()

  return(
    <form className={classes.root} align="center" autoComplete="off">
        <Container component="main" maxWidth="xs">
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <RichTextEditor
                        name="description"
                        value={editorValue}
                        label="Description"
                        placeholder="Some details ..."
                        onChange={handleInputChange}
                        //inlineToolbar={true}
                        // rows={10}
                      />
                </Grid>
                <Grid item xs={4}>
                    <Button
                        style={{marginRight: "100px", marginTop: "10px"}}
                        color="secondary"
                        variant="contained"
                        onClick={() => navigation.previous()}
                    >
                        Back
                    </Button>
                </Grid>
                <Grid item xs={4}>
                    <Button
                        style={{marginLeft: "131px", marginTop: "10px"}}
                        variant="contained"
                        color="primary"
                        onClick={() => navigation.next()}
                    >
                        Next
                    </Button>
                </Grid>
            </Grid>
        </Container>
    </form>
  )
}