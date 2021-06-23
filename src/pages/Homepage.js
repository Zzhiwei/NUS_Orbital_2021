import React from 'react'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch
} from "react-router-dom";
import Home from './Home';
import MyBookmarks from './MyBookmarks';
import MyPosts from './MyPosts';

export default function Homepage() {
  let { path, url } = useRouteMatch();

  return (
    <div>
      {/* <Link to={`${url}/myposts`}>My posts</Link>
      <Link to={`${url}/bookmarks`}>My Bookmarks</Link> */}
      <Switch>
        <Route exact path={path} component={Home}/>
        {/* <Route path={`${path}/myposts`} component={MyPosts}/>
        <Route path={`${path}/bookmarks`} component={MyBookmarks}/> */}
      </Switch>
    </div>
  )
}
