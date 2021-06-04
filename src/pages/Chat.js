import { Grid, makeStyles } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useHistory }  from 'react-router-dom'


import { useAuth } from '../contexts/AuthContext'
import ChatList from '../components/chat/ChatList'
import ChatBody from '../components/chat/ChatBody'

const useStyles = makeStyles(theme => {
    return {
        root: {
            backgroundColor: 'red'
        }
    }
})

export default function Chat() {
    const classes = useStyles()
    const history = useHistory()
    const { currentUser, currentUserData } = useAuth()
    const [currentChat, setCurrentChat] = useState(null)

    useEffect(() => {
        if (!currentUser) {
            history.push('/login')
        }
    }, [])

    return (
        <div className={classes.root}>
            <Grid container>
                <Grid item xs={3}> 
                    <ChatList setCurrentChat={setCurrentChat} chats={currentUserData.chats} />
                </Grid>
                <Grid item xs={9}>
                    <ChatBody chat={currentChat} />
                </Grid>
            </Grid>
        </div>
    )
}
