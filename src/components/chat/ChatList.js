import { makeStyles } from '@material-ui/core'
import React, {useRef} from 'react'

import ChatListItem from './ChatListItem'

const useStyles = makeStyles(theme => {
    return {
        header: {
            padding: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderBottom: '1px solid rgb(128, 128, 128, 0.5)',
            fontSize: '20px'
        }
    }
})

export default function ChatList({ chats, setCurrentChat, currentChat }) {
    console.log("rendering chat list")
    const classes = useStyles()


    return (
        <div className="chatListRoot">
            <div className={classes.header}>Active chats</div>
            <div className="chatListScrollBody">
            {chats.map(chat => {
                return <ChatListItem currentChat={currentChat} setCurrentChat={setCurrentChat} chatId={chat} />
            })}
            </div>
        </div>
    )
}