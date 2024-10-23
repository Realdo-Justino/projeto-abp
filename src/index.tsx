import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/login/Login';
import Chat from './pages/chat/Chat';

import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
          <Route path = '/' element = {<Login/>}/>
          <Route path = 'chat' element = {<Chat/>}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
