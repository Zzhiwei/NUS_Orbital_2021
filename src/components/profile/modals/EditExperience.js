import { Button, Grid, InputLabel, makeStyles, Paper } from '@material-ui/core'
import React from 'react'
import firebase from "firebase/app"
import Controls from "../../Controls"
import { useForm, Form } from '../../useForm'
import {expCategory, month, year } from '../../Selections'
import { useAuth } from '../../../contexts/AuthContext'
import { db } from '../../../firebase'

const useStyles = makeStyles(() => {
    return {
        flex: {
            display: 'flex',
            justifyContent: 'space-between'
        },
        root: {
            padding: '50px',
            position: 'absolute',
            width: "70%",
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)'
        }

    }
});


export default function EditEducation({ handleClose, open }) {
    const classes = useStyles()
    
    const initialFValues = {       
        category: "",
        organization: "",
        fromMonth: "",
        fromYear: "",
        toMonth: "",
        toYear: "",
        description: ""
    }

    const { currentUser, setCurrentUserData } = useAuth() 

    const {
        values,
        handleInputChange
    } = useForm(initialFValues);

    const handleSubmit = async (e) => {
        e.preventDefault()

        await db.collection('users').doc(currentUser.uid).update({
            experience: firebase.firestore.FieldValue.arrayUnion(values)
        })

        await db.collection('users').doc(currentUser.uid).get().then(res => {
            setCurrentUserData(res.data())
        })
        
        //update local => causes infiniteloop when creating duplicate
        
        // setCurrentUserData({
        //     ...currentUserData,
        //     experience: [
        //         ...currentUserData.experience,
        //         values
        //     ]
        // })

        handleClose()
        

    }

    return (
        <Paper className={classes.root}>
            <Form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={8} sm={4} >
                        <InputLabel align="left" style={{marginLeft: '10px'}}>
                            Category
                        </InputLabel>
                        <Controls.Select
                            name={"category"}
                            value={values.category}
                            variant="outlined"
                            onChange={handleInputChange}
                            options={expCategory()}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <InputLabel align="left" style={{marginLeft: '10px'}}> 
                            Organization
                        </InputLabel>
                        <Controls.Input
                            fullWidth
                            name={"organization"}
                            value={values.organization}
                            variant="outlined"
                            onChange={handleInputChange}
                        />
                    </Grid>
                </Grid>

                <br />
                

                <Grid container>
                    <Grid item xs={12} sm={6}>
                        <InputLabel align="left" style={{marginLeft: '10px', marginBottom: '5px'}}> 
                            From 
                        </InputLabel>
                        <Grid container spacing={3}> 
                            <Grid item xs={4}>
                                <Controls.Select
                                    name={"fromMonth"}
                                    value={values.fromMonth}
                                    variant="outlined"
                                    onChange={handleInputChange}
                                    options={month()}
                                    label="month"
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <Controls.Select
                                    name={"fromYear"}
                                    value={values.fromYear}
                                    variant="outlined"
                                    onChange={handleInputChange}
                                    options={year()}
                                    label="year"
                                />
                            </Grid>
                        </Grid>               

                        
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <InputLabel align="left" style={{marginLeft: '10px', marginBottom: '5px'}}> 
                            To 
                        </InputLabel>
                        <Grid container spacing={3}> 
                            <Grid item xs={4}>
                                <Controls.Select
                                    name={"toMonth"}
                                    value={values.toMonth}
                                    variant="outlined"
                                    onChange={handleInputChange}
                                    options={month()}
                                    label="month"
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <Controls.Select
                                    name={"toYear"}
                                    value={values.toYear}
                                    variant="outlined"
                                    onChange={handleInputChange}
                                    options={year()}
                                    label="year"
                                />
                            </Grid>
                        </Grid>  
                    </Grid>

                </Grid>
                
                

                
                <br />

                <InputLabel align="left" style={{marginLeft: '10px'}}> 
                    Description
                </InputLabel>
                <Controls.Input
                    fullWidth
                    name={"description"}
                    value={values.description}
                    variant="outlined"
                    onChange={handleInputChange}
                    multiline
                    rows={3}
                />
                    
                <br />
                <br />




                <div align="center">
                    <Button
                        variant="contained"
                        color="primary"
                        style={{marginRight: '10px', width: '100px'}}
                        type="submit"
                    >
                        add
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        style={{ width: '100px'}}
                        onClick={handleClose}
                    >
                        cancel
                    </Button>
                </div>       
            </Form>            
        </Paper>
    )
}
