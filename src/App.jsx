import { Outlet } from 'react-router-dom'
import './App.css'
import Parse from 'parse/dist/parse.min.js';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header';

Parse.initialize('123','1234');
Parse.serverURL = 'http://localhost:8001/parse';


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
