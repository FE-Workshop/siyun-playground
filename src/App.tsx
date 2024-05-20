import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import FunnelPattern from './pages/funnel-pattern'

const router = createBrowserRouter([
  {
    path: '/',
    element: <FunnelPattern />,
  },
])

function App() {
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  )
}

export default App
