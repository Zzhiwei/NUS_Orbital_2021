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

function Home() {
    const classes = useStyles();
    const [filter, setFilter] = useState(false);
    const [posts, setPosts] = useState([]);
    const [toRender, setToRender] = useState([])

    //for filter pop up
    const toggleFilter = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }      
        setFilter(open)
    }

    //sends query to backend when first mounting
    useEffect(() => {
        const fetchPosts = async () => {
            const data = await db.collection("posts").get()
            setPosts(data.docs.map(doc => {
                //adds post id to local posts data: for viewPost/:id
                return {...doc.data(), id: doc.id} 
            }))
        }
        fetchPosts()
    }, [])

    //preparing posts to be rendered, also make get request to get info for each post
    const prepareRender = async () => {
        let renderList = []
        for (const post of posts) {
            renderList = [...renderList, (
                <Grid item xs={12} md={6} >
                    <ProjectCard
                        id={post.id}
                        title={post.title}
                        author={post.name}
                        description={post.description}
                        chips={post.skills}
                    />
                </Grid>  
            )]
           
        }
        setToRender(renderList)
    }

    /*
    first render: posts got nth yet
    2nd render: triggerred by setPosts inside first async func
    3rd render: triggered by setToRender inside second async func
    */
    if (posts.length && !toRender.length) {
        prepareRender()
    }

    return (        
            <div className={classes.homeResults}>
                <Search toggleFilter={toggleFilter} />
                <Drawer anchor="right" open={filter} onClose={toggleFilter(false)}>
                    <Paper style={{height: '1000px', width: '500px', padding: '100px'}}>
                    </Paper>
                </Drawer>
                <Grid container spacing={3}>
                    {toRender}
                </Grid>
            </div>
        
    );
  }
  
  export default Home;
  