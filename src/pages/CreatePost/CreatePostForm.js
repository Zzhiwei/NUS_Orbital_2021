import { useForm } from '../../components/useForm'
import { PartA } from './PartA'
import { PartB } from './PartB'
import { PartC } from './PartC'
import CreateTwoToneIcon from '@material-ui/icons/CreateTwoTone';
import Copyright from '../../components/Copyright';
import PageHeader from '../../components/PageHeader';
import { makeStyles, Stepper, Step, StepLabel } from '@material-ui/core';
import { useState } from 'react';
import { EditorState, convertToRaw } from 'draft-js'
import { useAuth } from '../../contexts/AuthContext'
import { useHistory }  from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  layout: {
    //borderRadius: "10px",
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 3),
  },
}))

const initialFValues = {
    type: "",
    category: "",
    title: "",
    skills: [],
    education: "", 
    location: "",
    start: null,
    end: null,  
    current: "",
    total: "",
    description: JSON.stringify(convertToRaw(EditorState.createEmpty().getCurrentContent()))
}

const steps = ['Basic Information', 'Additional Information', 'Description']

export const CreatePost = () => {
  
  const classes = useStyles()
  const [activeStep, setActiveStep] = useState(0)
  const { currentUser } = useAuth()
  const history = useHistory()

  if (!currentUser) {
    history.push('/login')
  }

  const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange
  } = useForm(initialFValues)

  const props = { values, setValues, errors, setErrors, handleInputChange, setActiveStep }

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
    
    <main className={classes.root}>
      <div className={classes.layout}>
      <PageHeader 
          title="Create a New Post"
          subTitle="Please fill in the required details below"
          icon={<CreateTwoToneIcon fontSize="large"/>}
        />
        <Stepper activeStep={activeStep} className={classes.stepper}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {getStepContent(activeStep)}
      </div>
      <Copyright />
    </main>  
   
  )
}

  