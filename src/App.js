import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Layout from './components/Layout';
import Profile from './pages/Profile';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { createMuiTheme, CssBaseline, ThemeProvider } from '@material-ui/core';
import NewPost from './pages/NewPost';
import { AuthProvider } from './contexts/AuthContext'
import GetId from './components/GetId';
import ForgotPassword from './pages/ForgotPassword';
import MyPosts from './pages/MyPosts';


const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#027dc5',
      light: '#a0c3e2',
    },
    secondary: {
      main: '#f8f8f6',
      //main: '#f7f7f7',
    },
    background: {
      //default: '#ffffff'
      default: '#d7e0eb'
    }
  }
});

function App() {
  return (    
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter >       
        <AuthProvider>
          <Layout>
            <Switch>
              <Route path="/" exact component={Home}></Route>
              <Route path="/login" exact component={Login}></Route>
              <Route path="/register" exact component={Register}></Route>
              <Route path="/profile/:id" component={Profile}></Route>
              <Route path='/myposts' component={MyPosts}></Route>
              <Route path="/newpost" component={NewPost}></Route>
              <Route path="/viewpost/:id" component={GetId}></Route>
              <Route path="/forgotpassword" component={ForgotPassword}></Route>    
            </Switch>
          </Layout>   
        </AuthProvider>      

      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
