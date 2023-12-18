import { useState } from 'react'
//style
import Nike from '@/assets/nike.svg'
import snail from '@/assets/snail.png'
import { Outlet } from 'react-router'
import { Link } from 'react-router-dom'
import styles from './App.module.scss'
const App = () => {
	const [count, setCount] = useState(0)

	return (
		<>
			<Link to={'/about'}>
				{<img src={snail} alt='' style={{ width: 100 }} />}
			</Link>
			<br />
			<Link to={'/shop'}>
				<Nike color='red' width={100} height={100} />
			</Link>

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
