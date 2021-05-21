import { Grid, makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import AdminCard from '../components/AdminCard';
import { db } from '../firebase'
import { useAuth } from '../contexts/AuthContext'
import PageHeader from '../components/PageHeader';
import AllInboxRoundedIcon from '@material-ui/icons/AllInboxRounded';

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
    const classes = useStyles();
    const [posts, setPosts] = useState([]);
    const [toRender, setToRender] = useState([])
    const { currentUserData } = useAuth()
    const name = currentUserData.basicInfo.firstName + " " + currentUserData.basicInfo.lastName

    //sends query to backend when first mounting
    useEffect(() => {
        db.collection("posts").where("name", "==", name).get()
        .then(snapShot => {
            setPosts(snapShot.docs.map(doc => {return {...doc.data(), id: doc.id} }))
        })
    }, [name])

    //preparing posts to be rendered, also make get request to get info for each post
    const prepareRender = async () => {
        let renderList = []
        for (const post of posts) {
            renderList = [...renderList, (
                <Grid item xs={12} md={6}>
                    <AdminCard
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
        <>
            <PageHeader 
                title="My Posts"
                icon={<AllInboxRoundedIcon fontSize="large"/>}
            />        
            <div className={classes.homeResults}>
                <Grid container spacing={3}>
                    { toRender }
                </Grid>
            </div>
        </>
    );

}

