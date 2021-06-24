import React, { useState, useEffect } from 'react'
import { IconButton, Tooltip } from '@material-ui/core';
import { useHistory, useLocation } from 'react-router-dom' 
import { db } from '../../firebase';
import { useAuth } from '../../contexts/AuthContext'
import firebase from 'firebase/app';
import 'firebase/firestore';
import BookmarkIcon from '@material-ui/icons/Bookmark'
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import Card from './Card'

export default function PostCard({ data, setOpenB, setOpenUb }) {

    const { objectID : id, timestamp } = data
    console.log("rendering postcard entitled " + data.title)
    const { currentUser, currentUserData, setCurrentUserData } = useAuth()
    const history = useHistory()
    const location = useLocation()
    console.log(location.pathname)
    const userRef = currentUser 
        ? db.collection("users").doc(currentUser.uid) 
        : null
    const [bookmarked, setBookmarked] = useState(false)
    const timeStamp = timestamp._seconds * 1000
    
 
    useEffect(() => {
        if (currentUser && currentUserData && currentUserData.bookmarks) {
            setBookmarked(currentUserData.bookmarks.includes(id))
        }
    }, [currentUser, currentUserData, currentUserData.bookmarks, id])


    const handleAddBookmark = async () => {
        await userRef.update({
            bookmarks: firebase.firestore.FieldValue.arrayUnion(id)
        })
        setCurrentUserData({
            ...currentUserData,
            bookmarks: [...currentUserData.bookmarks, id]
        })
        setBookmarked(true)
        setOpenUb(false)
        setOpenB(true)
    }

    const handleRemoveBookmark = async () => {
        await userRef.update({
            bookmarks: firebase.firestore.FieldValue.arrayRemove(id)
        })
        const bookmarks = [...currentUserData.bookmarks]
        const index  = bookmarks.indexOf(id)
        bookmarks.splice(index, 1)
        setCurrentUserData({
            ...currentUserData,
            bookmarks
        })
        setBookmarked(false)
        setOpenB(false)
        setOpenUb(true)
    }

    const renderBookmark = () => {
        if (currentUser) {
            return (
                <Tooltip title={bookmarked ? "Remove from Bookmarks" : "Add to Bookmarks"}>
                    <IconButton 
                        color="primary" 
                        onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            bookmarked ? handleRemoveBookmark() : handleAddBookmark()
                            history.push(location.pathname)
                        }}
                    >
                        { bookmarked ? <BookmarkIcon style={{fontSize: 28}} /> : <BookmarkBorderIcon style={{fontSize: 28}} /> }
                    </IconButton>
                </Tooltip>
            )
        }
    }
    
    return (
        <Card 
            data={{ ...data, id: data.objectID }} 
            action={renderBookmark()} 
            timeStamp={timeStamp} 
        />
    );
  }  