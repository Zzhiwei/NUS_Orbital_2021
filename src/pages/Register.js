import { Button, FormControl, Grid, InputLabel, OutlinedInput, Paper, Typography } from '@material-ui/core';
import { Link }  from 'react-router-dom';
import React from 'react';
import AppForm from '../views/AppForm2';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import AccountBoxIcon from '@material-ui/icons/AccountBox';




function Register() {
    const [firstName, setFirstName] = React.useState('');
    const [secondName, setSecondName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [userName, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    return (
        <div> 
            <AppForm>
            <div align='center' style={{marginBottom: '5px'}}>
            <AccountBoxIcon color='white' fontSize='large' />
            </div>
            <React.Fragment >
                <Typography variant="h3" gutterBottom  align="center">
                    Sign Up
                </Typography>                
            </React.Fragment>
            
            <form align="center" noValidate autoComplete="off" onSubmit={null}>
                
                <Grid container >
                    <Grid item xs={6}>
                        
                    <FormControl variant="outlined">
                        <InputLabel htmlFor="component-outlined">First name</InputLabel>
                        <OutlinedInput id="component-outlined" value={"dsa"} onChange={null} label="First name" />
                    </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl variant="outlined">
                            <InputLabel htmlFor="component-outlined">Last name</InputLabel>
                            <OutlinedInput id="component-outlined" value={"dsa"} onChange={null} label="Last name" />
                        </FormControl>    
                    </Grid>
                </Grid>         
                <br />
                
                <div>
                    <FormControl style={{width: '400px'}} variant="outlined">
                        <InputLabel htmlFor="component-outlined">Email</InputLabel>
                        <OutlinedInput id="component-outlined" value={"dsa"} onChange={null} label="Email" />
                    </FormControl>
                </div>
                    
                <br />
                
                <div>
                    <FormControl style={{width: '400px'}} variant="outlined">
                        <InputLabel htmlFor="component-outlined">Password</InputLabel>
                        <OutlinedInput id="component-outlined" value={"dsa"} onChange={null} label="Password" />
                    </FormControl>
                </div>                                           
                    
                <br />
                
                <Button
                    type='submit'
                    color='primary'
                    variant='contained'
                    endIcon={<KeyboardArrowRightIcon />} 
                    size='large'
                                            
                >
                    Register
                </Button>
                
                
                
            </form>
            <br />
            <Typography variant="body2" align="center">
                    {'Already have an account? '}
                    <Link to='/login'>
                        Sign in here
                    </Link>
            </Typography> 

            
            </AppForm>
        </div>
    );
  }
  
  export default Register;
  