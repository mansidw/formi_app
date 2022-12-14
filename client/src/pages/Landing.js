import * as React from 'react';
import {useEffect,useState } from 'react'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import SearchBar from "material-ui-search-bar";
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import axiosInstance from '../axiosInstance'
import Eventcard from '../components/Eventcard';


export default function Landing() {

  const[allevent,setAllevent] = useState([])
  const[savedevent,setSavedevent] = useState([])
  const check = localStorage.getItem("uid")
  const [keyword,setKeyword] = useState()
  

    useEffect(()=>{
        axiosInstance.get('allevents')
        .then(res => {
          setAllevent(res.data.events)
        })
        .catch(err=>console.log(err))

        if(check){
          axiosInstance.get(`savedeventsID/${check}`)
          .then(res=>{
            setSavedevent(res.data.savedevents)
          })
          .catch(err=>console.log(err))
        }
        
    },[])

    const handleChangekeyword=(word)=>{
      setKeyword(word)
      axiosInstance.get(`search/${word}`)
      .then(res =>{
        setAllevent(res.data.message)
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
              EVENTS
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph style={{fontFamily:'Quicksand'}}>
              A list of all the available events.
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
          {allevent && savedevent?
            allevent.map((val,index)=>(
              
              <Grid item xs={12} lg={2} sm={6} md={4} key={index}>
                  <Eventcard date={val.date} name={val.name} desc={val.description} artist={val.artist} location={val.location} var={val.variety} id={val._id} check={savedevent.indexOf(val._id)!=-1?true:false}/>
                </Grid>
            )):
            
            allevent.map((val,index)=>(
              
              <Grid item xs={12} lg={2} sm={6} md={4} key={index}>
                  <Eventcard date={val.date} name={val.name} desc={val.description} artist={val.artist} location={val.location} var={val.variety} id={val._id}/>
              </Grid>
            ))
            }
          </Grid>
        </Box>
        
      </main>
      </>
  );
}