import React,{useRef, useState} from 'react';
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
import Alert from '@mui/material/Alert';

import axiosInstance from '../axiosInstance';

export default function Register() {
  const nameRef=useRef()
  const usernameRef=useRef()
  const emailRef=useRef()
  const passRef=useRef()
  let navigate = useNavigate();

  const [alert,setAlert] = useState('')
  const [kind,setKind] = useState('')



  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log(nameRef.current.value)
    axiosInstance.post('auth/signup',{
      username:usernameRef.current.value,
      name:nameRef.current.value,
      password:passRef.current.value,
      email:emailRef.current.value
    })
    .then(res=>{
      setKind("success")
      setAlert(res.data)
      navigate("/login", { replace: true });

    })
    .catch(err=>{
      setKind("error")
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
          {alert?<Alert severity={kind} style={{fontFamily:'Quicksand'}}>This is a success alert — check it out!</Alert>:null}
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" style={{fontFamily:'Quicksand'}}>
            Register
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  inputRef={nameRef}
                  inputProps={{style: {fontFamily:'Quicksand'}}}
                  InputLabelProps={{style: {fontFamily:'Quicksand'}}}
                  fullWidth
                  id="name"
                  label="Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  inputRef={usernameRef}
                  inputProps={{style: {fontFamily:'Quicksand'}}}
                  InputLabelProps={{style: {fontFamily:'Quicksand'}}}
                  id="username"
                  label="UserName"
                  name="username"
                  autoComplete="username"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  inputRef={emailRef}
                  inputProps={{style: {fontFamily:'Quicksand'}}}
                  InputLabelProps={{style: {fontFamily:'Quicksand'}}}
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  inputRef={passRef}
                  fullWidth
                  inputProps={{style: {fontFamily:'Quicksand'}}}
                  InputLabelProps={{style: {fontFamily:'Quicksand'}}}
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
             
            </Grid>
            <Button
              type="submit"
              style={{width:"200px",fontFamily:'Quicksand',fontSize:'20px',color:'white',backgroundColor:'#231955'}}
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Register
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2" style={{fontFamily:'Quicksand'}}>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
  );
}