import React,{useState} from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axiosInstance from '../axiosInstance';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Eventcard(props) {
  var dat=props.date.indexOf('T')
  const check=localStorage.getItem('uid');

  const [alert,setAlert] = useState('')

  const [open, setOpen] = useState(false);
  
  const [dumcheck, setDumcheck] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  const handleSaveevent=(id)=>{

    axiosInstance.put(`addSevent/${check}`,{
      eventID:id
    })
    .then(res=>{
      setAlert("Event saved successfully!")
      setOpen(true);
      setDumcheck(true)

    })
    .catch(err=>setAlert(err))
  }

  const handleRemoveevent=(id,parentCallback)=>{
    axiosInstance.put(`removeSevent/${check}`,{
      eventID:id
    })
    .then(res=>{
      setAlert("Event removed successfully!")
      setOpen(true);
      parentCallback(id)
    })
    .catch(err=>setAlert(err))
  }


  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined" style={{backgroundColor:"#C4D7E0"}}>
        <React.Fragment>
          
          <CardContent>
            <Typography sx={{ fontSize: 14,fontFamily:'Quicksand' }} color="text.secondary" gutterBottom>
              {props.date.slice(0,dat)}
            </Typography>
            <Typography variant="h3" component="div" style={{fontFamily:'Quicksand'}}>
              {props.name}
            </Typography>
            <Typography sx={{ mb: 1.5,fontFamily:'Quicksand' }} color="text.secondary">
              ARTIST : {props.artist}
              <br/>
              LOCATION : {props.location}
              <br/>
              VARIETY : {props.var}
            </Typography>
            <Typography variant="body2" style={{fontFamily:'Quicksand'}}>
              {props.desc}
            </Typography>
          </CardContent>
          <Stack direction="row" spacing={2} sx={{pb:2,pl:2}}>

            {props.check||dumcheck?
            <Chip label="Saved !" color="primary" style={{fontFamily:'Quicksand',color:'white',backgroundColor:'#003865'}}/>:null}

            {(check && !dumcheck && !props.check && !props.saved)?<CardActions>
              <Button variant="contained" size="small" style={{fontFamily:'Quicksand',color:'white',backgroundColor:'#231955'}} onClick={()=>handleSaveevent(props.id)}>Save</Button>
            </CardActions>:null}
          </Stack>

          {props.saved?
          <CardActions disableSpacing>
            <IconButton aria-label="Remove Event">
              <DeleteIcon fontSize="large" sx={{ color: '#231955' }} onClick={()=>handleRemoveevent(props.id,props.parentCallback)}/>
            </IconButton>
          </CardActions>
          :null}
          
        </React.Fragment>
      </Card>
      <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          message={alert}
          action={action}
      />
    </Box>
  );
}