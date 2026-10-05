import { Navigate, Outlet } from 'react-router-dom'
import { useAppSelector } from '../../store/hooks'

export function PrivateRoute() {
  const token = useAppSelector((state) => state.auth.token)
  if (!token) {
    return <Navigate to="/login" replace />
  }
  return <Outlet />
}

export function AdminRoute() {
  const user = useAppSelector((state) => state.auth.user)
  if (user?.role !== 'ADMIN') {
    return <Navigate to="/" replace />
  }
  return <Outlet />
}
