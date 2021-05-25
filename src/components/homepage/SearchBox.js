import React, { useState } from 'react'
import { connectSearchBox } from 'react-instantsearch-dom'
import { Grid, TextField, Button } from '@material-ui/core'


function SearchBox({ isSearchStalled, refine }) {
    const [input, setInput] = useState('')

    const handleChange = (e) => {
        setInput(e.target.value)
        refine(e.currentTarget.value)
    }

    const handleReset = () => {
        setInput('')
        refine('')
    }

    return (
        <Grid container spacing={2} justify="center" style={{marginBottom: "20px"}}>
            <Grid item  style={{marginBottom: '20px'}} xs={8} >
                <form noValidate action="" role="search">
                    <Grid container>
                        <Grid item xs={8}>
                        <TextField 
                            style={{background: "white", borderRadius: "4px"}}
                            value={input}
                            variant="outlined"
                            label="Search"
                            fullWidth
                            onChange={handleChange}
                        />
                        </Grid>
                        <Grid item xs={4}>
                            <Button onClick={handleReset} color="primary" variant="contained" style={{marginLeft: '20px', marginTop: '0px', height: '55px', width: '100px', color: 'white'}}>
                                reset
                            </Button>
                        </Grid>
                    </Grid>
                    {isSearchStalled ? 'Loading...' : ''}
                </form>
            </Grid>
        </Grid>
    )
}

export default connectSearchBox(SearchBox)