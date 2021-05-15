import { Grid } from '@material-ui/core';
import { useForm, Form } from '../components/useForm';
import Controls from "../components/Controls";  

const initialFValues = {
  id: 0,
  title: "",
  skills: "",
  location: "",
  schedule: "",
  members: 0,
  description: ""
}

export default function PostDetails() {

  const validate = () => {
    let temp = {}
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
      <Grid container>
        <Grid item xs={6}>
          <Controls.Input 
            name="title"
            label="Title"
            value={values.title}
            placeholder="Name of the competition or project you are interested in"
            onChange={handleInputChange}
            rows={1}
            error={errors.title}  
          />
          <Controls.Input 
            name="skills"
            label="Required Skills"
            value={values.skills}
            placeholder="None, HTML/CSS, Photography, etc"
            onChange={handleInputChange}
            rows={1}
            error={errors.skills}
          />
          <Controls.Input 
            name="location"
            label="Location"
            value={values.location}
            placeholder="Online, East-side, Jurong, etc"
            onChange={handleInputChange}
            rows={1}
            error={errors.location}
          />
          <Controls.Input 
            name="schedule"
            label="Schedule"
            value={values.schedule}
            placeholder="OTOT/Ad-hoc, Daily 3-5pm, Mondays 7-9pm, etc"
            onChange={handleInputChange}
            rows={1}
            error={errors.schedule}
          />
        </Grid>
        <Grid item xs={6}>
          <Controls.Select 
            name="members"
            label="How many members are you looking for?"
            value={values.members}
            onChange={handleInputChange}
            options={[{id: '1', value: 1}, {id: '2', value: 2}, {id: '3', value: 3}, {id: '4', value: 4}]}
            //errors={errors.members}
          />
          <Controls.Input 
            name="description"
            label="Description"
            value={values.description}
            placeholder="Some other details about the competition or project that you are interested in"
            onChange={handleInputChange}
            rows={9}
            error={errors.description}
          />
        </Grid>
        <Grid item xs={12}>
        <div style={{marginTop: "20px"}}>
            <Controls.Button 
              type="submit"
              text="Submit"
            />
            <Controls.Button 
              text="Reset"
              color="default"
            />
          </div>
        </Grid>
      </Grid>
    </Form>
  )

}