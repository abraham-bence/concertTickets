import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css";
import './index.css'
import Home from './pages/home';
import AddTicket from './pages/addTicket';


const router = createBrowserRouter([
  {
    path: '/home',
    element: <Home/>
  },
  {
    path: '/addTicket',
    element : <AddTicket/>
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
