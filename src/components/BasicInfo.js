import React from 'react';
import { IconButton, InputLabel, makeStyles, Modal, TextField, Typography } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import EditBasicInfo from './modals/EditBasicInfo'
import { useAuth } from '../contexts/AuthContext';


const useStyles = makeStyles((theme) => {
    return {
        flex: {
            display: 'flex',
            width: '100%',
            justifyContent: 'space-between'
        },
    }
});

function BasicInfo({ basicInfo }) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const { currentUserData } = useAuth()

    const handleClose = () => {
        setOpen(false)
    }


    return (
        <div style={{marginBottom: '50px'}}>
                <Typography style={{borderBottom: '2px solid black', marginBottom: '20px'}} color="primary" variant="h4">
                    Basic info
                    <IconButton onClick={() => setOpen(true)}>
                        <EditIcon  />
                    </IconButton>
                </Typography>

                <Modal
                    open={open}
                    onClose={null}
                >
                    <EditBasicInfo basicInfo={currentUserData.basicInfo} handleClose={handleClose} open={open}/>
                </Modal>
        
            
                <form  align="left" noValidate autoComplete="off" onSubmit={null}>
                    <div className={classes.flex}>
                        <div style={{flex: '1'}}>
                            
                            <InputLabel>First Name</InputLabel>     
                            <TextField  value={currentUserData.basicInfo.firstName}  InputProps={{readOnly: true}}/>
                        </div>
                        <div style={{flex: '1'}}>
                            <InputLabel>Last Name</InputLabel> 
                            <TextField  value={currentUserData.basicInfo.lastName}  InputProps={{readOnly: true}}/>   
                        </div>                        
                        <div style={{flex: '1'}}>
                            <InputLabel>Gender</InputLabel> 
                            <TextField  value={currentUserData.basicInfo.gender}  InputProps={{readOnly: true}}/>   
                        </div>              
                    </div>
                    <br />
                    <div className={classes.flex}>
                        <div style={{flex: '1'}}>
                            <div>
                            <InputLabel>Date of Birth</InputLabel> 
                            <TextField  value={currentUserData.basicInfo.dateOfBirth.year}  InputProps={{readOnly: true}} />   
                            </div>                                
                        </div>
                        <div style={{flex: '2'}}>
                            <div style={{ width: "300px"}}>
                            <InputLabel>Email</InputLabel> 
                            <TextField  value={currentUserData.email}   InputProps={{readOnly: true}} fullWidth />   
                            </div>                                
                        </div>                            
                    </div>
                    <br />
                    <div style={{display: 'flex', justifyContent: 'left'}}>
                        <div style={{flex: '1'}}>
                            <div>
                            <InputLabel>Location</InputLabel> 
                            <TextField  value={currentUserData.basicInfo.location}   InputProps={{readOnly: true}} />   
                            </div>                                
                            
                        </div>
                        <div style={{flex: '1'}}>
                            <div>
                            <InputLabel>Nationality</InputLabel> 
                            <TextField   value={currentUserData.basicInfo.nationality}    InputProps={{readOnly: true}} />   
                            </div>        
                        </div>
                        <div style={{flex: '1'}}></div>
                    </div>

                    <br />
                    <br />           
                    <InputLabel style={{marginBottom: '10px'}}>About me</InputLabel> 
                    <TextField
                        id="outlined-read-only-input"
                        value={currentUserData.basicInfo.bio}
                        multiline
                        rows="4"
                        fullWidth                    
                        InputProps={{
                            readOnly: true,
                        }}
                        variant="outlined"
                    />
                    

                </form>
               
            
        </div>
    );
  }
  
  export default BasicInfo;
  