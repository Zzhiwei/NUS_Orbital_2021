import { useForm } from '../../components/useForm'
import { PartA } from './PartA'
import { PartB } from './PartB'
import { PartC } from './PartC'
import CreateTwoToneIcon from '@material-ui/icons/CreateTwoTone';
import PageHeader from '../../components/PageHeader';
import { makeStyles, Stepper, Step, StepLabel } from '@material-ui/core';
import { useState, useEffect } from 'react';
import { EditorState } from 'draft-js'
import { useAuth } from '../../contexts/AuthContext'
import { useHistory }  from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid';

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
    padding: theme.spacing(3, 0, 5),
    background: "inherit"
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
    description: "",
}

const steps = ['Basic Information', 'Additional Information', 'Description']

export const CreatePost = () => {
  
  const classes = useStyles()
  const [activeStep, setActiveStep] = useState(0)
  const { currentUser } = useAuth()
  const history = useHistory()
  const [editorState, setEditorState] = useState(EditorState.createEmpty())
  const [uid, setUid] = useState(0)

  if (!currentUser) {
    history.push('/login')
  }

  useEffect(() => {
    setUid(uuidv4())
  }, [])

  const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange
  } = useForm(initialFValues)

  const props = { values, setValues, errors, setErrors, handleInputChange, setActiveStep, editorState, setEditorState, uid }

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
        { activeStep === 0 &&
          <PageHeader 
              title="Create a New Post"
              subTitle="Please fill in the required details below"
              icon={<CreateTwoToneIcon fontSize="large"/>}
            />
        }
        <Stepper activeStep={activeStep} className={classes.stepper}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {getStepContent(activeStep)}
      </div>
    </main>  
   
  )
}

  