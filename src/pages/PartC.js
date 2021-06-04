import React, { useRef } from "react";
import { Container, Grid, makeStyles, Typography } from "@material-ui/core";
import MUIRichTextEditor  from 'mui-rte'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  label: {
    textAlign: "left", 
    marginLeft: "15px",
    marginBottom: "10px"
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

export const PartC = ({ values, setValues, handleBack, handleNext }) => {

  const classes = useStyles()
  const { description } = values
  const ref = useRef()
  
  const handleSave = (content) => {
    setValues({...values, description: content})
  }
  
  const handleClick = () => {
    ref.current?.save()
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
        </Container>
   
  )
}