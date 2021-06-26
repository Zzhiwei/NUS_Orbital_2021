import { Button, makeStyles, FormControl, Grid, Typography, OutlinedInput, Container, CssBaseline } from '@material-ui/core';
import { useHistory, Link }  from 'react-router-dom';
import React, { useState } from 'react';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import PersonRoundedIcon from '@material-ui/icons/PersonRounded';
import { useAuth } from '../contexts/AuthContext'
import Alert from '@material-ui/lab/Alert';
import { db } from '../firebase'
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
    label: {
        textAlign: "left",
        marginLeft: "20px"
    },
    field: {
        background: "white",
        borderRadius: "4px",
    },
    submit: {
        margin: theme.spacing(3.5, 0, 2),
    },
    link: {
        color: theme.palette.primary.main,
        textDecoration: "none",
        '&:hover':{
            textDecoration: "underline",
        }
    },
    root: {
        marginTop: '40px'
    }
  }));

function Register() {

    const classes = useStyles();

    const { signup } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassowrd, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [firstNamError, setFirstNameError] = useState(false)
    const [emailError, setEmailError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)

    

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
        setFirstNameError(false)
        setEmailError(false)
        setPasswordError(false)

        if (!firstName) {
            setError("First name cannot be empty")
            return setFirstNameError(true)
        }

        if (!email) {
            setError("Email cannot be empty")
            return setEmailError(true)
        }

        if (password !== confirmPassowrd) {
            setPasswordError(true)
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
                    showEmail: false
                },
                education: [],
                experience: [],
                interests: [],
                skills: [],
                posts: [],
                bookmarks: [],
                chats: []
            })
            
            history.push('/home')
        } catch (err) {
            if (err.message === "The email address is badly formatted.") {
                setError(err.message)
                setEmailError(true)
                return setLoading(false)
            }
            setPasswordError(true)
            setError(err.message)
            setLoading(false)
        }

        
    }

    return (
        <Container className={classes.root} component="main" maxWidth="xs"> 
            <CssBaseline />
            <PageHeader 
                title="Sign Up"
                icon={<PersonRoundedIcon style={{ fontSize: 38 }}/>}
            />

            {error && <Alert severity="error">{error}</Alert>}

            <form className={classes.form} noValidate autoComplete="off" onSubmit={handleSubmit}>
                <Grid container spacing={1}>
                    <Grid item xs={12} sm={6}>
                        <Typography className={classes.label}>First name</Typography>
                        <FormControl className={classes.field} variant="outlined">
                            <OutlinedInput error={firstNamError} id="firstName" value={firstName} onChange={onFirstNameChange} />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography className={classes.label}>Last name</Typography>
                        <FormControl className={classes.field} variant="outlined">
                            <OutlinedInput  id="lastName" value={lastName} onChange={onLastNameChange} />
                        </FormControl>    
                    </Grid>
                    <Grid item xs={12}>
                        <Typography className={classes.label}>Email</Typography>
                        <FormControl fullWidth className={classes.field} variant="outlined">
                            <OutlinedInput error={emailError} type="email" id="email" onChange={onEmailChange} value={email}/>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography className={classes.label}>Password</Typography>
                        <FormControl fullWidth className={classes.field} variant="outlined">
                            <OutlinedInput error={passwordError} required type="password" id="password" onChange={onPasswordChange} value={password}/>
                        </FormControl>
                    </Grid>                                           
                    <Grid item xs={12}>
                        <Typography className={classes.label}>Confirm password</Typography>
                        <FormControl fullWidth className={classes.field} variant="outlined">
                            <OutlinedInput error={passwordError} required type="password" id="confirmPassword" onChange={onConfirmPasswordChange} value={confirmPassowrd} />
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
    </Container>
    );
  }
  
  export default Register;
  