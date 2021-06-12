import { Grid, makeStyles, Paper } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useHistory, useLocation }  from 'react-router-dom'


import { useAuth } from '../contexts/AuthContext'
import ChatList from '../components/chat/ChatList'
import ChatBody from '../components/chat/ChatBody'
import '../components/chat/Chat.css'


const useStyles = makeStyles(theme => {
    return {
        root: {
            marginTop: '100px',
        },
        chatListRoot: {
            height: '648px',
            backgroundColor: 'rgb(238, 238, 238)'
        }
    }
})

export default function Chat() {
    const classes = useStyles()
    const history = useHistory()
    const { currentUser, currentUserData } = useAuth()
    const selected = new URLSearchParams(useLocation().search).get("selected")
    const current =  selected 
        ? selected 
        : currentUserData.chats.length > 0
            ? currentUserData.chats[0]
            : null
            
    const [currentChat, setCurrentChat] = useState({chatId: current})
    

    /*
        The expensive part is really the snapshot listeners
        (everytime things change is one read e.g. in bodychat new messages come in real time 
            , in chatListitem unread count updates in real time ) 
        for every message sent, both the user is reading 
        
    */
    
    
    
    useEffect(() => {
        if (!currentUser) {
            history.push('/login')
        }
        // const selected = new URLSearchParams(useLocation().search).get("selected")
        // const current = selected ? selected : currentUserData.chats[0];
    }, [])

    return (
        <div className={classes.root}>
            <div style={{display: 'flex'}}>
                <div style={{flex: 1}}>
                    <Paper className={classes.chatListRoot}>
                        <ChatList currentChat={currentChat} setCurrentChat={setCurrentChat} chats={currentUserData.chats} />
                    </Paper>
                </div>
                <div style={{flex: 2}}>
                    <Paper id="chatBody" >
                        <ChatBody key={String(currentChat.chatId)} chat={currentChat} />
                    </Paper>
                </div>
            </div>
        </div>
    )
}
