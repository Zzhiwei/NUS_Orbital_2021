import React from "react";
import { Grid, makeStyles, Button } from "@material-ui/core";
import Controls from "../../components/Controls"
import * as selections from '../../components/Selections'
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
      marginTop: "15px",
      background: "white", 
      borderRadius: "4px", 
      height: "53px",
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

export const PartB = ({ values, setValues, errors, setErrors, handleInputChange, setActiveStep }) => {

  const validate = () => {
    let temp = {}
    temp.current = values.current ? "" : "This field is required"
    temp.total = values.total ? "" : "This field is required"
    temp.education = values.education ? "" : "This field is required"
    temp.location = values.location ? "" : "This field is required"
    setErrors({
      ...temp
    })
    return Object.values(temp).every(x => x === "");
  }
  
  const classes = useStyles()
  const { current, total, skills, education, location } = values

  const handleAddChip = (chip) => {
    setValues(val => ({...val, skills: [...val.skills, chip]}))
  }
  
  const handleDeleteChip = (chip, index) => {
    values.skills.splice(index, 1)
    setValues(val => ({...val, skills: val.skills}))
  }

  const handleNext = () => {
    if (values.current > values.total) {
      alert("current members cannot be more than total group size")
      return
    } else if (!validate()) {
      return
    }
    setActiveStep(step => step + 1)
  }

  const handleBack = () => {
    setActiveStep(step => step - 1)
  }

  return(
    <>
      <Grid container spacing={3}>
          <Grid item xs={12}>
              {/* <Typography className={classes.label}>
                  Required Skills / Experience
              </Typography> */}
              <ChipInput
                  className={classes.chip}
                  fullWidth
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
      <div className={classes.buttons}>
          <Button 
              className={classes.button}
              variant="contained"
              color="secondary" 
              onClick={handleBack}
            >
              Back
          </Button>
          <Button 
              className={classes.button}
              variant="contained"
              color="primary" 
              onClick={handleNext}
            >
              Next
          </Button>
      </div>
  </>
  )
}