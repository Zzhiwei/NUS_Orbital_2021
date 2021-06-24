import React, { useState, useEffect } from 'react'
import { Modal, CircularProgress, Box, Container, CssBaseline, makeStyles, Typography, Avatar, Tooltip, Chip, Divider, Button } from '@material-ui/core'
import Copyright from '../../components/Copyright'
import { Link, useHistory } from 'react-router-dom'
import DateRangeIcon from '@material-ui/icons/DateRange';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import SchoolRoundedIcon from '@material-ui/icons/SchoolRounded';
import PeopleAltRoundedIcon from '@material-ui/icons/PeopleAltRounded';
import SubjectRoundedIcon from '@material-ui/icons/SubjectRounded';
import { db } from '../../firebase';
import { useAuth } from '../../contexts/AuthContext'
import firebase from 'firebase/app';
import 'firebase/firestore';
import BookmarkIcon from '@material-ui/icons/Bookmark'
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder'
import ForumIcon from '@material-ui/icons/Forum'
import ShareIcon from '@material-ui/icons/Share'
import SimilarPosts from './SimilarPosts'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import TextViewer from '../../components/texteditor/TextViewer';
import { BookmarkSnackBar, UnbookmarkSnackBar } from '../../components/SnackBar'

const useStyles = makeStyles (theme => ({
    layout: {
        display: "flex", 
        paddingTop: "32px"
    },
    mainContainer: {
        width: "100%", 
        boxSizing: "border-box"
    },
    asideContainer: {
        width: "50%", 
        boxSizing: "border-box",
        paddingLeft: "64px"
    },
    topFold: {
        display: "flex",
        position: "relative"
    },
    title: {
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
        fontSize: "16px",
        marginLeft: "30px"
    },
    avatar: {
        height: "72px", 
        width: "72px",
        color: '#fffcf5',
        backgroundColor: '#fffcf5'
    },
    contentBox: {
        display: "flex",
        marginTop: "30px",
        marginLeft: "75px",
        marginBottom: "10px",
        boxSizing: "border-box",
        fontSize: "16px"
    },
    content: {
        display: "flex", 
        alignItems: "center", 
        flexWrap: "wrap",
        marginBottom: "20px",
    },
    buttonBox: {
        marginBottom: "30px",
        display: "flex",
        justifyContent:"center",
        alignItems: "center",
    },
    circle: {
        height: "6px",
        width: "6px",
        backgroundColor: "#bbb",
        borderRadius: "50%",
        margin: "0px 20px"
    },
    pageBody: {
        marginTop: "32px",
    },
    skillsBox: {
        display: "flex",
        //alignItems: "center",
        //justifyContent: "center",
        flexWrap: "wrap",
        marginTop: "15px",
        marginBottom: "40px"
    },
    byline: {
        color: theme.palette.primary.main,
        textDecoration: "none",
        '&:hover':{
            textDecoration: "underline",
        },
    },
    modal: {
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)'
    }
}))

