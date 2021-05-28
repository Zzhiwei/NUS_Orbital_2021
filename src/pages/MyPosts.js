import { Grid, makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import AdminCard from '../components/AdminCard';
import { db } from '../firebase'
import { useAuth } from '../contexts/AuthContext'
import PageHeader from '../components/PageHeader';
import AllInboxRoundedIcon from '@material-ui/icons/AllInboxRounded';
import { useHistory }  from 'react-router-dom'

const useStyles = makeStyles((theme) => {
    return {
        homeResults: {
            height: '100%',
            width: '80%',            
            margin: 'auto auto',
            padding: theme.spacing(5)
        },
    }
});

export default function MyPosts() {
    console.log("render myposts")
    const classes = useStyles();
    const { currentUser, currentUserData } = useAuth()
    const [posts, setPosts] = useState([]);
    const [render, setRender] = useState(false)
    const history = useHistory()
    

    //sends query to backend when first mounting
    useEffect(async () => {
        //if no user is logged in redirect to sign up
        if (!currentUser) {
            alert("Please log in first")
            history.push('/login')
        } 

        let renderList = []

        async function fetch() {
            for (const post of currentUserData.posts) {
                const postData =  await db.collection("posts").doc(post).get().then(res => res.data())
                renderList.push({...postData, id: post})
            }
        }
        await fetch()
        setPosts(renderList)
        setRender(true)
    }, [currentUserData.posts])

    return (
        <div>
            { !render && <div>Loading...</div>}
            { render && 
            <div>
                <PageHeader 
                    title="My Posts"
                    icon={<AllInboxRoundedIcon fontSize="large"/>}
                />        
                <div className={classes.homeResults}>
                    <Grid container spacing={3}>
                        {posts.map((data, index) => {
                            return (
                            <Grid key={index} item xs={12} md={6}>
                                <AdminCard
                                key={data.id}
                                id={data.id}
                                title={data.title}
                                author={data.name}
                                description={data.description}
                                chips={data.skills}
                                />
                            </Grid>
                        )})} 
                    </Grid>
                </div>
            </div>
            }
        </div>
    );

}

