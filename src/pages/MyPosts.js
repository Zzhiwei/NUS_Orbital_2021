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
    const classes = useStyles();
    const { currentUser, currentUserData } = useAuth()
    const [posts, setPosts] = useState([]);
    const [render, setRender] = useState(false)
    const history = useHistory()
    console.log("rerendering")
    console.log(currentUserData)

    //sends query to backend when first mounting
    useEffect(() => {
        //if no user is logged in redirect to sign up
        if (!currentUser) {
            alert("Please log in first")
            history.push('/login')
        } else {
            const name = currentUserData.basicInfo.firstName + " " + currentUserData.basicInfo.lastName
            db.collection("posts").where("name", "==", name).get()
            .then(snapShot => {
                setPosts(snapShot.docs.map(doc => {return {data: doc.data(), id: doc.id} }))
            })
            setRender(true)
        }
    }, [])

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
                        {posts.map(({id, data}, index) => {
                            return (
                            <Grid key={index} item xs={12} md={6}>
                                <AdminCard
                                key={id}
                                id={id}
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

