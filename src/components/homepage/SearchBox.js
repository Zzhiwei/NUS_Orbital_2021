import React, { useState } from 'react'
import { connectSearchBox, PoweredBy } from 'react-instantsearch-dom'
import { Grid, TextField, Tooltip, Button, InputAdornment, makeStyles, CircularProgress } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'



const useStyles = makeStyles(() => {
    return {
        input: {
            backgroundColor: 'rgb(246,238,227, 0.5)'
        },
        btn: {
            marginLeft: '10px',
            padding: "0px",
            '&:hover': {
                backgroundColor: '#ff9999'
            }
        }
    }
})

function SearchBox({ isSearchStalled, refine }) {
    const classes = useStyles()
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
        <form noValidate action="" role="search" onSubmit={handleSubmit}>
            <Grid container style={{paddingBottom: '10px', paddingRight: '10px'}} justify="center">
                <Grid item xs={8}>
                    <TextField 
                        fullWidth
                        autoFocus
                        style={{background: "white", borderRadius: "4px"}}
                        size="small"
                        value={input}
                        variant="outlined"
                        placeholder="Search for posts"
                        onChange={handleChange}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                <SearchIcon />
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <Tooltip title="search engine powered by algolia">
                                    <InputAdornment position="end">
                                        <PoweredBy
                                            translations={{
                                                searchBy: '',
                                            }}
                                        />
                                    </InputAdornment>
                                </Tooltip>
                            ),
                            className: classes.input
                        }}
                        inputProps={{
                            style: {
                                fontSize: "18px",
                                marginLeft: "5px"
                            }
                        }}
                    />
                </Grid>
                <Button
                    onClick={handleReset}
                    color="primary"
                    variant="outlined"
                    disableElevation
                    className={classes.btn}
                    
                >
                    Reset
                </Button>
                
            </Grid>
            {/* <div align="center">
                {isSearchStalled ? <CircularProgress /> : ''}
            </div> */}
            
        </form>
    )
}

export default connectSearchBox(SearchBox)