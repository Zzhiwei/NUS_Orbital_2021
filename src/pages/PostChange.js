import { Box, Container, Grid, makeStyles, Typography } from '@material-ui/core'
import ChipInput from 'material-ui-chip-input'
import Controls from "../components/Controls"
import { useForm, Form } from '../components/useForm';
import { db } from '../firebase'
import * as selections from '../components/Selections'
import { useHistory }  from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import firebase from 'firebase/app';
import 'firebase/firestore';
import Copyright from '../components/Copyright'
import CreateTwoToneIcon from '@material-ui/icons/CreateTwoTone';
import PageHeader from '../components/PageHeader';

const useStyles = makeStyles (theme => ({
    pageContent: {
      marginTop: theme.spacing(1),
      padding: theme.spacing(3),
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

export default function PostChange({ data })  {
    const classes = useStyles()
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
        title: data.title,
        skills: data.skills,
        education: data.education, 
        location: data.location,
        schedule: data.schedule,
        current: data.current,
        total: data.total,
        description: data.description
      }

    const [loading, setLoading] = useState(false)

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange
    } = useForm(initialFValues);

    const validate = () => {
        let temp = {}
        temp.type = values.type ? "" : "This field is required"
        temp.title = values.title ? "" : "This field is required"
        temp.location = values.location ? "" : "This field is required"
        temp.description = values.description ? "" : "This field is required"
        setErrors({
        ...temp
        })

    return Object.values(temp).every(x => x === "");
    }

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
            education,
            location,
            schedule,
            current,
            total,
            description
          } = values

        setLoading(true)
        
        docRef.update({
            type,
            title,
            skills,
            education,
            location,
            schedule,
            current,
            total,
            description,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })

        setLoading(false)

        setTimeout(() => {
            history.push('/home/myposts')
        }, 300)

        }

    const handleAddChip = (chip) => {
        setValues(val => ({...val, skills: [...val.skills, chip]}))
    }

    const handleDeleteChip = (chip, index) => {
        values.skills.splice(index, 1)
        setValues(val => ({...val, skills: val.skills}))
    }

    const renderContent = () => {
        if (!render) {
            return <div>Loading...</div>
        }
        return (
        <div>
            <div>
            <PageHeader 
                    title="Edit Post"
                    icon={<CreateTwoToneIcon fontSize="large"/>}
                />
            <Form onSubmit={handleSubmit}>
                <Container component="main" maxWidth="sm">
                    <div className={classes.pageContent}>
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
                                <div className={classes.label}>
                                    <Typography>
                                        Required Skills / Experience
                                    </Typography>
                                </div>
                                <ChipInput
                                    className={classes.chip}
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
                                    onChange={handleInputChange}
                                    options={selections.education()}
                                />
                            </Grid>
                            <Grid  item xs={12} sm={6}>
                                <Controls.Select 
                                    name="location"
                                    label="Location"
                                    value={values.location}
                                    onChange={handleInputChange}
                                    options={selections.location()}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Controls.Select 
                                    name="current"
                                    label="Current Members"
                                    value={values.current}
                                    onChange={handleInputChange}
                                    options={selections.groupSize()}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Controls.Select 
                                    name="total"
                                    label="Total Group Size"
                                    value={values.total}
                                    onChange={handleInputChange}
                                    options={selections.groupSize()}
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
                                    text="Save Changes"
                                />
                            </Grid>
                        </Grid>
                    </div>
                    <Box mt={5} align="center">
                        <Copyright />
                    </Box>
                </Container>
            </Form>
            </div>
        </div>
       )
    }

    return renderContent()
}