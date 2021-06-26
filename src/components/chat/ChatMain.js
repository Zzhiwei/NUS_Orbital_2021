import { Grid, makeStyles, Paper, CircularProgress } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useHistory, useLocation }  from 'react-router-dom'


import { useAuth } from '../../contexts/AuthContext'
import ChatList from './ChatList'
import ChatBody from './ChatBody'
import './Chat.css'
import { db } from "../../firebase";



const useStyles = makeStyles(theme => {
    return {
        root: {
            
            marginTop: '2vh',
            marginBottom: '2vh'
        },
        
        chatListRoot: {
            backgroundColor: '#f2e6d5'
        },
        loading: {
            position: 'absolute',
            left: '50%',
            top: '50%',
        }
    }
})

export default function ChatMain({setKey}) {
    console.log("rendering chat")
    const history = useHistory()
    const { currentUser, currentUserData, setCurrentUserData } = useAuth()
    if (!currentUser) {
        history.push('/login')
    }
    const classes = useStyles()
    const selected = new URLSearchParams(useLocation().search).get("selected")
    const current =  selected 
        ? selected 
        : currentUserData.chats.length > 0
            ? "noneSelected"
            : "noChats"
            
    const [currentChat, setCurrentChat] = useState({chatId: current})

    useEffect(() => {
        const unsubscriber = db.collection("users").doc(currentUser.uid).onSnapshot(doc => {
            const beforeLen = currentUserData.chats.length
            const afterLen = doc.data().chats.length
            if (beforeLen < afterLen) {
                setCurrentUserData(doc.data())
            }
        })

        return () => {
            unsubscriber()
        }

    }, [])
    
    return (
        <div className={classes.root}>
            <div style={{display: 'flex'}}>
                <div style={{flex: 1}}>
                    <Paper className={classes.chatListRoot}>
                        <ChatList  setKey={setKey} currentChat={currentChat} setCurrentChat={setCurrentChat} chats={currentUserData.chats} />
                    </Paper>
                </div>
                <div style={{flex: 3}}>
                        <ChatBody setKey={setKey} key={String(currentChat.chatId)} chat={currentChat} />
                </div>
            </div>
        </div>
    )
}
