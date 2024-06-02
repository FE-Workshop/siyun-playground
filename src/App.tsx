import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import FunnelPattern from './pages/funnel-pattern'
import InfiniteScroll from './pages/infinite-scroll'

const router = createBrowserRouter([
  {
    path: '/',
    element: <FunnelPattern />,
  },
  {
    path: '/funnel-pattern',
    element: <FunnelPattern />,
  },
  {
    path: '/infinite-scroll',
    element: <InfiniteScroll />,
  },
])

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
