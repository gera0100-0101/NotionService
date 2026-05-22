import './App.css'
import { DataTime } from './DataTime';
import NotionPage from './Pages/NotionPage'
import Login from './Pages/Login';
import Register from './Pages/Register';
import Logout from './Pages/Logout';
import Calendar from './Pages/Calendar';
import AI_Page from './Pages/AI_Page';
import Support from './Pages/Support';
import ProtectedRoute from './components/ProtectedRoute';
import { Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <DataTime>
      <Routes>
        <Route path="/" element={<ProtectedRoute><NotionPage /></ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<ProtectedRoute><Logout /></ProtectedRoute>} />
        <Route path="/calendar" element={<ProtectedRoute><Calendar /></ProtectedRoute>} />
        <Route path="/ai" element={<ProtectedRoute><AI_Page /></ProtectedRoute>} />
        <Route path="/support" element={<ProtectedRoute><Support /></ProtectedRoute>} />
      </Routes>
    </DataTime>
  )
}

export default App;