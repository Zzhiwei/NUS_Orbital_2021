import { Grid, Container } from '@material-ui/core';
import { useForm, Form } from '../components/useForm';
import Controls from "../components/Controls";  

const initialFValues = {
  id: 0,
  type: "",
  title: "",
  skills: "",
  location: "",
  schedule: "",
  members: "",
  description: ""
}

export default function PostDetails() {

  const validate = () => {
    let temp = {}
    temp.type = values.type ? "" : "This field is required"
    temp.title = values.title ? "" : "This field is required"
    temp.skills = values.skills ? "" : "This field is required"
    temp.location = values.location ? "" : "This field is required"
    temp.schedule = values.schedule ? "" : "This field is required"
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

  const handleSubmit = e => {
    e.preventDefault();
    if (validate())
      window.alert('testing...')
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
            options={[{id: 1, value: "Competition"}, {id: 2, value: "Project"}]}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
        <Controls.Select 
            name="members"
            label="Group Size"
            value={values.members}
            onChange={handleInputChange}
            options={[{id: 1, value: 1}, {id: 2, value: 2}, {id: 3, value: 3}, {id: 4, value: 4}, {id: 5, value: 5},]}
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
          <Controls.Input 
            name="skills"
            label="Required Skills/Experience"
            value={values.skills}
            variant="outlined"
            placeholder="None, HTML/CSS, Photography, etc"
            onChange={handleInputChange}
            rows={1}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controls.Select 
            name="education"
            label="Education Level"
            value={values.education}
            onChange={handleInputChange}
            options={[{id: 1, value: "Any"}, {id: 2, value: "Primary"}, {id: 3, value: "Secondary"}, {id: 4, value: "Pre-University"}, {id: 5, value: "Undergraduate"}, {id: 6, value: "Professional"},]}
          />
        </Grid>
        <Grid item item xs={12} sm={6}>
          <Controls.Select 
            name="proficiency"
            label="Proficiency Level"
            value={values.proficiency}
            onChange={handleInputChange}
            options={[{id: 1, value: "Any"}, {id: 2, value: "Beginner"}, {id: 3, value: "Intermediate"}, {id: 4, value: "Advanced"},]}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controls.Input 
            name="location"
            label="Location"
            value={values.location}
            variant="outlined"
            placeholder="Online, East-side, etc"
            onChange={handleInputChange}
            rows={1}
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
              rows={6}
            />
        </Grid>
        <Grid item xs={12}>
          <Controls.Button 
            type="submit"
            text="Post"
          />
        </Grid>
      </Grid>
    </Container>
    </Form>
  )

}