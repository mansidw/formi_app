import React,{useRef,useState} from 'react';
import { useNavigate } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import axiosInstance from '../axiosInstance'


export default function Login() {

  const usernameRef=useRef()
  const passRef=useRef()

  let navigate = useNavigate();

  const [alert,setAlert] = useState('')

  const [open, setOpen] = React.useState(false);

  
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


  const handleSubmit = (event) => {
    event.preventDefault();
    axiosInstance.post('auth/signin',{
      username:usernameRef.current.value,
      password:passRef.current.value
    })
    .then(res=>{
      console.log(res.data)
      setAlert("Logged In!")
      setOpen(true);
      localStorage.setItem('token', res.data.accessToken);
      localStorage.setItem('uid', res.data.id);
      axiosInstance.defaults.headers['x-access-token'] = localStorage.getItem('token');
      navigate("/", { replace: true });

    })
    .catch(err=>{
      setAlert(err)
    })
  };

  return (
      <Container component="main" maxWidth="xs">
     
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" style={{fontFamily:'Quicksand'}}>
            Login
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              inputProps={{style: {fontFamily:'Quicksand'}}}
              InputLabelProps={{style: {fontFamily:'Quicksand'}}}
              id="username"
              inputRef={usernameRef}
              label="UserName"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              inputRef={passRef}
              fullWidth
              inputProps={{style: {fontFamily:'Quicksand'}}}
              InputLabelProps={{style: {fontFamily:'Quicksand'}}}
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            
            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              style={{fontFamily:'Quicksand',width:'150px',fontSize:'20px',color:'white',backgroundColor:'#231955'}}
            >
              Login
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/register" variant="body2" style={{fontFamily:'Quicksand'}}>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          message={alert}
          action={action}
        />
      </Container>
  );
}