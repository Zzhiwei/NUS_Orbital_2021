import { Grid, Container } from '@material-ui/core'
import { useForm, Form } from '../components/useForm'
import Controls from "../components/Controls"
import ChipInput from 'material-ui-chip-input'
import { useHistory }  from 'react-router-dom'
import { db } from '../firebase'
import { useAuth } from '../contexts/AuthContext'
import { useState } from 'react'
import * as selections from '../components/Selections'



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

    return Object.values(temp).every(x => x == "");
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
      name: currentUserData.firstName + " " + currentUserData.lastName
    })
    .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
    });
    
    setLoading(false)
    
    setTimeout(() => {
      history.push('/')
    }, 300)
    

  }

  const handleAddChip = (chip) => {
    setValues(values => ({...values, skills: [...values.skills, chip]}))
  }

  const handleDeleteChip = (chip, index) => {
    values.skills.splice(index, 1)
    setValues(values => ({...values, skills: values.skills}))
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
            onChange={handleInputChange}
            options={selections.type()}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
        <Controls.Select 
            name="members"
            label="Group Size"
            value={values.members}
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
          <ChipInput
            name="skills"
            label="Required Skills/Experience"
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
            onChange={handleInputChange}
            options={selections.education()}
          />
        </Grid>
        <Grid item item xs={12} sm={6}>
          <Controls.Select 
            name="proficiency"
            label="Proficiency Level"
            value={values.proficiency}
            onChange={handleInputChange}
            options={selections.proficiency()}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controls.Select 
            name="location"
            label="Location"
            value={values.location}
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