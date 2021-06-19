import React, { useState, useEffect } from 'react'
import { Box, Container, CssBaseline, makeStyles, Typography, Avatar, Tooltip, Chip, Divider, Button } from '@material-ui/core'
import Copyright from '../../components/Copyright'
import { Link } from 'react-router-dom'
import MUIRichTextEditor  from 'mui-rte'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
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
        width: "70%", 
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
        width: "72px"
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
    }
}))

const rteTheme = createMuiTheme()

Object.assign(rteTheme, {
  overrides: {
    MUIRichTextEditor: {
        root: { 
            backgroundColor: "#fff",
            marginBottom: "70px"
        },
        anchorLink: {
            color: "#333333",
            textDecoration: "underline"
        }
      }
    }
})

export default function ViewPostForm({ data })  {

    const classes = useStyles()
    const { objectID : id, title, name, author, type, category, location, commitment, education, current, total, skills : chips, description } = data
    const { currentUser, currentUserData, setCurrentUserData } = useAuth()
    const userRef = currentUser ? db.collection("users").doc(currentUser.uid) : null
    const [profilePic, setProfilePic] = useState("")
    const [bookmarked, setBookmarked] = useState(false)
    
    useEffect(() => {
        if (currentUser && currentUserData && currentUserData.bookmarks) {
            setBookmarked(currentUserData.bookmarks.includes(id))
        }
    }, [])

    useEffect(async () => {
        const dataUrl = await db.collection('users').doc(author).get().then(res => res.data().profilePicture)
        setProfilePic(dataUrl)
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
    }

    const byline = (
        <Link className={classes.byline} to={`/profile/${author}`}>
            <Typography variant="h6">
            {`by: ${name}`}
            </Typography>
        </Link>   
    )

    return (
        <Container>
            <CssBaseline />
            <Container className={classes.layout}>
                <main className={classes.mainContainer}>
                    <div className={classes.topFold}>
                        <Avatar src={profilePic} className={classes.avatar}>
                            X
                        </Avatar>
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
                                <Tooltip title="Type and Category">
                                <SubjectRoundedIcon style={{marginLeft: '-0.5px', marginRight: '28px', fontSize: 28}}/>
                                </Tooltip>
                                <Chip label={type} style={{marginRight: "10px", backgroundColor: "teal", color: "white"}}/>
                                <Chip label={category} style={{backgroundColor: "orange", color: "white"}}/>
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
                    <div className={classes.buttonBox}>
                        <Button 
                            variant="contained" 
                            style={{color: "white", backgroundColor: "green", minWidth: "135.45px"}}
                            startIcon={<ForumIcon />}
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
                    <Divider />
                    <div className={classes.pageBody}>
                        <Typography variant="h6">
                            Required Skills / Experience
                        </Typography>
                        <div className={classes.skillsBox}>
                            {chips && chips.map((tag, index) => {
                                return <Chip key={index} label={tag} style={{backgroundColor: "maroon", color: "white"}} />
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
                        <MuiThemeProvider theme={rteTheme}>
                            <MUIRichTextEditor 
                                defaultValue={description}
                                controls={[]}
                                readOnly
                            />
                        </MuiThemeProvider>
                    </div>
                </main>
                <aside className={classes.asideContainer}>
                    <SimilarPosts hit={data}/>
                </aside>
            </Container>
            <Box>
                <Copyright />
            </Box>
        </Container>
    )
}