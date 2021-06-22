
import {
    Button,
    InputLabel,
    makeStyles,
    Paper,
    withStyles,
    Select,
    MenuItem,
    Grid,
    Typography,
    FormControlLabel,
    Checkbox
} from "@material-ui/core";
import React, { useState } from "react";
import firebase from "firebase";


import { day, month, year } from "../../Selections";
import { useAuth } from "../../../contexts/AuthContext";
import { db } from "../../../firebase";
import Controls from "../../Controls";
import { useForm, Form } from "../../useForm";

import MuiTextField from "@material-ui/core/TextField";

import DateFnsUtils from "@date-io/date-fns";
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from "@material-ui/pickers";
import "date-fns";
import { Radio } from "@material-ui/icons";

const useStyles = makeStyles((theme) => {

    return {
        flex: {
            display: "flex",
        },
        root: {
            height: '90vh',
            padding: "30px",
            position: "absolute",
            width: "500px",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#f6eee3",
            overflowY: 'scroll'
        },
        
    };

});

const TextField = withStyles({
    root: {
        margin: "0px",
    },
})(MuiTextField);






export default function EditBasicInfo({ handleClose, basicInfo, email }) {
    const classes = useStyles();
    const { currentUser, currentUserData, setCurrentUserData } = useAuth();
    const [selectedDate, setSelectedDate] = React.useState(basicInfo.dateOfBirth.toDate());
    const [showEmail, setShowEmail] = useState(basicInfo.showEmail)
    const [loading, setLoading] = useState(false)
    console.log({selectedDate})

    const initialFValues = {
        firstName: basicInfo.firstName,
        lastName: basicInfo.lastName,
        gender: basicInfo.gender,
        location: basicInfo.location,
        nationality: basicInfo.nationality,
        bio: basicInfo.bio,
    };

    const { values, setValues, errors, setErrors, handleInputChange } =
    useForm(initialFValues);

    const validate = () => {
        let temp = {}
        temp.firstName = values.firstName ? "" : "You can't leave this empty"

        setErrors({
          ...temp
        })
    
        return Object.values(temp).every(x => x === "");
      }

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };
   

    const checkUndefined = (x) => {
        return x === undefined ? "" : x;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) {
            return
        }
        setLoading(true)

        const toUpload = {
            firstName: checkUndefined(values.firstName),
            lastName: checkUndefined(values.lastName),
            location: checkUndefined(values.location),
            nationality: checkUndefined(values.nationality),
            bio: checkUndefined(values.bio),
            gender: checkUndefined(values.gender),
            dateOfBirth: firebase.firestore.Timestamp.fromDate(selectedDate),
            showEmail: showEmail
        };

        await db.collection("users").doc(currentUser.uid).update({
            basicInfo: toUpload,
        });

        setCurrentUserData({
            ...currentUserData,
            basicInfo: toUpload,
        });
        setLoading(false)
        handleClose();

        

    };

    function handleCheckbox() {
        setShowEmail(!showEmail)
    }

    return (
        <Paper className={classes.root}>
                {/* first name & last name */}
                <div className={classes.flex}>
                    <div style={{ flex: "4" }}>
                        <InputLabel align="left">
                            <Typography
                                color={errors.firstName ? "secondary" : ""}
                            >
                                First name
                            </Typography>
                        </InputLabel>
                        <TextField
                            name={"firstName"}
                            variant="filled"
                            fullWidth
                            value={values.firstName}
                            onChange={handleInputChange}
                            error={errors.firstName}
                            helperText={errors.firstName}
                        />
                    </div>
                    <div style={{ flex: 0.5 }}></div>
                    <div style={{ flex: "4" }}>
                        <InputLabel align="left">Last name</InputLabel>
                        <TextField
                            inputProps={{
                                root: classes.input,
                            }}
                            fullWidth
                            name={"lastName"}
                            value={values.lastName}
                            variant="filled"
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                <br />
                <InputLabel align="left">Email</InputLabel>
                <Typography align="left" variant="body1">
                    {email}
                    <FormControlLabel
                        style={{marginLeft: "10px"}}
                        value={showEmail}
                        control={
                            <Checkbox
                                checked={showEmail}
                                color="secondary" 
                                onChange={handleCheckbox}
                            />
                        }
                        label="Show email to public"
                        labelPlacement="end"
                    />
                </Typography>
                <br />
                {/* date of birth */}

                <div className={classes.flex}>
                    <div style={{ flex: "4" }}>
                        <InputLabel align="left">Gender</InputLabel>
                        <Select
                            name="gender"
                            value={values.gender}
                            variant="filled"
                            onChange={handleInputChange}
                            fullWidth
                        >
                            <MenuItem value={"Male"}>{"Male"}</MenuItem>
                            <MenuItem value={"Female"}>{"Female"}</MenuItem>
                            <MenuItem value={"others"}>{"others"}</MenuItem>
                        </Select>
                    </div>
                    <div style={{ flex: "0.5" }}></div>
                    <div style={{ flex: "4" }}>
                        <InputLabel align="left">Your date of birth</InputLabel>

                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <div style={{ display: "flex" }}>
                                <KeyboardDatePicker
                                    style={{ margin: "0px" }}
                                    disableToolbar
                                    variant="dialog"
                                    inputVariant="filled"
                                    format="dd/MM/yyyy"
                                    id="date-picker-inline"
                                    value={selectedDate}
                                    onChange={handleDateChange}
                                    KeyboardButtonProps={{
                                        "aria-label": "change date",
                                    }}
                                />
                            </div>
                        </MuiPickersUtilsProvider>
                    </div>
                </div>
                <br />

                <div className={classes.flex}>
                    <div style={{ flex: "4" }}>
                        <InputLabel align="left" style={{}}>
                            Location
                        </InputLabel>
                        <TextField
                            fullWidth
                            name={"location"}
                            value={values.location}
                            variant="filled"
                            onChange={handleInputChange}
                        />
                    </div>
                    <div style={{ flex: "0.5" }}></div>
                    <div style={{ flex: "4" }}>
                        <InputLabel align="left" style={{}}>
                            Nationality
                        </InputLabel>
                        <TextField
                            fullWidth
                            name={"nationality"}
                            value={values.nationality}
                            variant="filled"
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                <br />

                <InputLabel align="left" style={{}}>
                    About me
                </InputLabel>
                <TextField
                    fullWidth
                    name={"bio"}
                    value={values.bio}
                    variant="filled"
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
                        style={{ marginRight: "10px", width: "170px" }}
                        onClick={handleSubmit}
                    >
                        save
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        style={{ width: "170px" }}
                        onClick={handleClose}
                    >
                        discard changes
                    </Button>
                </div>
        </Paper>
    );
}
