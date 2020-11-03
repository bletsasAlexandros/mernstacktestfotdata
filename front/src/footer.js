import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    footer:{
      backgroundColor: 'rgb(211,211,211)',
      textAlign: 'center',
      marginTop: '50px',
      padding: '20px'
    },
    con:{
        color: 'rgb(105,105,105)',
        fontFamily: `"Comic Sans MS", cursive, sans-serif`
    }
  }));

export default function Footer (){
    const classes = useStyles();
    return(
        <Box className={classes.footer}>
            <Typography variant="h6" className={classes.con}>This is a footer</Typography>
        </Box>
    )
}