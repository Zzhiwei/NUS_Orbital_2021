
import { Card, Drawer, Grid, Link, makeStyles, Paper } from '@material-ui/core';
import React, { useEffect, useRef, useState } from 'react';
import ProjectCard from '../components/ProjectCard';
import Search from '../components/Search';
import { db } from '../firebase'

const truncate = (str) => {
    if (str.length > 300) {
        return str.substring(0, 280) + " ..."
    }        
    return str        
}


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
        let received = []
        db.collection('posts').get().then(snapShot => {
            snapShot.forEach(doc => {
                received.push(doc.data())
            }) 
            setPosts(received)
        }).catch(e => {
            console.log(e)
        })
    }, [])

    
    


    const prepareRender = async () => {
        let renderList = []
        for (const post of posts) {
            const name = await db.collection('users').doc(post.author).get().then(res => {
                const data = res.data()
                return data.firstName + ", " + data.lastName
            })
            
            renderList = [...renderList, (
                <Grid item xs={12} md={6} key={post.id}>
                    <ProjectCard
                        title={post.title}
                        author={name}
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
  