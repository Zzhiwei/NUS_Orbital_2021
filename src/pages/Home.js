
import { Card, Drawer, Grid, Link, makeStyles, Paper } from '@material-ui/core';
import React, { useState } from 'react';
import ProjectCard from '../components/ProjectCard';
import Masonry from 'react-masonry-css';
import Search from '../components/Search';


const useStyles = makeStyles((theme) => {
    return {
        homeResults: {
            height: '100%',
            width: '80%',            
            margin: 'auto auto',
            
            
        },
        myMasonryGrid: {
            display: '-webkit-box', 
            display: '-ms-flexbox', 
            display: 'flex',
            marginLeft: '-30px', 
            width: 'auto'
        }, 
        myMasonryGridColumn: {
            paddingLeft: '30px', /* gutter size */
            backgroundClip: 'padding-box'
        },
        columnDiv: {
            background: 'none',
            marginBottom: '30px'
        }
    }
});

const shortText = "Looking for a partner to do orbital with. Orbital is a NUS project mod."
const longText = "Looking for a partner to do orbital with. Orbital is a NUS project mod. Looking for a partner to do orbital with. Orbital is Looking for a partner to do orbital with. Orbital is a NUS project mod. a NUS project mod. Looking for a partner to do orbital with. Orbital is a NUS project mod. Looking for a partner to do orbital with. Orbital is Looking for a partner to do orbital with. Orbital is a NUS project mod. a NUS project mod. Looking for a partner to do orbital with. Orbital is a NUS project mod"

function Home() {
    const classes = useStyles();
    const [filter, setFilter] = useState(false);
    const toggleFilter = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }      
        setFilter(open)
    }

    
    const truncate = (str) => {
        if (str.length > 300) {
            return str.substring(0, 280) + " ..."
        }        
        return str        
    }

    return (        
            <div className={classes.homeResults}>
                <Search toggleFilter={toggleFilter} />
                <Drawer anchor="right" open={filter} onClose={toggleFilter(false)}>
                    <Paper style={{height: '1000px', width: '500px', padding: '100px'}}>
                        
                    </Paper>
                </Drawer>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <ProjectCard
                            title="build a website"
                            author="zhiwei"
                            description={truncate(longText)}
                        />
                    </Grid>              
                    <Grid item xs={12} md={6}>
                        <ProjectCard
                            title="build a website"
                            author="zhiwei"
                            description={truncate(shortText)}
                        />
                    </Grid>                     
                </Grid>       
            </div>
        
    );
  }
  
  export default Home;
  