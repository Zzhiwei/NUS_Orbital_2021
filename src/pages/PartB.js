import React from "react";
import { Container, Grid, makeStyles, Typography } from "@material-ui/core";
import Controls from "../components/Controls"
import * as selections from '../components/Selections'
import ChipInput from 'material-ui-chip-input'

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiFormControl-root': {
      width: '100%',
      margin: theme.spacing(1) 
    }
  },
  label: {
    textAlign: "left", 
    marginLeft: "20px",
  },
  chip: {
      background: "white", 
      borderRadius: "4px", 
      height: "53px",
  }
}))

export const PartB = ({ values, setValues, handleInputChange, handleBack, handleNext }) => {
  
  const classes = useStyles()
  const { current, total, skills, education, location } = values

  const handleAddChip = (chip) => {
    setValues(val => ({...val, skills: [...val.skills, chip]}))
  }
  
  const handleDeleteChip = (chip, index) => {
    values.skills.splice(index, 1)
    setValues(val => ({...val, skills: val.skills}))
  }

  return(
    <form className={classes.root} align="center" autoComplete="off">
        <Container component="main" maxWidth="sm">
            <Grid container spacing={2}>
            <Grid item xs={12}>
                    {/* <Typography className={classes.label}>
                        Required Skills / Experience
                    </Typography> */}
                    <ChipInput
                        className={classes.chip}
                        name="skills"
                        label="Required Skills / Experience"
                        placeholder="None, HTML/CSS, Photography, etc"
                        variant="outlined"
                        value={skills}
                        onAdd={(chip) => handleAddChip(chip)}
                        onDelete={(chip, index) => handleDeleteChip(chip, index)}
                    />         
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Controls.Select 
                        name="current"
                        label="Current Members"
                        value={current}
                        placeholder="Number of current members?"
                        onChange={handleInputChange}
                        options={selections.groupSize()}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Controls.Select 
                        name="total"
                        label="Total Group Size"
                        value={total}
                        placeholder="Number of members in total?"
                        onChange={handleInputChange}
                        options={selections.groupSize()}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Controls.Select 
                        name="education"
                        label="Education Level"
                        value={education}
                        placeholder="Please specify"
                        onChange={handleInputChange}
                        options={selections.education()}
                    />
                </Grid>
                <Grid  item xs={12} sm={6}>
                    <Controls.Select 
                        name="location"
                        label="Location"
                        value={location}
                        placeholder="Online or in-person?"
                        onChange={handleInputChange}
                        options={selections.location()}
                    />
                </Grid>
            </Grid>
        </Container>
    </form>
  )
}