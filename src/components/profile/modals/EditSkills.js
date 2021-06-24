import { Button, makeStyles, Paper, InputLabel, Typography, Tooltip } from '@material-ui/core'
import ChipInput from 'material-ui-chip-input';
import React, { useState } from 'react'
import HelpIcon from '@material-ui/icons/Help';

import { Form } from '../../useForm';
import { useAuth } from '../../../contexts/AuthContext'
import { db } from '../../../firebase'

const useStyles = makeStyles((theme) => {
    return {
        flex: {
            display: 'flex',
            justifyContent: 'space-between'
        },
        root: {
            padding: '30px',
            position: 'absolute',
            left: '50%',
            width: '500px',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#f6eee3',
            overflowY: 'auto'
        },
        chips: {
            backgroundColor: '#d9bda5',
            '&:hover': {
                backgroundColor: '#d9bda5'
                  
              },
        },
        inputRoot: {
            padding: '20px'
        },

    }
});

export default function EditSkills({handleClose, skills}) {
    const classes = useStyles()
    const [chips, setChips] = useState([...skills])
    const { currentUser, currentUserData, setCurrentUserData } = useAuth()
    const [rerender, setRerender] = useState(false)
 
    const handleAddChip = (chip) => {
        setChips(chips => [...chips, chip])
    }
    
    const handleDeleteChip = (chip, index) => {
        let chipsCopy = chips
        chips.splice(index, 1)
        setChips(chipsCopy)
        setRerender(!rerender)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        await db.collection('users').doc(currentUser.uid).update({
            skills: chips 
        })

        setCurrentUserData({
            ...currentUserData,
            skills: chips
        })

        handleClose()

    }
    


    return (
        <Paper className={classes.root}>
                <Typography align="center" variant="h4" style={{marginBottom: '15px'}}>
                    Edit Skills
                </Typography>
                <div style={{display: "flex", alignItems: 'flex-end'}}>
                    <div style={{marginRight: '5px'}}>
                        <InputLabel align="left">
                            <Typography variant="h6">
                                Skills
                            </Typography>
                        </InputLabel>
                    </div>
                    <div >
                        <Tooltip title='type in a skill and press "Enter"' placement="right">
                            <HelpIcon fontSize="medium" />
                        </Tooltip>
                    </div>
                </div>
                <ChipInput
                    style={{background: "white", borderRadius: "4px"}}
                    name="chips"
                    variant="filled"
                    value={chips}
                    onAdd={(chip) => handleAddChip(chip)}
                    onDelete={(chip, index) => handleDeleteChip(chip, index)}
                    fullWidth
                    style={{
                        backgroundColor: '#f6eee3'
                    }}
                    classes={{
                        chip: classes.chips,
                        inputRoot: classes.inputRoot
                    }}
                />  
                

                <br />
                <br />
                <div align="center">
                    <Button
                        variant="contained"
                        color="primary"
                        style={{marginRight: '10px', width: '170px'}}
                        onClick={handleSubmit}
                    >
                        save
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        style={{ width: '170px'}}
                        onClick={handleClose}
                    >
                        discard changes
                    </Button>
                </div>   
        </Paper> 
    )
}
