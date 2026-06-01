import { createBrowserRouter } from 'react-router-dom'
import { LoginPage, RegisterPage } from '@/features/auth'

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '/',
    element: <div>Home Page (Coming Soon)</div>,
  },
])
