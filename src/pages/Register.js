import { Button, makeStyles, FormControl, Grid, InputLabel, OutlinedInput, Box, Typography, Container, CssBaseline } from '@material-ui/core';
import { useHistory, Link }  from 'react-router-dom';
import React, { useRef, useState } from 'react';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import PersonRoundedIcon from '@material-ui/icons/PersonRounded';
import { useAuth } from '../contexts/AuthContext'
import Alert from '@material-ui/lab/Alert';
import { db } from '../firebase'
import Copyright from '../components/Copyright'
import PageHeader from '../components/PageHeader';


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(3),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.primary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(3),
    },
    field: {
        background: "white",
        borderRadius: "4px",
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    link: {
        color: theme.palette.primary.main,
        textDecoration: "none",
        '&:hover':{
            textDecoration: "underline",
        }
    },
  }));

function Register() {

    const classes = useStyles();

    const { signup, currentUser } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassowrd, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');

    const onEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const onPasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const onConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value)
    }
     
    const onFirstNameChange = (e) => {
        setFirstName(e.target.value)
    }

    const onLastNameChange = (e) => {
        setLastName(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (password !== confirmPassowrd) {
            return setError("Passwords do not match")
        }

        try {
            setLoading(true)
            setError('')
            const cred = await signup(email, password)
            await db.collection('users').doc(cred.user.uid).set({
                password,
                email,
                basicInfo: {
                    firstName,
                    lastName,
                    dateOfBirth: {}
                },
                education: {},
                experience: {},
                interests: {},
                skills: {}
            })
            
            history.push('/')
        } catch (e) {
            setError(e.message)
        }

        setLoading(false)
    }

    return (
        <Container component="main" maxWidth="xs"> 
            <CssBaseline />
            <PageHeader 
                title="Sign Up"
                icon={<PersonRoundedIcon style={{ fontSize: 38 }}/>}
            />

            {error && <Alert severity="error">{error}</Alert>}

            <form className={classes.form} noValidate autoComplete="off" onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <FormControl className={classes.field} variant="outlined">
                            <InputLabel htmlFor="firstName">First name</InputLabel>
                            <OutlinedInput id="firstName" value={firstName} onChange={onFirstNameChange} label="First name" />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl className={classes.field} variant="outlined">
                            <InputLabel htmlFor="lastName">Last name</InputLabel>
                            <OutlinedInput id="lastName" value={lastName} onChange={onLastNameChange} label="Last name" />
                        </FormControl>    
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth className={classes.field} variant="outlined">
                            <InputLabel htmlFor="email">Email</InputLabel>
                            <OutlinedInput type="email" id="email" label="Email" onChange={onEmailChange} value={email}/>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth className={classes.field} variant="outlined">
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <OutlinedInput required type="password" id="password" label="Password" onChange={onPasswordChange} value={password}/>
                        </FormControl>
                    </Grid>                                           
                    <Grid item xs={12}>
                        <FormControl fullWidth className={classes.field} variant="outlined">
                            <InputLabel htmlFor="confirmPassword">Confirm password</InputLabel>
                            <OutlinedInput required type="password" id="confirmPassword" label="Confirm password" onChange={onConfirmPasswordChange} value={confirmPassowrd} />
                        </FormControl>
                    </Grid> 
                </Grid>
                <Button
                    className={classes.submit}
                    type='submit'
                    color='primary'
                    variant='contained'
                    endIcon={<KeyboardArrowRightIcon />} 
                    size='large'
                    disabled={loading}
                    fullWidth                     
                >
                    Register
                </Button>
                <Grid container justify="flex-end">
                    <Grid item >
                        <Link className={classes.link} to='/login'>
                            Already have an account? Sign in
                        </Link>
                    </Grid>
                </Grid>
            </form>
            <Box align="center" mt={5}>
                <Copyright />
            </Box>
    </Container>
    );
  }
  
  export default Register;
  