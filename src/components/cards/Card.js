import React, { useState, useEffect } from 'react'
import { Avatar, Card as MuiCard, CardHeader,  makeStyles, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom' 
import { db } from '../../firebase';
import 'firebase/firestore';
import Content from './Content'
import ByLine from './ByLine';

const useStyles = makeStyles(theme => {
    return {
        root: {
            border: '1px solid rgba(0, 0, 0, .125)',
            borderRadius: '4px',
            backgroundColor: 'rgb(246,238,227, 0.5)'
        },
        avatar: {
            height: '50px',
            width: '50px',
            color: 'rgb(246,238,227, 0.5)', 
            backgroundColor: 'rgb(246,238,227, 0.5)'
            //marginTop: "0px"
        },
        link: {
            color: theme.palette.primary.main,
            textDecoration: "none",
        },
    }    
})

export default function Card({ data, action, timeStamp, newTab=false }) {

    const { author, id, title, name } = data
    const classes = useStyles();
    const [profilePic, setProfilePic] = useState("unloaded")
    const [hover, setHover] = useState(0)
    const target = newTab ? "_blank" : ""
    const rel = newTab ? "noopener noreferrer" : ""

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

    //hoverEffect
    const handleHoverOn = () => {
        setHover(12)
    }

    const handleHoverOff = () => {
        setHover(0)
    }
    
    return (
        <Link className={classes.link} to={'/viewpost/' + id} target={target} rel={rel}>
            <MuiCard  
                onMouseEnter={handleHoverOn}
                onMouseLeave={handleHoverOff}
                elevation={hover} 
                className={classes.root} 
            >
                <CardHeader  
                    avatar={
                        <Avatar 
                            src={profilePic} 
                            className={classes.avatar}
                            style={profilePic ? {} : {color: "white", backgroundColor: "#4C4556"}}
                        />
                    }
                    title={
                        <Typography variant="h5">
                            {title}
                        </Typography>
                    }
                    subheader={<ByLine author={author} name={name}/>}
                    action={action}                    
                />
                <Content data={data} timeStamp={timeStamp} />
            </MuiCard>
        </Link>
    )
  }  