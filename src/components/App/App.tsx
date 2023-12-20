import { useState } from 'react'
import { Outlet } from 'react-router'
import { Link } from 'react-router-dom'
//assets
import dog from '@/assets/dog.jpg'
import Nike from '@/assets/nike.svg'
import snail from '@/assets/snail.png'
//style
import styles from './App.module.scss'
const TODO = () => {
	TODO4()
}
const TODO4 = () => {
	throw new Error('TODO4')
}
const App = () => {

	const [count, setCount] = useState(0)
	__PLATFORM__ === 'desktop'
		? console.log(`this is desktop babe `)
		: console.log('this is mobile honey')

	//we don't need data-testId for production build, so let's filter it when we create a prod build.
	//that's why we create a custom plugin for babel
	return (
		<div data-testId={'App.dataTestId'}>
			<h1 data-testId={'PlatformName.dataTestId'}>
				__PLATFORM__:{__PLATFORM__} {' '}
				__MODE__:{__MODE__}
			</h1>
			<Link to={'/about'}>
				{<img src={snail} alt='' style={{ width: 100 }} />}
			</Link>
			<Link to={'/dog'}>{<img src={dog} alt='' style={{ width: 100 }} />}</Link>
			<br />
			<Link to={'/shop'}>
				<Nike fill='green' width={100} height={100} />
			</Link>
			<h1>{count}</h1>
			<div className={styles.buttonGroup}>
				<button className={styles.button} onClick={() => TODO()}>
					increment
				</button>
			</div>
			<Outlet />
		</div>
	)
}

export default App
