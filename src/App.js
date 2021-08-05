import Login from './pages/Login';
import Register from './pages/Register';
import Layout from './components/Layout';
import Profile from './pages/Profile';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { createMuiTheme, CssBaseline, ThemeProvider } from '@material-ui/core';
import { AuthProvider } from './contexts/AuthContext'
import ViewPost from './pages/ViewPost/ViewPost';
import EditPost from './pages/EditPost/EditPost';
import ForgotPassword from './pages/ForgotPassword';
import Chat from './pages/Chat';
import { CreatePost } from './pages/CreatePost/CreatePostForm'; 
import LoadingPage from './pages/LoadingPage';
import Homepage from './pages/Homepage';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#4C4556',
      light: '#a0c3e2',
    },
    secondary: {
      main: '#f44336'
    },
    background: {
      default: '#fffcf5',
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
              <Route exact path="/" >
                <Redirect to="/home" />
              </Route>
              <Route path="/home" component={Homepage}></Route>
              <Route path="/login" exact component={Login}></Route>
              <Route path="/register" exact component={Register}></Route>
              <Route path="/profile/:id" component={Profile}></Route>
              <Route path="/newpost" component={CreatePost}></Route>
              <Route path="/viewpost/:id" component={ViewPost}></Route>
              <Route path="/editpost/:id" component={EditPost}></Route>
              <Route path="/forgotpassword" component={ForgotPassword}></Route>
              <Route path="/chat" component={Chat}></Route>   
              <Route path="/loading" component={LoadingPage}></Route>   
            </Switch>
          </Layout>   
        </AuthProvider>      
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
