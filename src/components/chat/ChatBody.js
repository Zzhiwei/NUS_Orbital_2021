import {
    Avatar,
    Grid,
    IconButton,
    makeStyles,
    Paper,
    TextField,
    Typography,
} from "@material-ui/core";
import React, { useState, useEffect, useRef } from "react";
import firebase from "firebase/app";
import SendIcon from '@material-ui/icons/Send';

import { db } from "../../firebase";
import { useAuth } from "../../contexts/AuthContext";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => {
    return {
        muiPaperOutgoing: {
            backgroundColor: "#DCF8C6",
        },
        muiPaperIncoming: {
            background: "#ffffff",
        },
        // textFieldRoot: {
        //     borderRadius: '40px'
        // }
    };
});

export default function ChatBody({ chat }) {
    console.log("rendering chat body");
    const classes = useStyles();
    const { currentUser } = useAuth();
    const [renderList, setRenderList] = useState([]);
    const [currentMessage, setCurrentMessage] = useState("");
    const autoScroll = useRef();
    let unsubscriber = () => null

    

    const chatRef = chat.chatId  !== "noneSelected"
        ? db.collection("chats").doc(chat.chatId)
        : null

        

    const handleSubmit = async (e) => {
        e.preventDefault();
        await setTimeout(() => {

        }, 100)
        if (currentMessage !== "") {
            await chatRef.update({
                messages: [...renderList, {
                    content: currentMessage,
                    sender: currentUser.uid,
                    time: firebase.firestore.Timestamp.now().toMillis(),
                    read: false
                }]
            });
        }
        setCurrentMessage("");
    };

    const handleChange = (e) => {
        setCurrentMessage(e.target.value);
    };

    const renderHeader = () => {
        const hasInfo = Boolean(chat.userInfo);
        if (hasInfo) {
            return (
                <div className="bodyHeader">
                    <Grid container alignItems="center">
                        <Grid style={{ marginRight: "10px" }}>
                            <Avatar src={chat.userInfo.profilePicture} />
                        </Grid>
                        <Grid className={classes.name}>
                            <Typography variant="h6">
                                {chat.userInfo.firstName +
                                    " " +
                                    chat.userInfo.lastName}
                            </Typography>
                        </Grid>
                    </Grid>
                </div>
            );
        }
    };

    function renderMessages() {
        if (renderList) {
            return renderList.map((x) => {
                const outgoing =
                    currentUser.uid === x.sender;

                return (
                    <div
                        align={outgoing ? "right" : "left"}
                    >
                        <Paper
                            classes={
                                outgoing
                                    ? {
                                          root: classes.muiPaperOutgoing,
                                      }
                                    : {
                                          root: classes.muiPaperIncoming,
                                      }
                            }
                            className="message"
                        >
                            <Typography>
                                {x.content}
                            </Typography>
                        </Paper>
                    </div>
                );
            })
        } else {
            return null
        }
    }

    const renderChatBody = () => {
        if (chat.chatId === "noneSelected") {
            return (
                <div style={{height: '648px', display: 'flex', alignItems: 'center'}} >
                    <div style={{ flex: 1}}>
                        <Typography align="center" variant="h3">
                            No active chat
                        </Typography>
                        <Typography align="center" variant="h6">
                            Start a conversation by visiting other user's profile!
                        </Typography>
                    </div>
                </div>
            )
        } else {
            return (
                <Paper >
                    <div>
                        {renderHeader()}
                        <div className="bodyRoot">
                            <div>
                                {renderMessages()}
                                <div ref={autoScroll}></div>
                            </div>
                        </div>
                        <form
                            className="chatInputContainer"
                            onSubmit={handleSubmit}
                            align="center"
                        >   
                            {/* <div style={{display: 'flex'}}></div> */}
                            <TextField
                                // classes={{
                                //     root: classes.textFieldRoot
                                // }}
                                className="chatInput"
                                variant="outlined"
                                size="small"
                                value={currentMessage}
                                onChange={handleChange}
                            />
                            <IconButton onClick={handleSubmit} style={{padding: "8px", marginLeft: '15px'}}>
                                <SendIcon />
                            </IconButton>
                        </form>
                    </div>
                </Paper>
            );
        }
    };

    useEffect(() => {
        if (chat.chatId === "noneSelected") {
            return
        }
        
        unsubscriber =  chatRef.onSnapshot(async doc => {
            const { messages } = doc.data()
            const updatedMessages = messages.map(msgObj => {
                return {
                    ...msgObj,
                    read: currentUser.uid === msgObj.sender 
                        ? msgObj.read
                        : true 
                }
            })
            await chatRef.update({
                messages: updatedMessages
            })
            setRenderList(messages)
        }) 

        return unsubscriber
    }, [])


    useEffect(() => {
        autoScroll.current && autoScroll.current.scrollIntoView();
    }, [renderList]);


       
    


    return renderChatBody();
}
