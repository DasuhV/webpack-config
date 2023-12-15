import { useState } from 'react'
//style
import styles from './App.module.scss'

const App = () => {
	const [count, setCount] = useState(0)

	return (
		<>
			<h1>{count}</h1>
			<div>
				<button className={styles.button} onClick={() => setCount(prev => prev + 1)}><span>increment</span></button>
				<button onClick={() => setCount(prev => prev - 1)}>decrement</button>
			</div>
		</>
	)
}

export default App
