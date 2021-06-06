import { Grid, makeStyles, Paper } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useHistory }  from 'react-router-dom'


import { useAuth } from '../contexts/AuthContext'
import ChatList from '../components/chat/ChatList'
import ChatBody from '../components/chat/ChatBody'
import '../components/chat/Chat.css'


const useStyles = makeStyles(theme => {
    return {
        root: {
            marginTop: '100px',
        },
    }
})

export default function Chat() {
    const classes = useStyles()
    const history = useHistory()
    const { currentUser, currentUserData } = useAuth()
    const [currentChat, setCurrentChat] = useState(null)
    const chatBody = document.getElementById('chatBody')
    const chatListHeight = chatBody ? chatBody.clientHeight : 0;
    console.log(chatListHeight)

    useEffect(() => {
        if (!currentUser) {
            history.push('/login')
        }
    }, [])

    return (
        <div className={classes.root}>
            <Grid container justify="center">
                <Grid item xs={2}> 
                    <Paper style={{height: "588px"}}>
                    <ChatList setCurrentChat={setCurrentChat} chats={currentUserData.chats} />
                    </Paper>
                </Grid> 
                
                <Grid item xs={5}>
                    <Paper id="chatBody" >
                        <ChatBody chat={currentChat} />
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
}
