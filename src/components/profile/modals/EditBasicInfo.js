import { Button, InputLabel, makeStyles, Paper } from '@material-ui/core'
import React from 'react'

import { day, month, year } from '../../Selections'
import { useAuth } from '../../../contexts/AuthContext';
import { db } from '../../../firebase'
import Controls from "../../Controls"
import { useForm, Form } from '../../useForm'


const useStyles = makeStyles((theme) => {
    return {
        flex: {
            display: 'flex',
            justifyContent: 'space-between'
        },
        root: {
            padding: '50px',
            position: 'absolute',
            width: "800px",
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)'
        }
        
        
    }
});


export default function EditBasicInfo({ handleClose, basicInfo }) {
    const classes = useStyles()

    const initialFValues = {
        firstName: basicInfo.firstName,
        lastName: basicInfo.lastName,
        gender: basicInfo.gender,
        year: basicInfo.dateOfBirth.year,
        month: basicInfo.dateOfBirth.month,
        day: basicInfo.dateOfBirth.day,
        location: basicInfo.location,
        nationality: basicInfo.nationality,
        bio: basicInfo.bio
    }

    const { currentUser, currentUserData, setCurrentUserData } = useAuth()


    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange
    } = useForm(initialFValues);

    const checkUndefined = (x) => {
        return x === undefined 
            ? ""
            : x;
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const toUpload = {
            firstName: checkUndefined(values.firstName),
            lastName: checkUndefined(values.lastName),
            location: checkUndefined(values.location),
            nationality: checkUndefined(values.nationality),
            bio: checkUndefined(values.bio),
            gender: checkUndefined(values.gender),
            dateOfBirth: {
                day: checkUndefined(values.day),
                month: checkUndefined(values.month),
                year: checkUndefined(values.year)
            }
        }

        
        await db.collection("users").doc(currentUser.uid).update({
            basicInfo: toUpload
        })


        setCurrentUserData({
            ...currentUserData,
            basicInfo: toUpload
        })



        handleClose()        
    }
    
    return (
        <Paper className={classes.root}>
            <Form  onSubmit={handleSubmit}>

                {/* first name & last name */}
                <div className={classes.flex}>
                    <div style={{flex: '4'}}>
                        <InputLabel align="left" style={{marginLeft: '10px'}}>
                                First name
                        </InputLabel>
                        <Controls.Input 
                            style={{paddingRight: '10px'}}
                            fullWidth={false}
                            name={"firstName"}
                            value={values.firstName}
                            variant="outlined"
                            onChange={handleInputChange}

                        />
                    </div>
                    <div style={{flex: '1'}}></div>
                    <div style={{flex: '4'}}>
                        <InputLabel align="left" style={{marginLeft: '10px'}}>
                                Last name
                        </InputLabel>
                        <Controls.Input
                            name={"lastName"}
                            value={values.lastName}
                            variant="outlined"
                            onChange={handleInputChange}
                        />
                    </div>                        
                    <div style={{flex: '2'}}></div>
                </div>

                <br />

                {/* date of birth */}
                
                
                <div className={classes.flex}>
                    <div style={{flex: '1'}}>
                        <InputLabel align="left"  style={{marginLeft: '10px'}}>
                                Gender
                        </InputLabel>

                        <Controls.Select
                                name={"gender"}
                                value={values.gender}
                                variant="outlined"
                                onChange={handleInputChange}
                                options={[{id: 1, value: 'Male'}, {id: 2, value: "Female"}, {id: 3, value: "Others"}]}
                            />
                    </div>
                    <div style={{flex: '0.5'}}></div>
                    <div style={{flex: '3'}}>
                        <InputLabel align="left"  style={{marginLeft: '10px'}}>Your date of birth</InputLabel>
                        <div className={classes.flex}>
                            <div style={{flex: '3'}}>
                                <Controls.Select
                                    name={"day"}
                                    value={values.day}
                                    label="day"
                                    variant="outlined"
                                    onChange={handleInputChange}
                                    options={day()}
                                />
                            </div>
                            <div style={{flex: '1'}}></div>

                            <div style={{flex: '3'}}>
                                <Controls.Select
                                    name={"month"}
                                    value={values.month}
                                    label="month"
                                    variant="outlined"
                                    onChange={handleInputChange}
                                    options={month()}
                                />
                            </div>
                            <div style={{flex: '1'}}></div>

                            <div style={{flex: '3'}}>
                                <Controls.Select
                                    name={"year"}
                                    value={values.year}
                                    label="year"
                                    variant="outlined"
                                    onChange={handleInputChange}
                                    options={year()}
                                />
                            </div>

                            <div style={{flex: '2'}}></div>
                        </div>
                    </div>

                    
                        
                </div>
                <br />

                    <div className={classes.flex}>
                        <div style={{flex: '4'}}>
                            <InputLabel align="left" style={{marginLeft: '10px'}}>
                                    Living at
                            </InputLabel>
                            <Controls.Input
                                name={"location"}
                                value={values.location}
                                variant="outlined"
                                onChange={handleInputChange}
                            />
                        </div>
                        <div style={{flex: '1'}}></div>
                        <div style={{flex: '4'}}>
                            <InputLabel align="left" style={{marginLeft: '10px'}}>
                                    Nationality
                            </InputLabel>
                            <Controls.Input
                                name={"nationality"}
                                value={values.nationality}
                                variant="outlined"
                                onChange={handleInputChange}
                            />
                        </div>
                        <div style={{flex: '2'}}></div>

                                              
                    </div>

                    <br />

                    <InputLabel align="left" style={{marginLeft: '10px'}}>
                            About me
                    </InputLabel>
                    <Controls.Input
                        name={"bio"}
                        value={values.bio}
                        variant="outlined"
                        onChange={handleInputChange}
                        multiline
                        rows="4"
                        placeholder="tell others something about yourself!"
                    />             

                    <br />
                    <br />

                    <div align="center">
                        <Button
                            variant="contained"
                            color="primary"
                            style={{marginRight: '10px', width: '170px'}}
                            type="submit"
                        >
                            save
                        </Button>
                        <Button
                            variant="contained"
                            color="secondary"
                            style={{ width: '170px'}}
                            onClick={handleClose}
                        >
                            discard changes
                        </Button>
                    </div>       

            </Form>
               
        </Paper>
    )
}
