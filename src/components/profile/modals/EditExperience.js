
import { FormHelperText, Typography, MenuItem, withStyles, Button, Grid, IconButton, InputLabel, makeStyles, Paper, Select } from '@material-ui/core'
import React, {useState} from 'react'

import firebase from "firebase/app"
import Controls from "../../Controls"
import { useForm, Form } from '../../useForm'
import {expCategory, month, year } from '../../Selections'
import { useAuth } from '../../../contexts/AuthContext'
import { db } from '../../../firebase'


import MuiTextField from "@material-ui/core/TextField";

function getYears() {
    const options = []
    for (let i = 2000; i < 2025; i++) {
        options.push(
            <MenuItem value={i}>{i}</MenuItem>
        )
    }
    return options
}


function renderMonths() {
    const mL = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    return mL.map(x => {
        return <MenuItem value={x}>{x}</MenuItem>
    })
}

const TextField = withStyles({
    root: {
        margin: "0px",
    },
})(MuiTextField);

const useStyles = makeStyles((theme) => {

    return {
        flex: {
            display: 'flex',
        },
        root: {
            height: '90vh',
            padding: '30px',
            position: 'absolute',
            width: "500px",
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#f6eee3',
            overflowY: 'scroll'
        }

    }
});


export default function EditExperience({ customProps, handleClose, open, index} ) {
    const classes = useStyles()
    console.log(customProps)
    const initialFValues = customProps


    const { currentUser, currentUserData, setCurrentUserData } = useAuth() 
    const [loading, setLoading] = useState(false)


    const {
        values,
        handleInputChange
    } = useForm(initialFValues);

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!validate()) {
            return 
        }
        setLoading(true)

        let { experience } = currentUserData
        experience[index] = values
        
        await db.collection('users').doc(currentUser.uid).update({
            experience
        })

        setCurrentUserData({
            ...currentUserData,
            experience
        })


        setLoading(false)
        handleClose()
        
        

    }

    const validate = () => {
        let temp = {}
        temp.category = values.category ? "" : "This field is required"
        temp.organization = values.organization ? "" : "This field is required"
        temp.toMonth = values.toMonth ? "" : "This field is required"
        temp.toYear = values.toYear ? "" : "This field is required"
        temp.fromMonth = values.fromMonth ? "" : "This field is required"
        temp.fromYear = values.fromYear ? "" : "This field is required"
        setErrors({
          ...temp
        })
    
        return Object.values(temp).every(x => x === "");
      }

    return (
        <Paper className={classes.root}>
            <InputLabel align="left" >
                <Typography
                    color={ errors.category ? "secondary" : ""}
                >
                    Category
                </Typography>
            </InputLabel>
            <Select
                fullWidth
                name={"category"}
                value={values.category}
                variant="filled"
                onChange={handleInputChange}
                error={errors.category}
            >
                <MenuItem value="work">Work</MenuItem>
                <MenuItem value="internship">internship</MenuItem>
                <MenuItem value="personal project">personal project</MenuItem>
                <MenuItem value="volunteering">volunteering</MenuItem>
                <MenuItem value="others">others</MenuItem>
            </Select>
            <FormHelperText style={{marginLeft: '10px'}}>
                <Typography
                    color={ errors.category ? "secondary" : ""}
                    style={{
                        fontSize: '12px'
                    }}
                >
                    {errors.category}
                </Typography>
            </FormHelperText>

            <div style={{height: '20px'}}></div>

            <InputLabel align="left" >
                 <Typography
                    color={ errors.organization ? "secondary" : ""}
                >
                    Organization
                </Typography>
            </InputLabel>
            <TextField 
                fullWidth
                name={"organization"}
                value={values.organization}
                onChange={handleInputChange}
                variant="filled"
                error={errors.organization}
                helperText={errors.organization}
            />
            
            <div style={{height: '20px'}}></div>

            <InputLabel align="left" >
                From:
            </InputLabel>
            <div style={{height: '10px'}}></div>

            
            <div style={{display: 'flex'}}>
                <div style={{flex: 1}}>
                    <div style={{width: "80%"}}>
                    <InputLabel align="left"  >
                        <Typography
                            color={ errors.fromMonth ? "secondary" : ""}
                            style={{fontSize: '12px'}}
                        >
                            Month
                        </Typography>
                    </InputLabel>
                    <Select
                        fullWidth
                        name={"fromMonth"}
                        value={values.fromMonth}
                        variant="filled"
                        onChange={handleInputChange}
                        error={errors.fromMonth}
                    >
                        {renderMonths()}
                    </Select>
                    </div>
                </div>
                <div style={{flex: 1}}>
                    <div style={{width: "80%"}}>
                    <InputLabel align="left"  >
                        <Typography
                            color={ errors.fromYear ? "secondary" : ""}
                            style={{fontSize: '12px'}}
                        >
                            Year
                        </Typography>
                    </InputLabel>
                    <Select
                        fullWidth
                        name={"fromYear"}
                        value={values.fromYear}
                        variant="filled"
                        onChange={handleInputChange}
                        error={errors.fromYear}
                    >
                        {getYears()}
                    </Select>
                    </div>
                </div>
                <div style={{flex: 0.3}}></div>
            </div>


            <div style={{height: '20px'}}></div>

            <InputLabel align="left" >
                To:
            </InputLabel>
            <div style={{height: '10px'}}></div>

            
            <div style={{display: 'flex'}}>
                <div style={{flex: 1}}>
                    <div style={{width: "80%"}}>
                    <InputLabel align="left"  >
                        <Typography
                            color={ errors.toMonth ? "secondary" : ""}
                            style={{fontSize: '12px'}}
                        >
                            Month
                        </Typography>
                    </InputLabel>
                    <Select
                        fullWidth
                        name={"toMonth"}
                        value={values.toMonth}
                        variant="filled"
                        onChange={handleInputChange}
                        error={errors.toMonth}

                    >
                        {renderMonths()}
                    </Select>
                    </div>
                </div>
                <div style={{flex: 1}}>
                    <div style={{width: "80%"}}>
                    <InputLabel align="left"  >
                        <Typography
                            color={ errors.toYear ? "secondary" : ""}
                            style={{fontSize: '12px'}}
                        >
                            Year
                        </Typography>
                    </InputLabel>
                    <Select
                        fullWidth
                        name={"toYear"}
                        value={values.toYear}
                        variant="filled"
                        onChange={handleInputChange}
                        error={errors.toYear}
                    >
                       {getYears()}
                    </Select>
                    </div>
                </div>
                <div style={{flex: 0.3}}></div>
            </div>

            

                

                
            <br />

            <InputLabel align="left"> 
                Description
            </InputLabel>
            <TextField
                fullWidth
                name={"description"}
                value={values.description}
                variant="filled"
                onChange={handleInputChange}
                multiline
                rows={8}
            />
                
            
            <div style={{height: '20px'}}></div>




            <div align="center">
                <Button
                    disabled={loading}
                    variant="contained"
                    color="primary"
                    style={{marginRight: '10px', width: '100px'}}
                    onClick={handleSubmit}
                >
                    save
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
        </Paper>
    )
}
