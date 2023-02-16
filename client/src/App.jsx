import React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { logo_b } from './assets';
import { Home, CreatePost } from './pages';

const App = () => {
  return (
    <BrowserRouter>
      <header className='w-full flex justify-between items-center bg-black 
      sm:px-8 px-4 py-4'>
        <Link to="/">
          <img src={logo_b} alt="logo" className='w-20 h-14 object-contain' />
        </Link>

        <Link to="/create-post" className='font-inter font-medium bg-[#6469ff] text-white
        px-4 py-2 rounded-md'>
          Create
        </Link>
      </header>
      <main className='sm:p-8 px-4 py-8 w-full min-h-[calc(100vh-73px)]'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/create-post' element={<CreatePost />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
