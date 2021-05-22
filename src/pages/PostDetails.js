import { Grid, Container, Typography } from '@material-ui/core'
import { useForm, Form } from '../components/useForm'
import Controls from "../components/Controls"
import ChipInput from 'material-ui-chip-input'
import { useHistory }  from 'react-router-dom'
import { db } from '../firebase'
import { useAuth } from '../contexts/AuthContext'
import { useState } from 'react'
import * as selections from '../components/Selections'
import firebase from 'firebase/app';
import 'firebase/firestore';

const initialFValues = {
  type: "",
  title: "",
  skills: [],
  proficiency: "",
  education: "", 
  location: "",
  schedule: "",
  members: "",
  description: ""
}

export default function PostDetails() {
  const { currentUser, currentUserData } = useAuth()
  const history = useHistory()

  //if no user is logged in redirect to sign up
  if (!currentUser) {
    history.push('/login')
  }

  const [loading, setLoading] = useState(false)
  
  const validate = () => {
    let temp = {}
    temp.type = values.type ? "" : "This field is required"
    temp.title = values.title ? "" : "This field is required"
    temp.location = values.location ? "" : "This field is required"
    temp.members = values.members ? "" : "This field is required"
    temp.description = values.description ? "" : "This field is required"
    setErrors({
      ...temp
    })

    return Object.values(temp).every(x => x === "");
  }

  const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange
  } = useForm(initialFValues);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      alert('form not filled in correctly')
      return
    }
    const {
      type,
      title,
      skills,
      proficiency,
      education,
      location,
      schedule,
      members,
      description
    } = values

    setLoading(true)
    db.collection("posts").add({
      type,
      title,
      skills,
      proficiency,
      education,
      location,
      schedule,
      members,
      description,
      author: currentUser.uid,
      name: currentUserData.basicInfo.firstName + " " + currentUserData.basicInfo.lastName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp() 
    })
    setLoading(false)
    
    setTimeout(() => {
      history.push('/')
    }, 300)
    

  }

  const handleAddChip = (chip) => {
    setValues(val => ({...val, skills: [...val.skills, chip]}))
  }

  const handleDeleteChip = (chip, index) => {
    values.skills.splice(index, 1)
    setValues(val => ({...val, skills: val.skills}))
  }

  return (

    <Form onSubmit={handleSubmit}>
        <Container component="main" maxWidth="sm">
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Controls.Select 
                        name="type"
                        label="Type"
                        value={values.type}
                        placeholder="Competition or project?"
                        onChange={handleInputChange}
                        options={selections.type()}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Controls.Select 
                        name="members"
                        label="Group Size"
                        value={values.members}
                        placeholder="How many members?"
                        onChange={handleInputChange}
                        options={selections.groupSize()}
                      />
                </Grid>
                <Grid item xs={12}>
                    <Controls.Input 
                        name="title"
                        label="Title"
                        value={values.title}
                        variant="outlined"
                        placeholder="Name of competition/project"
                        onChange={handleInputChange}
                        rows={1}
                    />
                </Grid>
                <Grid item xs={12}>
                    <div style={{textAlign: "left", marginLeft: "20px"}}>
                        <Typography variant="h7">
                            Required Skills / Experience
                        </Typography>
                    </div>
                    <ChipInput
                        style={{background: "white", borderRadius: "4px", height: "53px"}}
                        name="skills"
                        placeholder="None, HTML/CSS, Photography, etc"
                        variant="outlined"
                        value={values.skills}
                        onAdd={(chip) => handleAddChip(chip)}
                        onDelete={(chip, index) => handleDeleteChip(chip, index)}
                    />         
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Controls.Select 
                        name="education"
                        label="Education Level"
                        value={values.education}
                        placeholder="Please specify"
                        onChange={handleInputChange}
                        options={selections.education()}
                    />
                </Grid>
                <Grid  item xs={12} sm={6}>
                    <Controls.Select 
                        name="proficiency"
                        label="Proficiency Level"
                        value={values.proficiency}
                        placeholder="Please specify"
                        onChange={handleInputChange}
                        options={selections.proficiency()}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Controls.Select 
                        name="location"
                        label="Location"
                        value={values.location}
                        placeholder="Online or in-person?"
                        onChange={handleInputChange}
                        options={selections.location()}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Controls.Input 
                        name="schedule"
                        label="Commitment Period"
                        value={values.schedule}
                        variant="outlined"
                        placeholder="21-26 June, etc"
                        onChange={handleInputChange}
                        rows={1}
                    />
                  </Grid>
                <Grid item xs={12}>
                    <Controls.Input 
                        name="description"
                        label="Additional Information"
                        value={values.description}
                        variant="outlined"
                        placeholder="Other details about the competition/project..."
                        onChange={handleInputChange}
                        rows={10}
                      />
                </Grid>
                <Grid item xs={12}>
                    <Controls.Button 
                        disabled={loading}
                        type="submit"
                        text="Post"
                    />
                </Grid>
            </Grid>
        </Container>
    </Form>
  )

}