import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './components/HomePage';
import MySongsPage from './components/MySongsPage';
import Navbar from './components/Navbar';
import { NotificationProvider } from './components/NotificationContext';
import MyPlaylistsPage from './components/MyPlaylistsPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage/>,
  },
  {
    path: '/index',
    element: <HomePage/>,
  },
  {
    path: '/musicas/minhasMusicas',
    element: <MySongsPage/>,
  },
  { 
    path: '/playlists/minhasPlaylists',
    element: <MyPlaylistsPage/>,
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <NotificationProvider>
      <Navbar/>
      <RouterProvider router={router}/>
    </NotificationProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
