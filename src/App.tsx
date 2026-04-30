import { BrowserRouter, Routes, Route } from 'react-router-dom'
import UsersList from './page/UsersList'
import UserDetails from './page/UserDetails'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UsersList />} />
        <Route path="/users/:id" element={<UserDetails />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
