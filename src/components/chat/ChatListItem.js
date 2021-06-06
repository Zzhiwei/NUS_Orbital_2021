import React, { useEffect, useState, useRef } from 'react'

import { db } from '../../firebase'
import { useAuth } from '../../contexts/AuthContext'
import { Avatar, Grid, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => {
    return {
        root: {
            padding: '10px',
            borderBottom: "1px solid grey"
        },
        name: {

        }
    }
})

export default function ChatListItem({chatId, setCurrentChat}) {
    const classes = useStyles()
    const chatRef = db.collection("chats").doc(chatId)
    const { currentUser } = useAuth()
    const [otherUserId, setOtherUserId] = useState(null)
    const [userInfo, setUserInfo] = useState({})
    const userIds = useRef() 

    useEffect(() => {
        chatRef.get().then( res => {
            const { user1, user2 } = res.data()
            const id = user1 !== currentUser.uid ? user1 : user2
            setOtherUserId(id)
            userIds.current = [user1, user2]
        })
    }, [])

    useEffect(() => {
        if (otherUserId != null) {
            db.collection("users").doc(otherUserId).get().then(res => {
                const data = res.data()
                setUserInfo({
                    profilePicture: data.profilePicture,
                    firstName: data.basicInfo.firstName,
                    lastName: data.basicInfo.lastName,
                })
            })
        }
    }, [otherUserId])

    const handleClick = () => {
        setCurrentChat({
            chatId,
            users: userIds.current
        })
    }

    return (
        <div onClick={handleClick} className={classes.root}>
            <Grid container>
                <Grid>
                    <Avatar src={userInfo.profilePicture} />
                </Grid>
                <Grid className={classes.name}>
                    {userInfo.firstName + " " + userInfo.lastName}
                </Grid>
            </Grid>
        </div>
    )
}
