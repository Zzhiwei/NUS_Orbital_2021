import { Avatar, Grid, makeStyles, Paper, rgbToHex, TextField, Typography } from '@material-ui/core'
import React, {useState, useEffect, useRef} from 'react'
import firebase from 'firebase/app';


import { db } from '../../firebase'
import { useAuth } from '../../contexts/AuthContext'
import { divide } from 'lodash';
import { NaturePeopleOutlined } from '@material-ui/icons';


const useStyles = makeStyles(theme => {
    return {
        // chatInput: {
        //     width: "80%",
        //     backgroundColor: "rgb(128, 128, 128, 0.125)"
        // },
        muiPaperOutgoing: {
            backgroundColor: '#DCF8C6'
        },
        muiPaperIncoming: {
            background: '#ffffff'
        }
        
    }
})

export default function ChatBody({ chat }) {
    console.log("rendering chat body")
    const classes = useStyles()
    const [renderList, setRenderList] = useState(null)
    const [currentMessage, setCurrentMessage] = useState("")
    const { currentUser } = useAuth()
    const autoScroll = useRef();
    const prevId = useRef("")
    const unsubcriber = useRef(() => undefined)
    
    useEffect(() => {
        autoScroll.current && autoScroll.current.scrollIntoView()
    }, [renderList])
    

    if (chat.chatId &&  prevId.current !== chat.chatId) {
        unsubcriber.current()
        console.log("getting chat messages")
        prevId.current = chat.chatId
        
        unsubcriber.current = db.collection("chats").doc(chat.chatId).collection("messages").orderBy("time")
            .onSnapshot((snapshot) => {
                let arr = []
                snapshot.forEach(message => {
                    arr.push(message.data())
                })
                setRenderList(arr)
            })
        
    } 

    const handleSubmit = (e) => {
        e.preventDefault()
        if (e.target.value !== "") {
            db.collection("chats").doc(chat.chatId).collection("messages").add({
                content: currentMessage,
                sender: currentUser.uid,
                time: firebase.firestore.FieldValue.serverTimestamp()
            })
        }
        setCurrentMessage("")
    }

    const handleChange = (e) => {
        setCurrentMessage(e.target.value)
    }
        
    const renderHeader = () => {
        const hasInfo = Boolean(chat.userInfo)
        if (hasInfo) {
            return (
                <div className="bodyHeader">
                    <Grid container alignItems="center" >
                        <Grid style={{marginRight: "10px"}}>
                            <Avatar  src={chat.userInfo.profilePicture} />
                        </Grid>
                        <Grid className={classes.name}>
                            <Typography variant="h6" >
                                {chat.userInfo.firstName + " " + chat.userInfo.lastName}
                            </Typography>
                        </Grid> 
                    </Grid>
                </div>
            )
        }
    }

    const renderChatBody = () => {
        if (chat) {
            return (
                <div>
                {renderHeader()}
                <div  className="bodyRoot">
                    <div>
                        {renderList && renderList.map(x => {
                            const outgoing = currentUser.uid === x.sender
                            return (
                                <div  align={outgoing ? "right" : "left"}>
                                    <Paper 
                                        classes={outgoing 
                                            ? { root: classes.muiPaperOutgoing} 
                                            : { root: classes.muiPaperIncoming}}
                                        className="message"
                                    >
                                        <Typography>
                                            {x.content}
                                        </Typography>
                                    </Paper> 
                                </div>
                            )
                        })}
                        <div ref={autoScroll}></div>
                    </div>
                </div>
                <form className="chatInputContainer" onSubmit={handleSubmit} align="center">
                        <TextField 
                            className="chatInput"
                            variant="outlined"
                            value={currentMessage}
                            onChange={handleChange}
                        />
                </form>
            </div>
            )
        }
    }
    

    return renderChatBody()
}
