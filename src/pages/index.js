import axios from 'axios';
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useUserContext } from '../../context/userContext.js'
import { EventCard, Navbar,Loader } from '../components'
import { Col, Row } from 'antd';
import Cookies from 'js-cookie';
import { parse } from 'cookie';



export default function Home() {
  const router = useRouter();
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(false)
  const routeName = router.pathname;
  const {user,userToken, logout} = useUserContext()


  useEffect(()=>{
    if(routeName==='/'){
      const token = localStorage.getItem('token'); // get token from local storage
      const user = JSON.parse(localStorage.getItem('user')); // get user data from local storage

      if(token && user){
        getEvents()
      }
      else{
        router.push('/auth');
      }
    }
  },[])


  const getEvents = async()=>{
    try {
      setLoading(true)
      const token = localStorage.getItem('token'); // get token from local storage

      const options = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };
      
      const res = await axios.get(`https://goofy-purple-lungfish.glitch.me/api/v1/event`,options)
      const events = res.data.events
      setLoading(false)
      setEvents(events)
    } catch (error) {
      console.log(error)
    }

}


  return (
    <div className="min-h-[200vh] home">
    
      <div className="events pt-40">
        <Row  className='events_box flex justify-evenly'>
          {loading ? (
            <>
              <Loader />
            </>
          ):(
            <>
            {events?.map((event,i)=>(
              <Col xs={24} sm={12} lg={6} className='eventCard mt-5'>
                  <EventCard key={event._id} post={event} />
              </Col>
            ))}
          </>
          )}
          
        </Row>
      </div>
    </div>
  )
}













