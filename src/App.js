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

/*
https://www.color-hex.com/color-palette/104061
https://www.shutterstock.com/color/ivory
https://www.shutterstock.com/blog/10-gorgeous-color-schemes-for-websites?kw=&gclsrc=aw.ds&gclid=CjwKCAjwzruGBhBAEiwAUqMR8KCbaWFs5E_Bh-lj5XH2SEtEInd8CD2cNQJlZFb7oc6cVkntNpt9VhoCH88QAvD_BwE
layout: d9bda5
cards/paper: f6eee3
primary: see below
*/

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#4C4556',
      // main: '#000000', 
      light: '#a0c3e2',
    },
    secondary: {
      main: '#f44336'
    },
    background: {
      default: '#fffcf5',
      // default: 'rgb(246,238,227, 0.5)'
      //thisdefault: '#d7e0eb',
      //default: '#4FC3F7' 
      // default: '#f0e3cc'
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
