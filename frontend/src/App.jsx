import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import Home from './pages/Home.jsx'
import Search from './pages/Search.jsx'
import Explorer from './pages/Explorer.jsx'
import PaletteDetail from './pages/PaletteDetail.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Profile from './pages/Profile.jsx'
import Admin from './pages/Admin.jsx'

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth()
  if (loading) return <div>Cargando...</div>
  return user ? children : <Navigate to="/login" />
}

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth()
  if (loading) return <div>Cargando...</div>
  return user?.rol === 'admin' ? children : <Navigate to="/" />
}

const App = () => {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/explore" element={<Explorer />} />
        <Route path="/palette/:id" element={<PaletteDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        } />
        <Route path="/admin" element={
          <AdminRoute>
            <Admin />
          </AdminRoute>
        } />
      </Routes>
  )
}

export default App