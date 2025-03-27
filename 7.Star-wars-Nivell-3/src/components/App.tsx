// import { useState } from 'react'
import ProtectedRoutes from './utils/ProtectedRoutes.tsx';
// import '../index.css';
import Layout from './Layout/Layout'
import Home from './Home.tsx';
import Starships from './Starships';
import { Routes, Route } from "react-router-dom";
import StarshipDetails from './Details/StarshipDetails.tsx';
import Email from './Email.tsx';


function App() {

  return (
  <div className="">
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="email" element={<Email />}/>
        <Route element={<ProtectedRoutes />}>
          <Route path='starships' element={<Starships />} />
          <Route path="starships/:name" element={<StarshipDetails />}/>
        </Route>
      </Route>
    </Routes>
  </div> 
  )
}

export default App;
