import React from 'react'
import { Route,BrowserRouter, Routes } from 'react-router-dom'
import  Home  from './components/Home'
import Studentdashboard from './components/Studentdashboard'
import Studentprofile from './components/Studentprofile'
import Applysclorship from './components/Applysclorship'
import Editprofile from './components/Editprofile'
import Studentdocument from './components/Studentdocument'
import Studentsclrecodes from './components/Studentsclrecodes'


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/student" element={<Studentdashboard/>} />
        <Route path='/student/profile' element={<Studentprofile/>}/>
        <Route path='/student/apply' element={<Applysclorship/>}/>
        <Route path='/student/edit' element={<Editprofile/>}/>
        <Route path='/student/documents' element={<Studentdocument/>}/>
        <Route path='/student/recodes' element={<Studentsclrecodes/>}/>
      </Routes> 
    </BrowserRouter>
  )
}

export default App