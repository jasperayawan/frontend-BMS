import { Outlet } from 'react-router-dom'
import './App.css'
import Parse from 'parse/dist/parse.min.js';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header';
import { PARSE } from './helper/api';

Parse.initialize(import.meta.env.VITE_APPLICATION_ID);
Parse.serverURL = PARSE;


function App() {

  return (
    <>
      <Header />
      <Toaster />
      <Outlet />
    </>
  )
}

export default App
