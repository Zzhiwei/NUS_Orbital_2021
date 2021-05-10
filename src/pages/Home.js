
import { Card, Grid, Link, makeStyles, Paper } from '@material-ui/core';
import React from 'react';
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

const text = "hi i am a student who is looking to find a partner for orbital hi i am a student who is looking to find a partner for orbital hi i am a student who is looking to find a partner for orbital hi i am a student who is looking to find a partner for orbital"
const text2 = "hi i am a student who is looking to find a partner for orbital hi i am a student who is looking to find a partner for orbital hi i am a student who is looking to find a partner for orbital hi i am a student who is looking to find a partner for orbital hi i am a student who is looking to find a partner for orbital hi i am a student who is looking to find a partner for orbital hi i am a student who is looking to find a partner for orbital hi i am a student who is looking to find a partner for orbital hi i am a student who is looking to find a partner for orbital hi i am a student who is looking to find a partner for orbital hi i am a student who is looking to find a partner for orbital hi i am a student who is looking to find a partner for orbital hi i am a student who is looking to find a partner for orbital hi i am a student who is looking to find a partner for orbital hi i am a student who is looking to find a partner for orbital hi i am a student who is looking to find a partner for orbital"

function Home() {
    const classes = useStyles();
    
    return (        
            <div className={classes.homeResults}>
                <Search />
                <Masonry
                    breakpointCols={2}
                    className={classes.myMasonryGrid}
                    columnClassName={classes.myMasonryGridColumn}
                >
                    <div className={classes.columnDiv}>  
                        <ProjectCard
                            title="build a website"
                            author="zhiwei"
                            description={text2}
                        />
                    </div>
                    <div className={classes.columnDiv}>  
                        <ProjectCard
                            title="build a website"
                            author="zhiwei"
                            description={text}
                        />
                    </div>
                    <div className={classes.columnDiv}>  
                        <ProjectCard
                            title="build a website"
                            author="zhiwei"
                            description={text}
                        />
                    </div>
                    <div className={classes.columnDiv}>  
                        <ProjectCard
                            title="build a website"
                            author="zhiwei"
                            description={text}
                        />
                    </div>
                    <div className={classes.columnDiv}>  
                        <ProjectCard
                            title="build a website"
                            author="zhiwei"
                            description={text2}
                        />
                    </div>
                    <div className={classes.columnDiv}>  
                        <ProjectCard
                            title="build a website"
                            author="zhiwei"
                            description={text2}
                        />
                    </div>
                    <div className={classes.columnDiv}>  
                        <ProjectCard
                            title="build a website"
                            author="zhiwei"
                            description={text2}
                        />
                    </div>
                    <div className={classes.columnDiv}>  
                        <ProjectCard
                            title="build a website"
                            author="zhiwei"
                            description={text2}
                        />
                    </div>
                    <div className={classes.columnDiv}>  
                        <ProjectCard
                            title="build a website"
                            author="zhiwei"
                            description={text2}
                        />
                    </div>
                    <div className={classes.columnDiv}>  
                        <ProjectCard
                            title="build a website"
                            author="zhiwei"
                            description={text2}
                        />
                    </div>
                    
                
                </Masonry>
            </div>
        
    );
  }
  
  export default Home;
  