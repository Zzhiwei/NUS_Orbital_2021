import React from 'react';
import { Avatar, Button, ButtonBase, makeStyles, Paper, TextField, Typography } from '@material-ui/core';


const useStyles = makeStyles((theme) => {
    return {
        root: {
            // {border: '1px solid red',}            
            width: '60%',
            margin: 'auto auto',            
            padding: '10px 100px'            
            
        },        
        btn: {
            width: '100%'
        },
        category: {
            margin: "10px",
            borderBottom: '1px solid grey'
        },
        avatar: {
            width: theme.spacing(10),
            height: theme.spacing(10),
            margin: '0px auto'
        },
        flex: {
            display: 'flex',
            width: '100%',
            justifyContent: 'space-between'
        },
        
        
    }
});

function BasicInfo() {
    const classes = useStyles();
    const firstName = "zhiwei"
    return (
        <div>
                
                <div className={classes.sectionHeader}>                       
                    <Typography align="center" color="primary" variant="h4" style={{marginBottom: '30px'}}>
                        Basic info
                    </Typography>
                </div>                
                <div style={{marginBottom: '50px'}}>
                    
                    <Avatar className={classes.avatar} style={{marginBottom: '10px'}}/>
                    <br />                   
                        
                    
                    <form  align="center" noValidate autoComplete="off" onSubmit={null}>
                        <div className={classes.flex}>
                            <div style={{flex: '1'}}>
                                <TextField  value={firstName}  label="First name"  InputProps={{readOnly: true}}/>   
                            </div>
                            <div style={{flex: '1'}}>
                                <TextField  value={"Lin"}  label="First name"  InputProps={{readOnly: true}}/>   
                            </div>                        
                            <div style={{flex: '1'}}>
                                <TextField  value={"Male"}  label="Gender"  InputProps={{readOnly: true}}/>   
                            </div>              
                        </div>
                        <br />
                        <div className={classes.flex}>
                            <div style={{flex: '1'}}>
                                <div>
                                <TextField  value={"18/11/1997"}  label="Date of birth"  InputProps={{readOnly: true}} />   
                                </div>                                
                            </div>
                            <div style={{flex: '2'}}>
                                <div style={{width: '80%', margin: '0px auto'}}>
                                <TextField  value={"linzhiweihotmail@hotmail.com"}  label="Email"  InputProps={{readOnly: true}} fullWidth />   
                                </div>                                
                            </div>                            
                        </div>
                        <br />
                        <div style={{display: 'flex', justifyContent: 'left'}}>
                            <div style={{flex: '1'}}>
                                <div>
                                <TextField  value={"Singapore"}  label="Location"  InputProps={{readOnly: true}} />   
                                </div>                                
                                
                            </div>
                            <div style={{flex: '1'}}>
                                <div>
                                <TextField  value={"Singaporean"}  label="Nationality"  InputProps={{readOnly: true}} />   
                                </div>        
                            </div>
                            <div style={{flex: '1'}}></div>
                        </div>

                        <br />
                        <br />                    
                        <TextField
                            id="outlined-read-only-input"
                            label="About me"
                            defaultValue="Hi i am an undergrad student at NUS"
                            multiline
                            rows="3"
                            fullWidth                    
                            InputProps={{
                                readOnly: true,
                            }}
                            variant="outlined"
                            />
                        

                    </form>
                </div>                                
               
            
        </div>
    );
  }
  
  export default BasicInfo;
  