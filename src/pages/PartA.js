import React from "react";
import { Container, Grid, makeStyles } from "@material-ui/core";
import Controls from "../components/Controls"
import * as selections from '../components/Selections'

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiFormControl-root': {
      width: '100%',
      margin: theme.spacing(1) 
    }
  }
}))

export const PartA = ({ values, handleInputChange, handleNext }) => {
  
  const classes = useStyles()
  const { title, type, start, end } = values

  return(
    <form className={classes.root} align="center" autoComplete="off">
        <Container component="main" maxWidth="xs">
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Controls.Input 
                        name="title"
                        label="Title"
                        value={title}
                        variant="outlined"
                        placeholder="Name of competition/project"
                        onChange={handleInputChange}
                        rows={1}
                    />
                </Grid>
                <Grid item xs={12}>
                      <Controls.Select 
                          name="type"
                          label="Type"
                          value={type}
                          placeholder="Please Specify"
                          onChange={handleInputChange}
                          options={selections.type()}
                      />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Controls.Date 
                        name="start"
                        label="Start Date"
                        value={start}
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Controls.Date 
                        name="end"
                        label="End Date"
                        value={end}
                        onChange={handleInputChange}
                    />
                </Grid>
            </Grid>
        </Container>
    </form>
  )
}