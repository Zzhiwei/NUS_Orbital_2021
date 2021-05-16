import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Layout from './components/Layout';
import Profile from './pages/Profile';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { createMuiTheme, CssBaseline, ThemeProvider } from '@material-ui/core';
import NewPost from './pages/NewPost';
import { AuthProvider } from './contexts/AuthContext'


const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#2196f3'
    },
    background: {
      //default: "#f4f5f1"
      //default: '#f4f5fd'
      default: '#ffffff'
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
              <Route path="/newpost" component={NewPost}></Route>
              <Route path="/viewpost" component={NewPost}></Route>          
            </Switch>
          </Layout>   
        </AuthProvider>      

      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
