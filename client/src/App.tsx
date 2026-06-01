import { RouterProvider } from 'react-router-dom'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { AntdConfigProvider } from './config/antd'
import { router } from './config/routes'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AntdConfigProvider>
        <RouterProvider router={router} />
      </AntdConfigProvider>
    </QueryClientProvider>
  )
}

export default App
