import React, { useState } from 'react'
import { connectSearchBox, PoweredBy } from 'react-instantsearch-dom'
import { Grid, TextField, Tooltip, Button, InputAdornment, makeStyles, CircularProgress } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'

import algoliaLogo from '../../assets/Algolia-logo.svg'



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
        },
        link: {
            textDecoration: 'none',
            color: 'black'
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
             
            <Grid container style={{ paddingRight: '10px'}} justify="center">
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
           
           <Grid container  justify="center">
               
                <Grid item xs={8}>
                    <Grid container  justify="flex-end" alignItems="flex-end">
                        <span style={{marginBottom: '12px', marginRight: '5px'}}>
                        Search by
                        </span>
                        <a target="_blank" className={classes.link} href="https://www.algolia.com/">
                        <img src={algoliaLogo} style={{height: '40px', width: '80px'}}/>
                        </a>
                        <Grid item xs={1}></Grid>
                    </Grid>
                </Grid>
            </Grid>
            {/* <div align="center">
                {isSearchStalled ? <CircularProgress /> : ''}
            </div> */}
            
        </form>
    )
}

export default connectSearchBox(SearchBox)