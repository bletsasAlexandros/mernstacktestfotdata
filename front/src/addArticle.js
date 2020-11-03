  
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import axios from 'axios'

const useStyles = () => ({
  title:{
      color: '#000',
      textAlign: 'center',
      paddingTop: '30px'
  },
  theBox: {
      maxWidth: '100%',
      fontSize: '10px',
      marginBottom: '40px'
  },
  textfield:{
      marginRight: "20%",
      marginLeft: "20%"
  }
});

class AddArticle extends React.Component {
    state = {categories:[],selectedValue:"Select Category",article:{title:null,content:null,description:null}}

    async categoriesGetMethod ()  {
        try {
          const a =  await axios.get('http://localhost:5000/categories/without')
          .then(data=>{
            const categories = data.data;
            console.log(data)
            this.setState({categories})
          })
          console.log(a.data);
          return a.data
        } catch (error) {
          console.error(error)
        }
      };

      handleSubmit = async () =>{
        try {
            await axios.post('http://localhost:5000/articles', {title:this.state.article.title, content:this.state.article.content, description:this.state.article.description, categories:this.state.selectedValue})
            .then(()=>{
              console.log("Done")
            })
          } catch (error) {
            alert(error)
          }
      }

    componentDidMount(){this.categoriesGetMethod()}

    //Hnadling Changes in Form
    handleChange = (e) =>{this.setState({selectedValue: e.target.value})}
    setTitle = (e) =>{this.setState(prevState =>({article:{...prevState.article, title: e.target.value}}))}
    setDescription = (e) =>{this.setState(prevState =>({article:{...prevState.article, description: e.target.value}}))}
    setContent = (e) =>{this.setState(prevState =>({article:{...prevState.article, content: e.target.value}}))}   
    
    render(){
    const {classes} = this.props
    return (
      <Grid item xs={12} md={8} className={classes.theBox}>
        <Divider />        
        <form className={classes.root} noValidate autoComplete="off" onSubmit={this.handleSubmit}>
            <Typography variant="h4" className={classes.title} >Title</Typography>
            <TextField id="standard-basic" label="Add Title" required='true' onInput={this.setTitle}/>
            <br />
            <Divider />
            <br />
            <Typography variant="h4" className={classes.title} >Optional Description</Typography>
            <TextField id="standard-basic" label="Add Description" onChange={this.setDescription}/>
            <br />
            <Divider />
            <br />
            <Typography variant="h4" className={classes.title}>Write your Article</Typography>
            <Box className={classes.textfield}>
                <TextField aria-label="minimum height" size='medium' fullWidth='true' multiline="true" required='true' onInput={this.setContent} />
            </Box>
            <br />
            <Divider />
            <br />
            <InputLabel id="label">Select Category</InputLabel>
            <Select labelId="label" id="select" value={this.state.selectedValue} onChange={this.handleChange} required='true'>
                {this.state.categories.map((category)=>(
                    <MenuItem value={category.name} >{category.name}</MenuItem>
                ))}                
            </Select>
            <br />
            <Divider />
            <br />
            <Input type='Submit' value='Add Article'></Input>
        </form>
      </Grid>
    );
    
      }
}

AddArticle.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(useStyles)(AddArticle);