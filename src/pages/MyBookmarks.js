import { Grid, makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import PostCard from '../components/PostCard';
import { db } from '../firebase'
import { useAuth } from '../contexts/AuthContext'
import PageHeader from '../components/PageHeader';
import BookmarksIcon from '@material-ui/icons/Bookmarks';
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

export default function MyBookmarks() {
    console.log("rerenderings")
    const classes = useStyles();
    const [posts, setPosts] = useState([]);
    const [render, setRender] = useState(false)
    const { currentUser, currentUserData } = useAuth()
    const history = useHistory()

    //sends query to backend when first mounting
    useEffect(() => {
        //if no user is logged in redirect to sign up
        if (!currentUser) {
            alert("Please login to view your bookmarks")
            history.push('/login')
        } else {
            let renderList = []
            async function fetch() {
                await currentUserData.bookmarks.forEach(
                uid => {
                    db.collection("posts").doc(uid).onSnapshot(
                        doc => {
                            renderList.push({...doc.data(), id: doc.id})
                        })
                })
            }
            fetch()
            setPosts(renderList)
            setRender(true)
        }
    }, [currentUser, currentUserData.bookmarks, history]) 

    return (
        <div>
            { !render && <div>Loading...</div>}
            { render && 
            <div>
                <PageHeader 
                    title="My Bookmarks"
                    icon={<BookmarksIcon style={{fontSize: "28" }}/>}
                />        
                <div className={classes.homeResults}>
                    <Grid container spacing={3}>
                        {posts.map((data, index) => {
                            console.log(data)
                                return ( 
                                <Grid item xs={12} md={6} key={index}>
                                    <PostCard
                                        key={data.id}
                                        id={data.id}
                                        title={data.title}
                                        author={data.name}
                                        authorId={data.author}
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