export default function ViewPostForm({ setKey, data })  {
    const classes = useStyles()
    const { objectID : id, title, name, author, type, category, location, commitment, education, current, total, skills : chips, description } = data
    const { currentUser, currentUserData, setCurrentUserData } = useAuth()
    const userRef = currentUser ? db.collection("users").doc(currentUser.uid) : null
    const [profilePic, setProfilePic] = useState("unloaded")
    const [openModal, setOpenModal] = useState(false)
    const [bookmarked, setBookmarked] = useState(false)
    const [openB, setOpenB] = useState(false)
    const [openUb, setOpenUb] = useState(false)
    const history = useHistory()
    
    
    useEffect(() => {
        if (currentUser && currentUserData && currentUserData.bookmarks) {
            setBookmarked(currentUserData.bookmarks.includes(id))
        }
    }, [currentUser, currentUserData, id])

    useEffect(() => {
        async function fetchProfilePic() {
            const dataUrl = await db.collection('users').doc(author).get().then(res => res.data().profilePicture)
            if (dataUrl) {
                setProfilePic(dataUrl)
            } else {
                setProfilePic(null)
            }
        }
        fetchProfilePic()
    }, [author])

    const handleAddBookmark = async () => {
        await userRef.update({
            bookmarks: firebase.firestore.FieldValue.arrayUnion(id)
        })
        setCurrentUserData({
            ...currentUserData,
            bookmarks: [...currentUserData.bookmarks, id]
        })
        setBookmarked(true)
        setOpenUb(false)
        setOpenB(true)
    }

    const handleRemoveBookmark = async () => {
        await userRef.update({
            bookmarks: firebase.firestore.FieldValue.arrayRemove(id)
        })
        const bookmarks = [...currentUserData.bookmarks]
        const index  = bookmarks.indexOf(id)
        bookmarks.splice(index, 1)
        setCurrentUserData({
            ...currentUserData,
            bookmarks
        })
        setBookmarked(false)
        setOpenB(false)
        setOpenUb(true)
    }

    async function handleChat() {
        setOpenModal(true)
        const id = author
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
        
        if (chatId) {
            history.push(`/chat?selected=${chatId}`)
        } else {
            const docRef = await db.collection('chats').add({
                user1: currentUser.uid,
                user2: id,
                messages: []
            })
            
            await db.collection('users').doc(currentUser.uid).update({
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
            
            history.push(`/chat?selected=${docRef.id}`)
        }
    }

    const byline = (
        <Typography variant="h6">
            <Chip label={category} size="small" style={{backgroundColor: "grey", color: "white", marginLeft: "-1.5px", marginRight: "10px", marginBottom: "4px"}}/>
            <Link className={classes.byline} to={`/profile/${author}`}>
            {`by ${name}`}
            </Link>   
        </Typography>
    )

    return (
        <Container>
            <CssBaseline />
            <Container className={classes.layout}>
                <main className={classes.mainContainer}>
                    <div className={classes.topFold}>
                        <Avatar 
                            src={profilePic} 
                            className={classes.avatar}
                            style={profilePic ? {} : {color: "white", backgroundColor: "#4C4556"}}
                        />
                        <div className={classes.title}>
                            <div>
                                <Typography variant="h4">
                                    {title} 
                                </Typography>
                                <div style={{display: "inline-block", marginLeft: "3px"}}>
                                    {byline}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={classes.contentBox}>
                        <div>
                            <div className={classes.content}>
                                <Tooltip title="Type">
                                <SubjectRoundedIcon style={{marginLeft: '-0.5px', marginRight: '30px', fontSize: 28}}/>
                                </Tooltip>
                                {/* <Chip label={type} style={{marginRight: "10px", backgroundColor: "teal", color: "white"}}/> */}
                                {/* <Chip label={category} style={{backgroundColor: "orange", color: "white"}}/> */}
                                {type}
                            </div>
                            <div className={classes.content}>
                                <Tooltip title="Location">
                                <LocationOnIcon style={{marginLeft: '-0.5px', marginRight: '30px', fontSize: 28}}/>
                                </Tooltip>
                                {location}
                            </div>
                            <div className={classes.content}>
                                <Tooltip title="Commitment Period">
                                <DateRangeIcon style={{marginRight: '30px', fontSize: 28}}/>
                                </Tooltip>
                                {commitment}
                            </div>
                            <div className={classes.content}>
                                <Tooltip title="Education Level">
                                <SchoolRoundedIcon style={{marginRight: '30px', fontSize: 28}}/>
                                </Tooltip>
                                {education}
                            </div>
                            <div className={classes.content}>
                                <Tooltip title="Members">
                                <PeopleAltRoundedIcon style={{marginRight: '30px', fontSize: 28}}/>
                                </Tooltip>
                                {current} / {total}
                            </div>
                        </div>
                    </div>
                    { currentUser &&
                    <div className={classes.buttonBox}>
                        <Button 
                            variant="contained" 
                            style={{color: "white", backgroundColor: "green", minWidth: "135.45px"}}
                            startIcon={<ForumIcon />}
                            onClick={handleChat}
                        >
                            Chat
                        </Button>
                        <Button 
                            variant="contained" 
                            color={bookmarked ? "secondary" : "primary"} 
                            onClick={bookmarked ? handleRemoveBookmark : handleAddBookmark} style={{margin: " 0px 30px"}}
                            startIcon={bookmarked ? <BookmarkIcon /> : <BookmarkBorderIcon />}
                        >
                            { bookmarked ? "Unbookmark" : "Bookmark" }
                        </Button>
                        <Button 
                            variant="contained" 
                            style={{color: "white", backgroundColor: "purple", minWidth: "135.45px"}}
                            startIcon={<ShareIcon />}
                        >
                            Share
                        </Button>
                    </div>
                    }
                    <Divider />
                    <div className={classes.pageBody}>
                        <Typography variant="h6">
                            Required Skills / Experience
                        </Typography>
                        <div className={classes.skillsBox}>
                            {chips && chips.map((tag, index) => {
                                return <Chip key={index} label={tag} style={{backgroundColor: "#027dc5", color: "white", margin: "10px"}} />
                            })}
                        </div>
                        {/* <Typography variant="h6">
                            Nice to Have Skills / Experience
                        </Typography>
                        <div className={classes.skillsBox}>
                            {chips && chips.map((tag, index) => {
                                return <Chip key={index} label={tag}/>
                            })}
                        </div> */}
                        <Typography variant="h6">
                            About the {category}
                        </Typography>
                        <TextViewer key={id} content={description}/>
                    </div>
                </main>
                <aside className={classes.asideContainer}>
                    <SimilarPosts hit={data} setOpenB={setOpenB} setOpenUb={setOpenUb}/>
                </aside>
            </Container>
            <Box style={{marginTop: 50, marginBottom: -30}}>
                <Copyright />
            </Box>
            <BookmarkSnackBar open={openB} setOpen={setOpenB}/>
            <UnbookmarkSnackBar open={openUb} setOpen={setOpenUb}/>
            <Modal
                open={openModal}
                onClose={null}
            >
                <div className={classes.modal}>
                    <CircularProgress />
                </div>
            </Modal>
        </Container>
    )
}