import {
    Avatar,
    IconButton,
    makeStyles,
    Paper,
    TextField,
    Typography,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Dialog,
    Button
} from "@material-ui/core";
import React, { useState, useEffect, useRef } from "react";
import firebase from "firebase/app";
import SendIcon from '@material-ui/icons/Send';
import {useHistory} from 'react-router-dom'

import { db } from "../../firebase";
import { useAuth } from "../../contexts/AuthContext";
import DeleteIcon from '@material-ui/icons/Delete';
import _ from 'lodash'


const useStyles = makeStyles((theme) => {
    return {
        muiPaperOutgoing: {
            backgroundColor: "#DCF8C6",
        },
        muiPaperIncoming: {
            background: "#ffffff",
        },
        deleteButton: {
            '&:hover': {
                color: 'red'
            },
        }
    };
});

export default function ChatBody({ chat, setKey }) {
    console.log("rendering chat body");
    const classes = useStyles();
    const { currentUser, currentUserData, setCurrentUserData } = useAuth();
    const [renderList, setRenderList] = useState([]);
    const [currentMessage, setCurrentMessage] = useState("");
    const autoScroll = useRef();
    // const [iDeleted, setIDeleted] = useState(false)
    const iDeleted = useRef(false)
    const [deleted, setDeleted] = useState(false)
    let unsubscriber = () => null
    const [dialogOpen, setDialogOpen] = useState(false)
    const [deleting, setDeleting] = useState(false)
    const history = useHistory()
    


    

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

    const handleDeleteChat = async () => {
        // unsubscriber() ...Why is this unsubscriber not working?
        setDeleting(true)
        iDeleted.current = true
        await db.collection("users").doc(chat.userInfo.otherUserId).update({
            chats: firebase.firestore.FieldValue.arrayRemove(chat.chatId)
        })
        await db.collection("users").doc(currentUser.uid).update({
            chats: firebase.firestore.FieldValue.arrayRemove(chat.chatId)
        })
        await db.collection("chats").doc(chat.chatId).delete()

        const chats = [...currentUserData.chats]
        const index  = chats.indexOf(chat.chatId)
        chats.splice(index, 1)
        setCurrentUserData({
            ...currentUserData,
            chats
        })
        //if you don't do this, if query string exists then it will try to listen for deleted chat
        history.push('/chat') 
        setKey((prev) => prev + 1)
        
    }

    const handleDialogOpen = () => {
        setDialogOpen(true);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
    };

    const renderHeader = () => {
        const hasInfo = Boolean(chat.userInfo);
        if (hasInfo) {
            return (
                <div className="bodyHeader">
                    <div>
                        <Avatar src={chat.userInfo.profilePicture} />
                    </div>

                    <div style={{display: 'flex', alignItems: 'center', marginLeft: '10px'}}>
                        <Typography variant="h6">
                            {chat.userInfo.firstName +
                                " " +
                                chat.userInfo.lastName}
                        </Typography>
                    </div>
                    <span style={{flexGrow: 1}}>

                    </span>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <IconButton className={classes.deleteButton} size="small" onClick={handleDialogOpen}>
                            <DeleteIcon />
                        </IconButton>
                    </div>

                        
                        {/* <Grid item xs={1}>
                            <Grid container justify="right">
                                
                            </Grid>
                        </Grid> */}
                </div>
            );
        }
    };

    function renderMessages() {
        if (!currentUser) {
            return
        }

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
        if (chat.chatId === "noChats") {
            return (
                <div style={{height: '648px', display: 'flex', alignItems: 'center'}} >
                    <div style={{ flex: 1}}>
                        <Typography align="center" variant="h3" color="primary">
                            No active chat
                        </Typography>
                    </div>
                </div>
            )
        } else if (chat.chatId === "noneSelected") {
            return (
                <div style={{height: '648px', display: 'flex', alignItems: 'center'}} >
                    <div style={{ flex: 1}}>
                        <Typography align="center" variant="h3" color="primary">
                            Choose chat to view
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
                    <Dialog
                        open={dialogOpen}
                        onClose={handleDialogClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">{"Delete Chat"}</DialogTitle>
                        <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Are you sure you want to delete the current chat?
                        </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                        <Button disabled={deleting} onClick={handleDeleteChat} color="primary">
                            Yes
                        </Button>
                        <Button onClick={handleDialogClose} color="primary" autoFocus>
                            No
                        </Button> 
                        </DialogActions>
                    </Dialog>
                    {/* second dialog */}
                    {renderDeleteDialog()}
                    
                </Paper>
            );
        }
    };

    async function refresh() {
        setKey(prev => prev + 1)
        history.push("/chat")
    }

    function renderDeleteDialog() {
        if (deleted && !iDeleted.current) {
            const chats = [...currentUserData.chats]
            const index  = chats.indexOf(chat.chatId)
            chats.splice(index, 1)
            if (index !== -1) {
                setCurrentUserData({
                    ...currentUserData,
                    chats
                })
            }
         }

            return (
                <Dialog 
                    open={deleted}
                    onClose={refresh}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Chat Deleted"}</DialogTitle>
                    <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        This chat has been deleted.
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={refresh} color="primary">
                        close
                    </Button>
                    </DialogActions>
                </Dialog>
            )
        }

    useEffect(() => {
        if (chat.chatId === "noneSelected" || chat.chatId === "noChats") {
            return
        }
        
        unsubscriber =  chatRef.onSnapshot(async doc => {
            if (!doc.data()) { 
                setDeleted(true)
                return
            }
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

        return () => {
            unsubscriber()
        }
        
    }, [])


    useEffect(() => {
        autoScroll.current && autoScroll.current.scrollIntoView(false);
    }, [renderList]);

    
       
    


    return renderChatBody();
}
