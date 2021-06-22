import { Button, InputLabel, makeStyles, Paper, withStyles, Select, MenuItem, Grid } from '@material-ui/core'
import React from 'react'
import { useAuth } from '../../../contexts/AuthContext';
import { db } from '../../../firebase'
import Controls from "../../Controls"
import { useForm, Form } from '../../useForm'
import MuiTextField from '@material-ui/core/TextField';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import 'date-fns';

const useStyles = makeStyles(() => {
    return {
        flex: {
            display: 'flex',
            justifyContent: 'center',
        },
        root: {
            padding: '30px',
            position: 'absolute',
            width: "500px",
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#f6eee3'
        },
        root2: {
            padding: '50px',
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            height: '80vh',
            width: '30vw',
            backgroundColor: '#f6eee3'
        },
        input: {
            margin: '0px'
        },
        global: {
            '& .MuiFormControl-marginNormal': {
                margin: "0px",
            }
        }
    }
});

const TextField = withStyles({
    root: {
        margin: '0px'
    }
  })(MuiTextField);

export default function EditBasicInfo({ handleClose, basicInfo }) {
    const classes = useStyles()

    const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

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

    // return (
    //     <Paper className={classes.root2}>

    //     </Paper>
    // )

    
    return (
        <Paper className={classes.root}>
            <Form  onSubmit={handleSubmit}>

                {/* first name & last name */}
                <div className={classes.flex}>
                    <div style={{flex: '4'}}>
                        <InputLabel align="left" >
                                First name
                        </InputLabel>
                        <TextField 
                            name={"firstName"}
                            variant="outlined"
                            fullWidth
                            value={values.firstName}
                            onChange={handleInputChange}
                        />
                        {/* <Controls.Input 
                            style={{paddingRight: '10px'}}
                            fullWidth={false}
                            name={"firstName"}
                            value={values.firstName}
                            variant="outlined"
                            onChange={handleInputChange}

                        /> */}
                    </div>
                    <div style={{flex: 0.5}}></div>
                    <div style={{flex: '4'}}>
                        <InputLabel align="left" >
                                Last name
                        </InputLabel>
                        <TextField
                            fullWidth
                            name={"lastName"}
                            value={values.lastName}
                            variant="outlined"
                            onChange={handleInputChange}
                        />
                    </div>                        
                </div>

                <br />

                {/* date of birth */}
                
                
                <div className={classes.flex}>
                    <div style={{flex: '1'}}>
                        <InputLabel align="left"  >
                                Gender
                        </InputLabel>
                        <Select
                            value={values.gender}
                            variant="outlined"
                            onChange={handleInputChange}
                            fullWidth
                        >
                            <MenuItem value={'Male'}>{'Male'}</MenuItem>
                            <MenuItem value={'Female'}>{'Female'}</MenuItem>
                            <MenuItem value={'others'}>{'others'}</MenuItem>

                        </Select> 
                         {/* <Controls.Select
                                name={"gender"}
                                value={values.gender}
                                onChange={handleInputChange}
                                options={[{id: 1, value: 'Male'}, {id: 2, value: "Female"}, {id: 3, value: "Others"}]}

                            /> */}
                    </div>
                    <div style={{flex: '0.5'}}></div>
                    <div style={{flex: '3'}}>
                        <InputLabel align="left"  >Your date of birth</InputLabel>
                        {/* <div className={classes.flex}>
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
                        </div> */}
                         <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <Grid container justify="left" alignItems="flex-end">
                                <KeyboardDatePicker
                                style={{margin: '0px'}}
                                disableToolbar
                                variant="dialog"
                                format="MM/dd/yyyy"
                                id="date-picker-inline"
                                label="DD/MM/YYYY"
                                value={null}
                                onChange={handleDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                                />
                            </Grid>
                        </MuiPickersUtilsProvider>
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
                        <div style={{flex: '0.5'}}></div>
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
                        rows="12"
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
