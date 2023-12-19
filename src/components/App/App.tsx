import { useState } from 'react'
import { Outlet } from 'react-router'
import { Link } from 'react-router-dom'
//assets
import Nike from '@/assets/nike.svg'
import snail from '@/assets/snail.png'
//style
import styles from './App.module.scss'

const test = (a: number, b: number) => a + b

const App = () => {
	const [count, setCount] = useState(0)
	if (__PLATFORM__ === 'desktop') {
		console.log(`this is desktop ${test(1,3)} you babe `);
		
	}
	if (__PLATFORM__ === 'mobile') {
		console.log('this is mobile honey')
		
	}
	
	return (
		<>
			<h1> __PLATFORM__:{__PLATFORM__}</h1>
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
