import React, { useEffect, useState } from 'react'

import { db } from '../../firebase'
import { useAuth } from '../../contexts/AuthContext'
import { Avatar } from '@material-ui/core'


export default function ChatListItem({chatId, setCurrentChat}) {
    const chatRef = db.collection("chats").doc(chatId)
    const { currentUser } = useAuth()
    const [otherUserId, setOtherUserId] = useState(null)
    const [userInfo, setUserInfo] = useState({})

    useEffect(() => {
        chatRef.get().then(res => {
            const { user1, user2 } = res.data()
            const id = user1 !== currentUser.uid ? user1 : user2
            setOtherUserId(id)
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
        console.log(chatId)
        setCurrentChat(chatId)
    }

    return (
        <div onClick={handleClick}>
            <Avatar src={userInfo.profilePicture} />
            {userInfo.firstName + " " + userInfo.lastName}
        </div>
    )
}
