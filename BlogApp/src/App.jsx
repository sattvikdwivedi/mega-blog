// import React ,{useState,useEffect} from 'react'
// import { useDispatch } from 'react-redux';
//  import './App.css'
// import   authService  from './Appwrite/Auth';
// import { login,logout } from './store/AuthSlice';
// import {Header,Footer} from './components'
// import { Outlet } from 'react-router-dom';

// function App() {
//   // console.log(import.meta.env.VITE_APPWRITE_URL);
//   const [loading,setloading]=useState(true);
//  const dispatch= useDispatch()
//  useEffect(()=>{
//   authService.getUser().then((userData)=>{
//       if(userData){
//           dispatch(login({userData}));
//       }
//       else{
//        dispatch(logout());
//       }
//     }).finally(()=> setloading(false))
      
//  },[])
//   return(
//      !loading ? (<div className='min-h-screen flex flex-wrap content-between bg-gray-400  '>
//      <div className='w-full block'>
//        <Header/>
//        <main>
//         {/* <Outlet/> */}
//         TODO:  <Outlet />
//        </main>
//        <Footer/>
//      </div>
//      </div>
//      ): null
//   )
  
// }

// export default App
import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import './App.css'
import authService from "./appwrite/auth"
import {login, logout} from "./store/authSlice"
import { Footer, Header } from './components'
import { Outlet } from 'react-router-dom'
import { Editor } from '@tinymce/tinymce-react';

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if (userData) {
        dispatch(login({userData}))
      } else {
        dispatch(logout())
      }
    })
    .finally(() => setLoading(false))
  }, [])
  
  return !loading ? (
    <>
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header />
        <main>
        TODO:  <Outlet />
        </main>
        <Footer />
      </div>
    </div>
    <Editor
      apiKey='bt5atp5x3m1jzctefz49av9o35c2xhoanbyjk7g5q6eiapcy'
      init={{
        plugins: 'ai tinycomments mentions anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents mergetags powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss',
        toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
        tinycomments_mode: 'embedded',
        tinycomments_author: 'Author name',
        mergetags_list: [
          { value: 'First.Name', title: 'First Name' },
          { value: 'Email', title: 'Email' },
        ],
        ai_request: (request, respondWith) => respondWith.string(() => Promise.reject("See docs to implement AI Assistant")),
      }}
      initialValue="Welcome to TinyMCE!"
    />
    </>
  ) : null
}

export default App