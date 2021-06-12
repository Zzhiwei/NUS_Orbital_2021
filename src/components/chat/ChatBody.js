import {
    Avatar,
    Grid,
    makeStyles,
    Paper,
    TextField,
    Typography,
} from "@material-ui/core";
import React, { useState, useEffect, useRef } from "react";
import firebase from "firebase/app";

import { db } from "../../firebase";
import { useAuth } from "../../contexts/AuthContext";

const useStyles = makeStyles((theme) => {
    return {
        muiPaperOutgoing: {
            backgroundColor: "#DCF8C6",
        },
        muiPaperIncoming: {
            background: "#ffffff",
        },
    };
});

export default function ChatBody({ chat }) {
    console.log("rendering chat body");
    const classes = useStyles();
    const [renderList, setRenderList] = useState([]);
    const [currentMessage, setCurrentMessage] = useState("");
    const { currentUser } = useAuth();
    const autoScroll = useRef();
    let unsubscriber


    const messagesRef = db
        .collection("chats")
        .doc(chat.chatId)
        .collection("messages");


    const chatRef = db
        .collection("chats")
        .doc(chat.chatId)
        

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
        if (!currentUser) {
            return null;
        } else if (chat) {
            return (
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
                        <TextField
                            className="chatInput"
                            variant="outlined"
                            value={currentMessage}
                            onChange={handleChange}
                        />
                    </form>
                </div>
            );
        }
    };

    useEffect(async () => {
       

        unsubscriber = await chatRef.onSnapshot(async doc => {
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

        
    }, [])

    useEffect(() => {
        return async () => {
            await unsubscriber()
        }
    }, [])

    useEffect(() => {
        autoScroll.current && autoScroll.current.scrollIntoView();
    }, [renderList]);


       
    


    return renderChatBody();
}
