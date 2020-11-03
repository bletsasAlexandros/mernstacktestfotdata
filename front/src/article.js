  
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import axios from 'axios'

//CSS material UI
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
    width: '50%'
  },
  theBox: {
      maxWidth: '100%',
      fontSize: '10px'
  },
  date:{
    color: "rgb(128,128,128)"
  },
  delete:{
    marginTop: '20px'
  }
});

class Article extends React.Component {
    state = {article: '',edit:false}

    //Get Articles
    async articlesGetMethod ()  {
      try {
        const theUrl = window.location.pathname.split('/')
        const postId = theUrl[theUrl.length - 1]
        await axios.get('http://localhost:5000/articles/'+postId)
        .then(data=>{
          const article = data.data;
          this.setState({article: article})
        })
      } catch (error) {
        console.error(error)
      }
    };

    componentDidMount(){this.articlesGetMethod();}
    
    //For Changing the Content of the Article
    handleChange=(event) => {this.setState({article:{content: event.target.value}});}

    //For submitting the Form
    handleSubmit=()=>{
      const theUrl = window.location.pathname.split('/')
      const postId = theUrl[theUrl.length - 1]
      axios
        .put("http://localhost:5000/articles/"+postId,{content: this.state.article.content})
    }

    //For deleting the Article
    deleteArticle=()=>{
      const theUrl = window.location.pathname.split('/')
      const postId = theUrl[theUrl.length - 1]
      console.log(postId)
      axios
        .delete("http://localhost:5000/articles/"+postId)
          .then(()=>{
            let url = '/';
            this.props.history.push(url);})
    }   
  
    render(){
    const {classes} = this.props
    return (
      <Grid item xs={12} md={8} className={classes.theBox}>
        <Divider />        
          <Box className={classes.article}>
              <br />
              <Typography variant="h3" className={classes.title}>{this.state.article.title}</Typography>
              <Typography variant="span" className={classes.date}>{Date(this.state.article.date)}</Typography>
              <br />
              <br />
              <Typography variant='h4'>Description</Typography>
              <Typography className={classes.markdown} variant="body1">{this.state.article.description}</Typography>
              <Typography variant='h4'>Article</Typography>
                {this.state.edit==false ? 
                    <Box>
                        <Typography className={classes.markdown} variant="body1">{this.state.article.content}</Typography>
                        <Button variant="contained" color="primary" onClick={e=>this.setState({edit:true})}>Edit</Button>
                    </Box> : 
                    <form onSubmit={this.handleSubmit}>
                        <TextareaAutosize aria-label="minimum height" rowsMin={3} onChange={this.handleChange}>{this.state.article.content}</TextareaAutosize>
                        <Input type='Submit' value='Submit'></Input>
                    </form>
                }
              
          </Box>
          <br />
        <Divider />
        <Button variant='contained' color='secondary' onClick={this.deleteArticle} className={classes.delete}>Delete Article</Button>
        <br />
      </Grid>
    );
    
      }
}

Article.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(useStyles)(Article);