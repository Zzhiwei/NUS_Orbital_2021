import React, { useEffect, useState, useRef } from 'react'

import { db } from '../../firebase'
import { useAuth } from '../../contexts/AuthContext'
import { Avatar, Grid, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => {
    return {
        root: {
            padding: '15px',
            borderBottom: "1px solid grey",
            backgroundColor: 'rgb(238, 238, 238)'
        },
        unreadCount: {
            marginLeft: '20px',
            backgroundColor: '#f44336',
            borderRadius: '5px',
            padding: '5px',
            color: 'white'
        }
    }
})

export default function ChatListItem({chatId, setCurrentChat, currentChat}) {
    const classes = useStyles()
    const chatRef = db.collection("chats").doc(chatId)
    const { currentUser } = useAuth()
    const [otherUserId, setOtherUserId] = useState(null)
    const [userInfo, setUserInfo] = useState({})
    const [unreadCount, setUnreadCount] = useState(0)
    const userIds = useRef() 
    let unsubscriber

    useEffect(async () => {
        await chatRef.get().then( res => {
            const { user1, user2 } = res.data()
            const id = user1 !== currentUser.uid ? user1 : user2
            setOtherUserId(id)
            userIds.current = [user1, user2]
        })

        unsubscriber = await chatRef.onSnapshot(async doc => {
            const { messages } = doc.data()
            
            const filteredMessages = messages.filter(msgObj => {
                if (msgObj.sender !== currentUser.uid && !msgObj.read) {
                    return true
                } else {
                    return false
                }
            })
            setUnreadCount(filteredMessages.length)
        })

    }, [])

    useEffect(() => {
        return async () => {
            await unsubscriber()
        }
    }, [])

    useEffect(() => {
        if (otherUserId != null) {
            db.collection("users").doc(otherUserId).get().then(res => {
                const data = res.data()
                //for listitem itself
                setUserInfo({
                    profilePicture: data.profilePicture,
                    firstName: data.basicInfo.firstName,
                    lastName: data.basicInfo.lastName,
                })
                //passing info to chatBody
                if (currentChat.chatId === chatId) {
                    setCurrentChat({
                        chatId,
                        userInfo: {
                            profilePicture: data.profilePicture,
                            firstName: data.basicInfo.firstName,
                            lastName: data.basicInfo.lastName,
                        } 
                    })
                }
            })
            
            
        }
    }, [otherUserId])

    const handleClick = () => {
        if (chatId !== currentChat.chatId) {
            setCurrentChat({
                chatId,
                userInfo
            })
        }
    }

    function renderUnreadCount() {
        if (unreadCount > 0) {
            return (
                <Grid className={classes.unreadCount} >
                    {unreadCount}
                </Grid>
            )
        }
        
    }

    return (
        <div onClick={handleClick} className={classes.root}>
            <Grid container alignItems="center">
                <Grid style={{marginRight: '10px'}}>
                    <Avatar src={userInfo.profilePicture} />
                </Grid>
                <Grid className={classes.name}>
                    {userInfo.firstName + " " + userInfo.lastName}
                </Grid>
                {renderUnreadCount()}
            </Grid>
        </div>
    )
}
