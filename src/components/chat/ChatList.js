import { makeStyles } from '@material-ui/core'
import React from 'react'

import ChatListItem from './ChatListItem'

const useStyles = makeStyles(theme => {
    return {
        root: {
            backgroundColor: 'orange'
        }
    }
})

export default function ChatList({ chats, setCurrentChat }) {
    const classes = useStyles()


    return (
        <div className={classes.root}>
            {chats.map(chat => {
                return <ChatListItem setCurrentChat={setCurrentChat} chatId={chat} />
            })}
        </div>
    )
}
