import { useForm } from '../components/useForm'
import { PartA } from './PartA'
import { PartB } from './PartB'
import { PartC } from './PartC'
import { EditorState, convertToRaw } from 'draft-js';
import CreateTwoToneIcon from '@material-ui/icons/CreateTwoTone';
import Copyright from '../components/Copyright';
import PageHeader from '../components/PageHeader';
import { Paper, Button, makeStyles, Stepper, Step, StepLabel } from '@material-ui/core';
import { useState } from 'react';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  pageContent: {
        margin: theme.spacing(1),
        padding: theme.spacing(3),
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
    marginLeft: "10px",
    backgroundColor: theme.palette.background.default,
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

const initialFValues = {
    type: "",
    title: "",
    skills: [],
    education: "", 
    location: "",
    start: new Date(),
    end: new Date(),  
    current: "",
    total: "",
    description: JSON.stringify(convertToRaw(EditorState.createEmpty().getCurrentContent()))
}

const steps = ['', '', '']

export const MultiStepForm = () => {
  
  const classes = useStyles()
  const [activeStep, setActiveStep] = useState(0)

  const handleNext = () => {
    setActiveStep(activeStep + 1)
  }

  const handleBack = () => {
    setActiveStep(activeStep - 1)
  }

  const handleSubmit = () => {
    console.log('submitted')  
    setActiveStep(activeStep - 1)
  }

  const {
    values,
    setValues,
    handleInputChange
  } = useForm(initialFValues)

  const props = { values, setValues, handleInputChange }

  function getStepContent(step) {
    switch(step) {
      case 0:
        return <PartA {...props}/>
      case 1:
        return <PartB {...props}/>
      case 2: 
        return <PartC {...props}/>
      default:
        return "Invalid Part"
    }
  }

  
  return (
    <main className={classes.layout}>
      <PageHeader 
          title="Create a New Post"
          subTitle="Please fill in the required details below"
          icon={<CreateTwoToneIcon fontSize="large"/>}
        />
      <div className={classes.pageContent}>
        <Stepper activeStep={activeStep} className={classes.stepper}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {getStepContent(activeStep)}
        <div className={classes.buttons}>
            {activeStep !== 0 && (
              <Button 
                variant="contained"
                color="secondary" 
                onClick={handleBack}
                className={classes.button}
              >
                Back
              </Button>
            )}
            <Button
              variant="contained"
              color="primary"
              onClick={activeStep === steps.length - 1 ? handleSubmit : handleNext}
              className={classes.button}
            >
              {activeStep === steps.length - 1 ? 'Post' : 'Next'}
            </Button>
        </div>
      </div>
      <Copyright />
    </main>     
  )
}

  