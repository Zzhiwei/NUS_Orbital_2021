import React, { useRef, useState } from 'react';
import { makeStyles, Paper, Button, CircularProgress, Modal } from '@material-ui/core';
import { useParams, useHistory } from 'react-router-dom';
import _ from 'lodash'

import { db } from '../../firebase';
import { useAuth } from '../../contexts/AuthContext';
import BasicInfo from './BasicInfo';
import Education from  './Education';
import Experience from './Experience';
import Interests from './Interests';
import Skills from './Skills'
import ProfileAvatar from './ProfileAvatar'

const useStyles = makeStyles((theme) => {
    return {
        root: {
            width: '1000px',
            margin: 'auto auto',            
            padding: '1px 100px',
            backgroundColor: '#f6eee3'          
        },
        modal: {
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)'
        }
    }
});

function ProfilePage() {
    console.log("rerender profile")
    const { currentUser, currentUserData, setCurrentUserData } = useAuth()
    const classes = useStyles()
    const { id } = useParams()
    const history = useHistory()
    const [openModal, setOpenModal] = useState(false)
    const viewingOwn = useRef(null)

    const [renderOptions, setRenderOptions] = useState({
        userData: null,
        enableEdit: null,
        infoReceived: false
    })


    /*
        determining if logged in user is viewing his own profile
        if yes: enable edit options, pass currentUserData as prop down to various section components
        if no: disable edit options, pass other user's data as prop
    */
    if (viewingOwn.current === null) {
        if (currentUser === null || id !== currentUser.uid) {
            viewingOwn.current = false
        } else {
            viewingOwn.current = true
        }
    }

    
    
    //tricky part: surprisingly setState() triggers rerender even though state nv changed, so have to resort to manual checking
    //or else would have infinite loop
    const getUserData = async () => {
        await db.collection('users').doc(id).get().then(res => {
            const otherUserData = res.data()
            if (!_.isEqual(renderOptions.userData, otherUserData)) { //manual check
                setRenderOptions({
                    userData: res.data(),
                    enableEdit: false,
                    infoReceived: true
                })
            }
            
        }) 
    }

    if (viewingOwn.current && !_.isEqual(renderOptions.userData, currentUserData)) { //manual check
        setRenderOptions({
            userData: currentUserData,
            enableEdit: true,
            infoReceived: true
        })
    } else {
        getUserData()
    }


    const handleMessageClick = async () => {
        //check if database already has chat between these two users
        const res1 = await db.collection('chats').where("user1", "==", id).where('user2', '==', currentUser.uid).get()
        const res2 = await db.collection('chats').where("user1", "==", currentUser.uid).where('user2', '==', id).get()
        let chatId = null
        res1.forEach(x => {
            if (!chatId) {
                chatId = x.id
            }
        })
        res2.forEach(x => {
            if (!chatId) {
                chatId = x.id
            }
        })
        
        
        setOpenModal(true)
        if (chatId) {
            //if chat alr exists, just go to chat page and open the chat
            history.push(`/chat?selected=${chatId}`)
        } else {
            //if not create a new chat
            const docRef = await db.collection('chats').add({
                user1: currentUser.uid,
                user2: id,
                messages: []
            })
            
            /*
                this kind of things should really be written in the backend not here
                very bad practice
                use firebase cloudFunctions
            */
            await db.collection('users').doc(currentUser.uid).update({
                // chats: firebase.firestore.FieldValue.arrayUnion(docRef.id)
                chats: [docRef.id, ...currentUserData.chats]
            })

            const otherUserChats = await db.collection('users').doc(id).get()
                .then(res => {
                    return res.data().chats
                })
            await db.collection('users').doc(id).update({
                chats: [docRef.id, ...otherUserChats]
            })

            setCurrentUserData({
                ...currentUserData,
                chats: [docRef.id, ...currentUserData.chats]
            })
            
            setTimeout(() => {
                history.push(`/chat?selected=${docRef.id}`)
            }, 500)
        }

        
    }

    const renderMessage = () => {
        if (!renderOptions.enableEdit && currentUser) {
            return (
                <div align="center">
                        <Button variant="outlined" onClick={handleMessageClick}> 
                            Message
                        </Button>
                    </div>
            )
        }
    }

    
    
    
    const renderContent = () => {
        if ( !renderOptions.infoReceived ) {
            return <CircularProgress className={classes.modal}/>
        } 
        return (
            <div>
                <Paper className={classes.root} elevation={3}>                  
                    <ProfileAvatar userData={renderOptions.userData} enableEdit={renderOptions.enableEdit}/>
                    {renderMessage()}
                    <Modal
                        open={openModal}
                        onClose={null}
                    >
                        <div className={classes.modal}>
                            <CircularProgress />
                        </div>
                    </Modal>
                    <BasicInfo userData={renderOptions.userData} enableEdit={renderOptions.enableEdit}/>
                    <Education userData={renderOptions.userData} enableEdit={renderOptions.enableEdit}/>            
                    <Experience userData={renderOptions.userData} enableEdit={renderOptions.enableEdit}/>
                    <Interests userData={renderOptions.userData} enableEdit={renderOptions.enableEdit}/>
                    <Skills userData={renderOptions.userData} enableEdit={renderOptions.enableEdit}/>
                </Paper>
            </div>
        )
    }

    return renderContent()
  }
  
  export default ProfilePage;
  