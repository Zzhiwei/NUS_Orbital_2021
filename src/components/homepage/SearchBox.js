import React, { useState } from 'react'
import { connectSearchBox } from 'react-instantsearch-dom'
import { Grid, TextField, Button, InputAdornment, makeStyles } from '@material-ui/core'
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
        btn2: {
            marginLeft: '10px',
            padding: "0px",
            backgroundColor: '#e6dfd1',
            '&:hover': {
                backgroundColor: '#ceded9'
            }
        },
        link: {
            textDecoration: 'none',
            color: 'black'
        }
    }
})

function SearchBox({ isSearchStalled, refine, setSearchFor, searchFor}) {
    const classes = useStyles()
    const [input, setInput] = useState('')

    const searchPlaceHolder = searchFor === 1 ? "Enter a user's name" : "Search for posts"

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
        refine(input)
    }

    function handleUserSearch() {
        if (searchFor === 0) {
            return setSearchFor(1)
        } 
        setSearchFor(0)
        
    }

    return (
        <form noValidate action="" role="search" onSubmit={handleSubmit}>
             
            <Grid container style={{ paddingRight: '10px'}} justify="center">
                <Grid item xs={searchFor ? 7 : 8 }>
                    <TextField 
                        fullWidth
                        autoFocus
                        style={{background: "white", borderRadius: "4px"}}
                        size="small"
                        value={input}
                        variant="outlined"
                        placeholder={searchPlaceHolder}
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
                
                <Button
                    variant="contained"
                    disableElevation
                    className={classes.btn2}
                    onClick={handleUserSearch}
                >
                    {searchFor === 0 && (
                        <div style={{padding: '0px 10px'}}>user search</div>
                    )}
                    {searchFor === 1 && (
                        <div style={{padding: '0px 10px'}}>post search</div>
                    )}
                </Button>
                
            </Grid>
           
           <Grid container  justify="center">
               
                <Grid item xs={8}>
                    <div style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end'}}>
                         <span style={{marginBottom: '12px', marginRight: '5px'}}>
                        Search by
                        </span>
                        <a target="_blank" rel="noreferrer" className={classes.link} href="https://www.algolia.com/">
                        <img src={algoliaLogo} style={{height: '40px', width: '80px'}} alt="algolia-logo"/>
                        </a>
                        <div style={{width: searchFor ? '160px' : '110px'}}></div>
                    </div>
                    {/* <Grid container  justify="flex-end" alignItems="flex-end" style={{marginRight: '30px'}}>
                       
                        <Grid item xs={2}></Grid>
                    </Grid> */}
                </Grid>
            </Grid>
            {/* <div align="center">
                {isSearchStalled ? <CircularProgress /> : ''}
            </div> */}
            
        </form>
    )
}

export default connectSearchBox(SearchBox)