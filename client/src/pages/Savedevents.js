import * as React from 'react';
import {useEffect,useState} from 'react'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import SearchBar from "material-ui-search-bar";

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import axiosInstance from '../axiosInstance'
import Eventcard from '../components/Eventcard';


export default function Savedevents() {

  const[savedevent,setSavedevent] = useState([])
  const [remove,setRemove] = useState(0);
  const check = localStorage.getItem("uid")
  const [keyword,setKeyword] = useState()


    useEffect(()=>{

        if(check){
          axiosInstance.get(`savedevents/${check}`)
          .then(res=>{
            setSavedevent(res.data.savedevents)
          })
          .catch(err=>console.log(err))
        }
        
    },[remove])

    const handleCallback=(change)=>{
      if(change){
        setRemove(change)
      }
    }

    const handleChangekeyword=(word)=>{
      setKeyword(word)
      axiosInstance.get(`searchS/${check}/${word}`)
      .then(res =>{
        setSavedevent(res.data.message)
      })
      .catch(err=>console.log(err))
    }


  return (
    <>
      <main>
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              style={{fontFamily:'Quicksand'}}
              gutterBottom
            >
              SAVED EVENTS
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph style={{fontFamily:'Quicksand'}}>
              A list of all your saved events.
            </Typography>

            <SearchBar
              value={keyword}
              placeholder="Search Events by Name"
              onChange={(newValue) => handleChangekeyword(newValue)}
              onRequestSearch={() => handleChangekeyword(keyword)}
              style={{width:'560px',fontFamily:'Quicksand'}}
            />
            
            

          </Container>
          
          <Grid container spacing={2} sx={{padding:'10px'}}>
          {savedevent?
            savedevent.map((val,index)=>(
              
              <Grid item xs={12} lg={2} sm={6} md={4} key={index}>
                  <Eventcard date={val.date} name={val.name} desc={val.description} artist={val.artist} location={val.location} var={val.variety} id={val._id} saved="true" parentCallback = {handleCallback}/>
                </Grid>
            )):
            null
            }
          </Grid>
        </Box>
        
      </main>
      </>
  );
}