import React from 'react'
import { Avatar, Button, Card, CardActions, CardContent, CardHeader, Chip, Grid, makeStyles, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom' 

const useStyles = makeStyles(theme => {
    return {
        root: {
            
        },
        avatar: {
            height: '50px',
            width: '50px',
            color: 'white',
            backgroundColor: theme.palette.primary.main
        },
        chipStyle: {
            display: 'flex',
            justifyContent: 'left',
            flexWrap: 'wrap',
            '& > *': {
              margin: theme.spacing(0.5),
            },
        },
        link: {
            color: theme.palette.primary.main,
            textDecoration: "none",
        },
        border: {
            backgroundColor: theme.palette.secondary.main,
        }
    }    
})

function randomString(len) {
    var charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    var randomString = '';
    for (var i = 0; i < len; i++) {
        var randomPoz = Math.floor(Math.random() * charSet.length);
        randomString += charSet.substring(randomPoz,randomPoz+1);
    }
    return randomString;
}

function ProjectCard({id, title, author, description, chips}) {
    const classes = useStyles();
    return (
        <div>
            <Card elevation={2} style={{border: '1px solid grey'}} className={classes.root}>
                <CardHeader  
                    className={classes.border}
                    avatar={
                        <Avatar className={classes.avatar} >
                            {randomString(1)}
                        </Avatar>
                    }
                    title={
                        <Typography color="primary" variant="body1">
                        {title}
                        </Typography>
                    }
                    subheader={"by: " + author}                    
                />
                <CardContent style={{}}>
                    
                    <Typography variant="body1" >
                        {description}
                    </Typography>

                    <div className={classes.chipStyle} style={{marginTop: '10px'}}>
                        {chips && chips.map(tag => {
                            return <Chip label={tag}/>
                        })}
                    </div>
                </CardContent>    
                <CardActions  className={classes.border}> 
                    <Grid  container justify="center">
                        <Grid item>
                            <Link className={classes.link} to={'/viewpost/' + id} target="_blank" rel="noopener noreferrer">
                                <Button size="small" color="primary">
                                View
                                </Button>
                            </Link>
                            <Link className={classes.link} to={'/viewpost/' + id}>
                                <Button size="small" color="primary">
                                    Bookmark
                                </Button>
                            </Link>
                        </Grid>
                    </Grid>
                        
                    
                </CardActions>                
                
            </Card>

        </div>
    );
  }
  
  export default ProjectCard;
  