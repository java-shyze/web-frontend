import type { FC } from 'react'
import classes from './App.module.css'
import { Header } from './components/Header'

export const App: FC = () => {
  return (
    <div className={classes.container}>
      <Header />
    </div>
  )
}
