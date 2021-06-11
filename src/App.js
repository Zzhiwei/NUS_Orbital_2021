import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Layout from './components/Layout';
import Profile from './pages/Profile';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { createMuiTheme, CssBaseline, ThemeProvider } from '@material-ui/core';
import { AuthProvider } from './contexts/AuthContext'
import ViewPost from './pages/ViewPost/ViewPost';
import EditPost from './pages/EditPost/EditPost';
import ForgotPassword from './pages/ForgotPassword';
import MyPosts from './pages/MyPosts';
import MyBookmarks from './pages/MyBookmarks';
import PictureCropper from './components/profile/Cropper/PictureCropper'
import Chat from './pages/Chat';
import { CreatePost } from './pages/CreatePost/CreatePostForm';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#027dc5',
      // main: '#4FC3F7', 
      light: '#a0c3e2',
    },
    secondary: {
      main: '#f44336'
    },
    background: {
      //thisdefault: '#d7e0eb',
      //default: '#4FC3F7' 
      default: 'white'
    }
  },
});


function App() {

  return (    
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter >       
        <AuthProvider>
          <Layout >
            <Switch>
              <Route path="/" exact component={Home}></Route>
              <Route path="/login" exact component={Login}></Route>
              <Route path="/register" exact component={Register}></Route>
              <Route path="/profile/:id" component={Profile}></Route>
              <Route path="/myposts" component={MyPosts}></Route>
              <Route path="/bookmarks" component={MyBookmarks}></Route>
              <Route path="/newpost" component={CreatePost}></Route>
              <Route path="/viewpost/:id" component={ViewPost}></Route>
              <Route path="/editpost/:id" component={EditPost}></Route>
              <Route path="/forgotpassword" component={ForgotPassword}></Route>
              <Route path="/chat" component={Chat}></Route>   
            </Switch>
          </Layout>   
        </AuthProvider>      
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
