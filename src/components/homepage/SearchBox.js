import React, { useState } from 'react'
import { connectSearchBox } from 'react-instantsearch-dom'
import { Grid, TextField, Button, InputAdornment } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'

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

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <Grid container spacing={2} justify="center" style={{marginBottom: "20px"}}>
            <Grid item style={{marginBottom: '20px'}} xs={8} >
                <form noValidate action="" role="search" onSubmit={handleSubmit}>
                    <Grid container>
                        <Grid item xs={8} style={{margin: "auto 0px auto auto"}}>
                        <TextField 
                            style={{background: "white", borderRadius: "4px"}}
                            size="small"
                            value={input}
                            variant="outlined"
                            placeholder="Search for posts"
                            fullWidth
                            onChange={handleChange}
                            InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <SearchIcon />
                                  </InputAdornment>
                                ),
                            }}
                            inputProps={{
                                style: {
                                    fontSize: "18px",
                                    marginLeft: "5px"
                                }
                            }}
                        />
                        </Grid>
                        <Grid item xs={2} style={{margin: "auto auto auto auto"}}>
                            <Button onClick={handleReset} color="primary" variant="contained" disableElevation>
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