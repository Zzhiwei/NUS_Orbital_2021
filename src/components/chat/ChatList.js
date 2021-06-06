import { makeStyles } from '@material-ui/core'
import React from 'react'

import ChatListItem from './ChatListItem'

const useStyles = makeStyles(theme => {
    return {
    }
})

export default function ChatList({ chats, setCurrentChat }) {
    console.log("rendering chat list")
    const classes = useStyles()


    return (
        <div className="chatListRoot">
            {chats.map(chat => {
                return <ChatListItem setCurrentChat={setCurrentChat} chatId={chat} />
            })}
        </div>
    )
}
