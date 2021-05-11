
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
const longText = "I am looking for partner to participate in the upcoming shopee code league. Looking for a person who has experience in data science, data structures and algorithms"

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

    const renderSampleContent = () => {
        return (
            <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <ProjectCard
                            title="Shopee code league"
                            author="zhiwei007"
                            description={truncate(longText + longText)}
                            chips={["data science", "data structures", "algorithms", "programming"]}
                        />
                    </Grid>              
                    <Grid item xs={12} md={6}>
                        <ProjectCard
                            title="NUS project orbital"
                            author="myc37"
                            description={truncate(shortText)}
                            chips={["programming", "computer science", "web development", "National University of Singapore"]}
                        />
                    </Grid>  
                    <Grid item xs={12} md={6}>
                        <ProjectCard
                            title="24 ACSI short film competition"
                            author="surendra shenoy basti"
                            description={truncate("looking for a few people to team up with and participate in the ACSI media club short film competition")}
                            chips={["short films", "video editing", "film-making"]}
                        />
                    </Grid>    
                    <Grid item xs={12} md={6}>
                        <ProjectCard
                            title="facebook hackathon"
                            author="Wang Gang"
                            description={truncate("looking for an computer science student to participate in Facebook Hackathon with")}
                            chips={["programming", "hackathon"]}
                        />
                    </Grid>    
                    <Grid item xs={12} md={6}>
                        <ProjectCard
                            title="engineering innovation challenge"
                            author="Wang Gang"
                            description={truncate("looking for an engineering student to participate in this competition")}
                            chips={["engineering"]}
                        />
                    </Grid>    
                    <Grid item xs={12} md={6}>
                        <ProjectCard
                            title="NUS Egaming league of legends tournament"
                            author="noobmaster97"
                            description={truncate("looking for league of legends players to play in the NUS eGaming tournament")}
                            chips={["league of legends", "video-games"]}
                        />
                    </Grid>                  
                </Grid> 
        )
    }

    return (        
            <div className={classes.homeResults}>
                <Search toggleFilter={toggleFilter} />
                <Drawer anchor="right" open={filter} onClose={toggleFilter(false)}>
                    <Paper style={{height: '1000px', width: '500px', padding: '100px'}}>
                        
                    </Paper>
                </Drawer>
                {renderSampleContent()}   
                {renderSampleContent()}   
                {renderSampleContent()}   
                {renderSampleContent()}   
            </div>
        
    );
  }
  
  export default Home;
  