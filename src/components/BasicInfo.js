import React from 'react';
import { IconButton, InputLabel, makeStyles, Modal, TextField, Typography } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import EditBasicInfo from './modals/EditBasicInfo'



const useStyles = makeStyles((theme) => {
    return {
        flex: {
            display: 'flex',
            width: '100%',
            justifyContent: 'space-between'
        },
    }
});

function BasicInfo({ userData, enableEdit }) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
        setOpen(false)
    }

    const monthToNum = {
        "January": "01",
        'February': "02",
        'March': "03",
        'April': "04",
        'May': "05",
        'June': "06",
        'July': "07",
        'August': "08",
        'September': "09",
        'October': "10",
        'November': "11",
        'December': "12"
    }

    const addZero = n => n < 10 ? "0" + n : n 
    const { day, month, year } = userData.basicInfo.dateOfBirth
    const dob = addZero(day) + '/' + monthToNum[month] + '/' +  year

    const renderEdit = () => {
        if (enableEdit) {
            return (
                <IconButton onClick={() => setOpen(true)}>
                    <EditIcon  />
                </IconButton>
            )
        }
    }
    
    return (
        <div style={{marginBottom: '50px'}}>
                <Typography style={{borderBottom: '2px solid black', marginBottom: '20px'}} color="primary" variant="h4">
                    Basic info
                    {renderEdit()}
                </Typography>

                <Modal
                    open={open}
                    onClose={null}
                >
                    <EditBasicInfo basicInfo={userData.basicInfo} handleClose={handleClose} open={open}/>
                </Modal>
        
                <form  align="left" noValidate autoComplete="off" onSubmit={null}>
                    <div className={classes.flex}>
                        <div style={{flex: '1'}}>
                            
                            <InputLabel>First Name</InputLabel>     
                            <TextField  value={userData.basicInfo.firstName}  InputProps={{readOnly: true}}/>
                        </div>
                        <div style={{flex: '1'}}>
                            <InputLabel>Last Name</InputLabel> 
                            <TextField  value={userData.basicInfo.lastName}  InputProps={{readOnly: true}}/>   
                        </div>                        
                        <div style={{flex: '1'}}>
                            <InputLabel>Gender</InputLabel> 
                            <TextField  value={userData.basicInfo.gender}  InputProps={{readOnly: true}}/>   
                        </div>              
                    </div>
                    <br />
                    <div className={classes.flex}>
                        <div style={{flex: '1'}}>
                            <div>
                            <InputLabel>Date of Birth</InputLabel> 
                            <TextField  value={dob}  InputProps={{readOnly: true}} />   
                            </div>                                
                        </div>
                        <div style={{flex: '2'}}>
                            <div style={{ width: "300px"}}>
                            <InputLabel>Email</InputLabel> 
                            <TextField  value={userData.email}   InputProps={{readOnly: true}} fullWidth />   
                            </div>                                
                        </div>                            
                    </div>
                    <br />
                    <div style={{display: 'flex', justifyContent: 'left'}}>
                        <div style={{flex: '1'}}>
                            <div>
                            <InputLabel>Location</InputLabel> 
                            <TextField  value={userData.basicInfo.location}   InputProps={{readOnly: true}} />   
                            </div>                                
                            
                        </div>
                        <div style={{flex: '1'}}>
                            <div>
                            <InputLabel>Nationality</InputLabel> 
                            <TextField   value={userData.basicInfo.nationality}    InputProps={{readOnly: true}} />   
                            </div>        
                        </div>
                        <div style={{flex: '1'}}></div>
                    </div>

                    <br />
                    <br />           
                    <InputLabel style={{marginBottom: '10px'}}>About me</InputLabel> 
                    <TextField
                        id="outlined-read-only-input"
                        value={userData.basicInfo.bio}
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
  