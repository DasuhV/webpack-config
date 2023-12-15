import { useState } from 'react'
//style
import styles from './App.module.scss'
import { Outlet } from 'react-router'
import { Link } from 'react-router-dom'

const App = () => {
	const [count, setCount] = useState(0)

	return (
		<>
			<Link to={'/about'}>about</Link>
			<br />
			<Link to={'/shop'}>shop</Link>
			<h1>{count}</h1>
			<div className={styles.buttonGroup}>
				<button
					className={styles.button}
					onClick={() => setCount(prev => prev + 1)}
				>
					increment
				</button>

			</div>
			<Outlet />
		</>
	)
}

export default App
