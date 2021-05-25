import { Button, makeStyles, Paper } from '@material-ui/core'
import ChipInput from 'material-ui-chip-input';
import React, { useState } from 'react'

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
            padding: '50px',
            position: 'absolute',
            left: '50%',
            width: '800px',
            top: '50%',
            transform: 'translate(-50%, -50%)'
        }

    }
});

export default function EditInterests({handleClose, interests}) {
    const classes = useStyles()
    const [chips, setChips] = useState([...interests])
    const { currentUser, currentUserData, setCurrentUserData } = useAuth()
    const [rerender, setRerender] = useState(false)
 
    const handleAddChip = (chip) => {
        setChips(chips => [...chips, chip])
    }
    
    const handleDeleteChip = (chip, index) => {
        let chipsCopy = chips
        chips.splice(index, 1)
        setChips(chips => {
            //interestingly this doesn't trigger rerender, dk why
            return chipsCopy
        })

        //had to use this to force rerender
        setRerender(!rerender)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        await db.collection('users').doc(currentUser.uid).update({
            interests: chips 
        })

        setCurrentUserData({
            ...currentUserData,
            interests: chips
        })

        handleClose()

    }
    


    return (
        <Paper className={classes.root}>
            <Form onSubmit={handleSubmit}>
                <ChipInput
                    fullWidthInput	
                    style={{background: "white", borderRadius: "4px"}}
                    name="chips"
                    label="interests"
                    variant="outlined"
                    value={chips}
                    onAdd={(chip) => handleAddChip(chip)}
                    onDelete={(chip, index) => handleDeleteChip(chip, index)}
                    fullWidthInput={true}
                />  
                

                <br />
                <br />
                <div align="center">
                    <Button
                        variant="contained"
                        color="primary"
                        style={{marginRight: '10px', width: '170px'}}
                        type="submit"
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
            </Form>    
        </Paper> 
    )
}
