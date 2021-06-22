import React from 'react'
import { IconButton, Tooltip } from '@material-ui/core';
import { useHistory } from 'react-router-dom' 
import { db } from '../../firebase';
import { useAuth } from '../../contexts/AuthContext'
import firebase from 'firebase/app';
import 'firebase/firestore';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import Card from './Card'

export default function BookmarkedCard({ data }) {

    const { id, timestamp } = data
    console.log("rendering bookmarkcard entitled " + data.title)
    const { currentUser, currentUserData, setCurrentUserData } = useAuth()
    const history = useHistory()
    const userRef = currentUser 
        ? db.collection("users").doc(currentUser.uid) 
        : null
    const timeStamp = timestamp.toDate()

    const handleRemoveBookmark = () => {
        userRef.update({
            bookmarks: firebase.firestore.FieldValue.arrayRemove(id)
        })
        .then(() => {
            const bookmarks = [...currentUserData.bookmarks]
            const index  = bookmarks.indexOf(id)
            bookmarks.splice(index, 1)
            setCurrentUserData({
                ...currentUserData,
                bookmarks
            })
        })      
    }

    function action() {
        return (
            <Tooltip title="Remove from Bookmarks">
                <IconButton 
                    color="primary" 
                    onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        handleRemoveBookmark()
                        history.push('/bookmarks')
                    }}
                >
                    <BookmarkIcon style={{fontSize: 28}} />
                </IconButton>
            </Tooltip>
        )
    }

    return (
        <Card 
            data={data} 
            action={action()} 
            timeStamp={timeStamp} 
        />
    );
  }  