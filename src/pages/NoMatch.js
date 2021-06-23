import { Button } from '@material-ui/core';
import React from 'react';
import history from '../history';

function Login() {
    return (
        <div>
            <h1>page not found</h1>
            <Button onClick={() => history.push('/home')}>
                back to home
            </Button>         
        </div>
    );
  }
  
  export default Login;
  