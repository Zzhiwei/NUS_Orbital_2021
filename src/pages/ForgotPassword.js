import React, { useState } from 'react';
import { Button, Container, CssBaseline, FormControl, InputLabel, OutlinedInput, Grid, Box, makeStyles } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import PersonRoundedIcon from '@material-ui/icons/PersonRounded';
import { useAuth } from '../contexts/AuthContext';
import Alert from '@material-ui/lab/Alert';
import Copyright from '../components/Copyright';
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
    root: {
        marginTop: '40px'
    }
  }));

function Login() {

    const classes = useStyles()

    const { resetPassword } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const history = useHistory()
    
    const [email, setEmail] = React.useState('');
    const [emailError, setEmailError] = useState(false)


    const onEmailChange = (e) => {        
        setEmail(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setEmailError(false)

        if (!email) {
            setError("You have not entered an email")
            return setEmailError(true)
        }


        try {
            setLoading(true)
            setError('')
            await resetPassword(email)
            alert('check your inbox to complete reset')
            history.push('/login')
        } catch (err) {
            setEmailError(true)
            setError(err.message)
        }

        setLoading(false)
    }

    return (
        <Container component="main" maxWidth="xs" className={classes.root}>
            <CssBaseline />
            <PageHeader 
                title="Reset password"
                icon={<PersonRoundedIcon style={{ fontSize: 38 }}/>}
            />             
            {error && <Alert severity="error">{error}</Alert>}
            
                <form  className={classes.form} noValidate autoComplete="off" onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <FormControl className={classes.field} variant="outlined" required fullWidth>
                                <InputLabel htmlFor="component-outlined">Email</InputLabel>
                                <OutlinedInput error={emailError} className={classes.input} id="component-outlined" value={email} onChange={onEmailChange} label="Email" />
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
                        disbaled={loading}
                    >
                        Reset
                    </Button>
                </form>
                <Box mt={5} align="center">
                    <Copyright />
                </Box>
        </Container>
    );
  }
  
  export default Login;
  