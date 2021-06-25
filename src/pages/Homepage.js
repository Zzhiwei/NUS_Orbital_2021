import { AppBar, Container, makeStyles, Typography } from '@material-ui/core';
import React, {useState, useRef} from 'react'
import ExploreIcon from '@material-ui/icons/Explore';
import BookmarksIcon from '@material-ui/icons/Bookmarks';
import AllInboxRoundedIcon from '@material-ui/icons/AllInboxRounded';
import {
  Switch,
  Route,
  useRouteMatch,
  useHistory
} from "react-router-dom";
import Home from './Home';
import MyBookmarks from './MyBookmarks';
import MyPosts from './MyPosts';
import { useAuth } from '../contexts/AuthContext';

const useStyles = makeStyles((theme) => {
  return {
      appbar: {
        position: '-webkit-sticky',
        position: 'sticky',
        top: "64px",
        height: '50px',
        backgroundColor: 'rgb(222, 209, 193)',
        borderBottom: '1px solid rgb(0, 0, 0, 0.1)',
      },
      btn: {
        textDecoration: 'none',
        cursor: 'pointer',
        height: '50px',
        width: '200px',
        border: '0px',
        backgroundColor: 'rgb(222, 209, 193)',
        textTransform: 'none',
        '&:hover': {
            background: "#c3aa94"
        },
      },
      selectedBtn: {
        cursor: 'pointer',
        height: '50px',
        width: '200px',
        border: '0px',
        backgroundColor: '#fffcf5',
        borderTopLeftRadius: '5px',
        borderTopRightRadius: '5px',
      }
  }
});

export default function Homepage() {
  const { currentUser } = useAuth()
  const classes = useStyles()
  const [selected, setSelected] = useState(0)
  const history = useHistory()
  const autoScrollToTop = useRef()
  let { path, url } = useRouteMatch();
  

  function handleExplore() {
    if (selected !== 0) {
      setSelected(0)
      history.push(`${url}`)
    }
  }

  function handleBookmarks() {
    if (selected !== 1) {
      setSelected(1)
      history.push(`${url}/bookmarks`)
    }
  }

  function handleMyposts() {
    if (selected !== 2) {
      setSelected(2)
      history.push(`${url}/myposts`)
    }
  }
  

  return (
    <>
      <div ref={autoScrollToTop}></div>
      {!currentUser && <Home autoScrollToTop={autoScrollToTop}/>}
      {currentUser && (
        <div >
          <AppBar className={classes.appbar} elevation={0}>
            <Container>
            
            <div style={{display: 'flex'}}>
                <button className={selected === 0 ? classes.selectedBtn : classes.btn} onClick={handleExplore}>
                  <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <ExploreIcon style={{marginRight: '5px'}}/>
                    <Typography variant="h6">
                      Explore
                    </Typography>
                    
                  </div>
                </button>
                <button className={selected === 1 ? classes.selectedBtn : classes.btn} onClick={handleBookmarks}>
                  <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <BookmarksIcon style={{marginRight: '5px'}}/>
                    <Typography variant="h6" >
                      Bookmarks
                    </Typography>
                  </div>
                </button>
                <button className={selected === 2 ? classes.selectedBtn : classes.btn} onClick={handleMyposts}>
                  <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <AllInboxRoundedIcon style={{marginRight: '5px'}}/>
                    <Typography variant="h6" >
                      My Posts
                    </Typography>
                  </div>
                </button>
                
              </div>
              
            </Container>

          </AppBar>
      
        <Switch>
          <Route exact path={path}>
            <Home 
              autoScrollToTop={autoScrollToTop}
            />
          </Route>
          <Route exact path={`${path}/myposts`} >
            <MyPosts selected={selected} setSelected={setSelected} />
          </Route>
          <Route path={`${path}/bookmarks`}>
            <MyBookmarks selected={selected} setSelected={setSelected} />
          </Route>
        </Switch>
      </div>
      )}
    </>
  )
}
