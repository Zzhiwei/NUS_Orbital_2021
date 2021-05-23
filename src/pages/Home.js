import { Drawer, Grid, makeStyles, Paper } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import ProjectCard from '../components/ProjectCard';
import Search from '../components/Search';
import { db } from '../firebase'

const useStyles = makeStyles((theme) => {
    return {
        homeResults: {
            height: '100%',
            width: '80%',            
            margin: 'auto auto',
        },
    }
});

export default function Home() {
    const classes = useStyles();
    const [filter, setFilter] = useState(false);
    const [posts, setPosts] = useState([]);
    const [render, setRender] = useState(false)

    //for filter pop up
    const toggleFilter = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }      
        setFilter(open)
    }

    //sends query to backend when first mounting
    useEffect(() => {
        db.collection('posts').onSnapshot((snapShot) => {
            setPosts(snapShot.docs.map((doc) => ({
                id: doc.id, data: doc.data()
            })))
            setRender(true)
        })
    }, [])

    return (
        <div>
            { !render && <div>Loading..</div> }
            { render && 
            <div className={classes.homeResults}>
                <Search toggleFilter={toggleFilter} />
                <Drawer anchor="right" open={filter} onClose={toggleFilter(false)}>
                    <Paper style={{height: '1000px', width: '500px', padding: '100px'}} />
                </Drawer>  
                <Grid container spacing={3}>
                    {posts.map(({id, data}) => {
                        return ( 
                        <Grid item xs={12} md={6}key={id}>
                            <ProjectCard
                                key={id}
                                id={id}
                                title={data.title}
                                author={data.name}
                                authorId={data.author}
                                description={data.description}
                                chips={data.skills}
                                bookmarkedBy={data.bookmarkedBy}
                            />
                        </Grid>
                    )})}
                </Grid>
            </div>
            }
        </div>
    );
  }
  