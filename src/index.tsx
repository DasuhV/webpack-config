import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './components/App/App'
import { LazyShop } from '@/pages/shop/Shop.lazy'
import { LazyAbout } from '@/pages/about/About.lazy'
import { Suspense } from 'react'
import { LazyDog } from './pages/dog/Dog.lazy'

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
			{
				path: '/dog',
				element:<Suspense fallback={'loading...' }> <LazyDog /> </Suspense>,
			},
		],
	},
])

createRoot(document.getElementById('root')).render(
	<RouterProvider router={router} />
)