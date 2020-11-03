import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Header from './toolbar';
import Articles from './articles'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Article from './article';
import AddArticle from './addArticle';
import Footer from './footer';

const useStyles = makeStyles(() => ({
  appBar:{
    backgroundColor: '#fff'
  },
  hero:{
    backgroundImage: `linear-gradient(rgba(0,0,0, 0.5),rgba(0,0,0,0.5)), url('https://images.unsplash.com/photo-1505682634904-d7c8d95cdc50?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80')`,
    height: "500px",
    backgroundPosition:"center",
    backgroundRepeat:"no-repeat",
    backgroundSize:"cover",
    position:"relative",
    display: "flex",
    justifyContent:"center",
    alignItems:"center",
    color:"#fff",
    fontSize:"4rem"
  },
  title:{
    color: '#000'
  }
}));

function App() {
  const classes = useStyles();
  return (
    <div className="App">
       <AppBar className={classes.appBar} position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link href = '/' style={{ textDecoration: 'none' }}>Blog</Link>
          </Typography>
        </Toolbar>
      </AppBar>
      <Box className={classes.hero}>
        <Box>My blog</Box>
      </Box>
      <Header></Header>
      <Router>
        <Switch>
          <Route path="/" exact component={Articles}></Route>
          <Route path="/view/:postId" component={Article}></Route>
          <Route path="/addArticle" component={AddArticle}></Route>
      </Switch>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
