import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AdminRoute, PrivateRoute } from './components/PrivateRoute'
import { Toast } from './components/Toast'
import { AdminPage } from './pages/Admin'
import { DashboardPage } from './pages/Dashboard'
import { LoginPage } from './pages/Login'
import { RegisterPage } from './pages/Register'

function App() {
  return (
    <BrowserRouter>
      <Toast />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<DashboardPage />} />
          <Route element={<AdminRoute />}>
            <Route path="/admin" element={<AdminPage />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
