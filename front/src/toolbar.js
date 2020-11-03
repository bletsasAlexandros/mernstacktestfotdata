import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Toolbar from '@material-ui/core/Toolbar';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Input from '@material-ui/core/Input';
import axios from 'axios';


//CSS material ui
const useStyles = theme => ({
  toolbarSecondary: {
    justifyContent: 'center',
    overflowX: 'auto'
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
    color: '#000',
    '&:hover' : {
      color: '#f00'
    }
  },
  adding: {
    right: '10px',
    position: 'absolute'
  }
});


 class TheToolbar extends React.Component {
  state = { categories: [], newCategory: null};

  //Get all categories without the articles
  async sectionsGetMethod ()  {
    try {
      await axios.get('http://localhost:5000/categories/without')
      .then(data=>{
        const categories = data.data;
        this.setState({categories: categories})
      })
    } catch (error) {
      console.error(error)
    }
  };

  componentDidMount(){this.sectionsGetMethod();}

  //If the user wants to add a category
  handleChange=(event) => {this.setState({newCategory: event.target.value});}

  handleSubmit= (event) => {
    axios
      .post("http://localhost:5000/categories", {name:this.state.newCategory})
    event.preventDefault();
    this.setState({newCategory: ''})
  }

  //If user clicks on a category it gets Deleted
  handleDelete=(id)=>{
    axios
      .delete("http://localhost:5000/categories/"+id)
  }

  render(){
    const {classes} = this.props
    return (
      <React.Fragment>
        <Toolbar component="nav" variant="dense" className={classes.toolbarSecondary}>
          {this.state.categories.map((section) => (
            <Link
              color="inherit"
              noWrap
              key={section.name}
              variant="body1"
              href="#"
              onClick={()=>this.handleDelete(section._id)}
              className={classes.toolbarLink}
            >
              {section.name}
            </Link>
          ))}
              <form className={classes.root,classes.adding} noValidate autoComplete="off" onSubmit={this.handleSubmit}>
                <TextField id="standard-basic" label="Add Category" value={this.state.newCategory} onChange={this.handleChange}/>
                <Input type='Submit'></Input>
              </form>
        </Toolbar>
        <br />
      </React.Fragment>
    );
  }
}
TheToolbar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(useStyles)(TheToolbar);