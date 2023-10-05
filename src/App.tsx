import './App.css'
import { RouterProvider } from 'react-router-dom'
import Router from './Route/Router'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

function App() {

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <RouterProvider router={Router} />
      </LocalizationProvider>
    </>
  )
}

export default App
