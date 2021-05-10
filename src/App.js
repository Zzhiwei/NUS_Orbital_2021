import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Layout from './components/Layout';
import Profile from './pages/Profile';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';




const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#2196f3'
    }
  }
});

function App() {
  return (    
    <ThemeProvider theme={theme}>
      <BrowserRouter >
        <Layout>
        <Switch>
          <Route path="/" exact component={Home}></Route>
          <Route path="/login" exact component={Login}></Route>
          <Route path="/register" exact component={Register}></Route>
          <Route path="/profile/:id" component={Profile}></Route>
          {/*<Route path="/:others"><NoMatch /></Route>*/}
        </Switch>
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
       
  );
}

export default App;
