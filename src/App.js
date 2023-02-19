import './App.css'
import Sidebar from './Components/Sidebar'
import Training from './Components/Training'
import Customers from './Components/Customers'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Calendar from './Components/Calendar'
import Chart from './Components/Chart'

export default function App() {
  return (
    <div>
      <h1>Welcome</h1>
      <BrowserRouter>
        <Sidebar>
          <Routes>
            <Route path="/customers" element={<Customers />} > </Route>
            <Route path="/trainings" element={<Training />} >  </Route>
            <Route path="/calendar" element={<Calendar />} >  </Route>
            <Route path="/barchart" element={<Chart />} >  </Route>
          </Routes>
        </Sidebar>
      </BrowserRouter>
    </div>
  )
}
