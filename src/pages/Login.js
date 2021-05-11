import React from 'react';
import { Button, FormControl, InputLabel, OutlinedInput, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import AppForm from '../views/AppForm';


const useStyles = makeStyles({
    marginBot: {
        marginBottom: '25px'
    }
});

function Login() {
    const [userName, setUserName] = React.useState('');
    const [password, setPassword] = React.useState('');
    const classes = useStyles();

    const onUserNameChange = (e) => {        
        setUserName(e.target.value);
    }

    const onPasswordChange = (e) => {        
        setPassword(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(userName, password);
    }

    return (
        <React.Fragment>
            <AppForm>
            <div align='center' style={{marginBottom: '10px'}}>
            <LockOpenIcon color='white' fontSize='large' />
            </div>
            <React.Fragment >
                <Typography variant="h3" gutterBottom marked="center" align="center">
                    Sign In
                </Typography>                
            </React.Fragment>            

            <form  align="center" noValidate autoComplete="off" onSubmit={handleSubmit}>
                <div className={classes.marginBot}>
                    <FormControl variant="outlined" required fullWidth>
                        <InputLabel htmlFor="component-outlined">Username / Email</InputLabel>
                        <OutlinedInput className={classes.input} id="component-outlined" value={userName} onChange={onUserNameChange} label="Username / Email" />
                    </FormControl>
                </div>  
                
                <div className={classes.marginBot}>
                    <FormControl variant="outlined" required fullWidth>
                        <InputLabel htmlFor="component-outlined">Password</InputLabel>
                        <OutlinedInput id="component-outlined" value={password} onChange={onPasswordChange} label="Password" />
                    </FormControl>
                </div>
            
                <Button                    
                    type='submit'
                    color='primary'
                    variant='contained'
                    endIcon={<KeyboardArrowRightIcon />}
                    size='large'                                                                            
                >
                    Login
                </Button>
            
            </form>

            <br />
            <div>
                <Typography variant="body2" align="center">
                    {'Not a member yet? '}
                    <Link                           
                        to="/register"    
                        align="center"                                        
                    >                        
                        Sign up here
                    </Link>
                </Typography>
                <Typography variant="body2" align="center" style={{marginTop: '5px'}}>                    
                    <Link                           
                        href="/"    
                        align="center"
                        underline="always"                        
                    >                        
                        {"Forgot password?"}
                    </Link>
                </Typography>
            </div>
            </AppForm>            
        </React.Fragment>
        
    );
  }
  
  export default Login;
  