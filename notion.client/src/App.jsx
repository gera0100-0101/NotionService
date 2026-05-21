import './App.css'
import { DataTime } from './DataTime';
import NotionPage from './Pages/NotionPage'
import Login from './Pages/Login';
import Register from './Pages/Register';
import ProtectedRoute from './components/ProtectedRoute';
import { Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <DataTime>
      <Routes>
        <Route path="/" element={<ProtectedRoute><NotionPage /></ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </DataTime>
  )
}

export default App;