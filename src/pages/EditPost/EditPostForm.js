import { useForm } from '../../components/useForm'
import { PartA } from './PartA'
import { PartB } from './PartB'
import { PartC } from './PartC'
import CreateTwoToneIcon from '@material-ui/icons/CreateTwoTone';
import Copyright from '../../components/Copyright';
import PageHeader from '../../components/PageHeader';
import { Paper, makeStyles, Stepper, Step, StepLabel } from '@material-ui/core';
import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext'
import { useHistory }  from 'react-router-dom'
import { db } from '../../firebase'

const useStyles = makeStyles((theme) => ({
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
  paper: {
    borderRadius: "10px",
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 3),
  },
}))

const steps = ['Basic Information', 'Additional Information', 'Description']

export const EditPostForm = ({ data }) => {

  const classes = useStyles()
  const [activeStep, setActiveStep] = useState(0)
  const { currentUser } = useAuth()
  const history = useHistory()
  const [docRef, setDocRef] = useState(null)
  const [render, setRender] = useState(false)

  useEffect(() => {
    if (currentUser) {
        const fetched = db.collection('posts').doc(data.id)
        setDocRef(fetched)
        fetched.get().then(doc => {
            const author = doc.data().author
            //if user is not author redirect to homepage
            if (author !== currentUser.uid) {
                alert("You can only edit your own posts")
                history.push('/')   
            } else {
                setRender(true)
            }
        })
    //if no user is logged in redirect to homepage
    } else {
        alert("You can only edit your own posts")
        history.push('/')
    }
  }, [currentUser, data.id, history])

  const initialFValues = {
    type: data.type,
    category: data.category,
    title: data.title,
    skills: data.skills,
    education: data.education, 
    location: data.location,
    start: data.start.toDate(),
    end: data.end.toDate(),  
    current: data.current,
    total: data.total,
    description: data.description
  }

  const {
    values,
    setValues,
    handleInputChange
  } = useForm(initialFValues)

  const props = { values, setValues, handleInputChange, setActiveStep, docRef }

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

  const renderContent = () => {
    if (!render) {
        return <div>Loading...</div>
    }
    return (
      <main className={classes.layout}>
        <Paper elevation={2} className={classes.paper}>
        <PageHeader 
            title="Edit Your Post"
            subTitle="Change the fields below as required"
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
        </Paper>
        <Copyright />
      </main>  
    )
  }
  return renderContent()
}

  