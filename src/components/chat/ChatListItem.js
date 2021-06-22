import React, { useEffect, useState, useRef } from 'react'
import _ from 'lodash'
import { Avatar, Grid, makeStyles, CircularProgress } from '@material-ui/core'

import { db } from '../../firebase'
import { useAuth } from '../../contexts/AuthContext'

const initialState = {
    mouseX: null,
    mouseY: null,
  };


const useStyles = makeStyles(theme => {
    return {
        root: {
            padding: '15px',
            borderBottom: "1px solid grey",
            backgroundColor: '#f2e6d5',
            '&:hover': {
                backgroundColor: '#e5decf'
            }
            
        },
        unreadCount: {
            marginLeft: '20px',
            backgroundColor: '#f44336',
            borderRadius: '5px',
            padding: '5px',
            color: 'white'
        },
        
    }
})

export default function ChatListItem({chatId, setCurrentChat, currentChat, chats}) {
    const classes = useStyles()
    const chatRef = db.collection("chats").doc(chatId)
    const { currentUser } = useAuth()
    const [otherUserId, setOtherUserId] = useState(null)
    const [userInfo, setUserInfo] = useState({})
    const [unreadCount, setUnreadCount] = useState(0)
    const [deleted, setDeleted] = useState(false)
    const userIds = useRef() 
    let unsubscriber

    //const [openMenu, setOpenMenu] = useState(initialState)

    // const handleRightClick = (event) => {
    //     event.preventDefault();
    //     setOpenMenu({
    //       mouseX: event.clientX - 2,
    //       mouseY: event.clientY - 4,
    //     });
    //   };
    // const handleClose = () => {
    //     setOpenMenu(initialState);
    // };

    useEffect(async () => {
        await chatRef.get().then( res => {
            const { user1, user2 } = res.data()
            const id = user1 !== currentUser.uid ? user1 : user2
            setOtherUserId(id)
            userIds.current = [user1, user2]
        })

        unsubscriber = await chatRef.onSnapshot(async doc => {
            const data = doc.data()
            if (!data) {
                return setDeleted(true)
            }
                
            const { messages } = data
            
            const filteredMessages = messages.filter(msgObj => {
                if (msgObj.sender !== currentUser.uid && !msgObj.read) {
                    return true
                } else {
                    return false
                }
            })
            
           /*
           An attempt to implement to  automatic rearrangement of chat
            
            if (filteredMessages.length) {
                const index = currentUserData.chats.indexOf(chatId)
                console.log({index})
                // if (index > 0) {
                    let chatsCopy = [...currentUserData.chats]
                    chatsCopy.splice(index, 1)
                    chatsCopy = [chatId, ...chatsCopy]
                    setCurrentUserData({    
                        ...currentUserData,
                        chats: chatsCopy
                    })
                // }
            }

            */
            

            setUnreadCount(filteredMessages.length)
            
            
        })

    }, [])

    useEffect(() => {
        return unsubscriber
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
                    otherUserId
                })
                //passing info to chatBody
                if (currentChat.chatId === chatId) {
                    setCurrentChat({
                        chatId,
                        userInfo: {
                            profilePicture: data.profilePicture,
                            firstName: data.basicInfo.firstName,
                            lastName: data.basicInfo.lastName,
                            otherUserId
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

    function renderDeleted() {
        if (deleted && otherUserId  ) {
            return (
                <div style={{color: "red", marginLeft: '10px'}}>
                    Deleted 
                </div>
            )
        }
    }

    function renderUserInfo() {
        if (_.isEmpty(userInfo)) {
            return <CircularProgress />
        } 
        return (
                <Grid container alignItems="center">
                    <Grid item style={{marginRight: '10px'}} >
                        <Avatar src={userInfo.profilePicture} />
                    </Grid>
                    <Grid item  className={classes.name} >
                        {userInfo.firstName + " " + userInfo.lastName}
                    </Grid>
                    {renderUnreadCount()}
                    {renderDeleted()}
                    
                    
                </Grid>
        )
    }

    const isSelected = currentChat.chatId === chatId 

    return (
        <div onClick={handleClick} className={classes.root} style={isSelected ? {backgroundColor: "#d9bda5"} : {}}>
            {renderUserInfo()}
        </div>
            
    )
}
