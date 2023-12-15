import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './components/App/App'
import { LazyShop } from '@/pages/shop/Shop.lazy'
import { LazyAbout } from '@/pages/about/About.lazy'
import { Suspense } from 'react'

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{
				path: '/about',
				element: <Suspense fallback={'loading...' }> <LazyAbout /> </Suspense> ,
			},
			{
				path: '/shop',
				element:<Suspense fallback={'loading...' }> <LazyShop /> </Suspense>,
			},
		],
	},
])

createRoot(document.getElementById('root')).render(
	<RouterProvider router={router} />
)