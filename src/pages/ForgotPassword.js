import React, { useState } from 'react';
import { Button, Container, CssBaseline, FormControl, InputLabel, OutlinedInput, Grid, Box, makeStyles } from '@material-ui/core';
import { useHistory, Link } from 'react-router-dom';
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

function Login() {

    const classes = useStyles()

    const { resetPassword } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const history = useHistory()
    
    const [email, setEmail] = React.useState('');

    const onEmailChange = (e) => {        
        setEmail(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true)
            setError('')
            await resetPassword(email)
            alert('check your inbox to complete reset')
            history.push('/login')
        } catch (e) {
            setError(e.message)
        }

        setLoading(false)
    }

    return (
        <Container component="main" maxWidth="xs">
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
                                <OutlinedInput className={classes.input} id="component-outlined" value={email} onChange={onEmailChange} label="Email" />
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
  