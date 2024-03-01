import React ,{useState,useEffect} from 'react'
import { useDispatch } from 'react-redux';
 import './App.css'
import   authService  from './Appwrite/Auth';
import { login,logout } from './store/AuthSlice';
import {Header,Footer} from './components'
import { Outlet } from 'react-router-dom';

function App() {
  // console.log(import.meta.env.VITE_APPWRITE_URL);
  const [loading,setloading]=useState(true);
 const dispatch= useDispatch()
 useEffect(()=>{
  authService.getUser().then((userData)=>{
      if(userData){
          dispatch(login({userData}));
      }
      else{
       dispatch(logout());
      }
    }).finally(()=> setloading(false))
      
 },[])
  return(
     !loading ? (<div className='min-h-screen flex flex-wrap content-between bg-gray-400  '>
     <div className='w-full block'>
       <Header/>
       <main>
        {/* <Outlet/> */}
        TODO:  <Outlet />
       </main>
       <Footer/>
     </div>
     </div>
     ): null
  )
  
}

export default App