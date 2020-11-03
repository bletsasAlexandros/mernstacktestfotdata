  
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import axios from 'axios'

const useStyles = theme => ({
  markdown: {
    ...theme.typography.body2,
    padding: theme.spacing(3, 0),
  },
  title:{
      color: '#000',
      textAlign: 'center',
      paddingTop: '30px'
  },
  content: {
      color: '#000',
      fontFamily: 'Helvetica, sans-serif',
      fontSize:'12px',
      lineHeight: '16px',
      textAlign: 'center'
  },
  article: {
    margin: "auto",
    width: '50%',    
    marginTop: '30px'
  },
  theBox: {
      maxWidth: '100%',
      fontSize: '10px'
  },
  date:{
    color: "rgb(128,128,128)"
  }
});

class Main extends React.Component {
    state = {articles: [],sort:false}

    async articlesGetMethod ()  {
      try {
        await axios.get('http://localhost:5000/articles')
        .then(data=>{
          const articles = data.data;
          this.setState({articles})
        })
      } catch (error) {
        console.error(error)
      }
    };

    componentDidMount(){this.articlesGetMethod();}

    //For getting the articles sorted by category (categories are sorted in alphabetical order)
    articlesGetMethodSorted= async ()=>{
      try {
        await axios.get('http://localhost:5000/articles?cat=true')
        .then(data=>{
          const articles = data.data;
          this.setState({articles})
        })
      } catch (error) {
        console.error(error)
      }
    }
  
    render(){
      const {classes} = this.props
      return (
        <Grid item xs={12} md={8} className={classes.theBox}>
          <Divider />        
          {this.state.articles.map((post) => (
            <Box className={classes.article}>
                <Link className={classes.title} variant="h4" href={"/view/"+post._id}>{post.title}</Link>
                <br />
                <Typography variant="span" className={classes.date}>{Date(post.date)}</Typography>
                <Typography className={classes.markdown} variant="body1">{post.description}</Typography>
                <Divider variant="middle" />
            </Box>
          ))}
          <Divider />
          <br />
          <Link href="/addArticle">
            <Button variant='contained' color='primary'>Add Post</Button>
          </Link>
          <br />
          <br />
          <Button variant='contained' color='primary' onClick={this.articlesGetMethodSorted}>Sort by Category</Button>
        </Grid>
        
      );
    }
}

Main.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(useStyles)(Main);