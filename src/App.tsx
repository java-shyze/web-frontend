import { type FC } from 'react'
import { Route, Routes } from 'react-router'
import { MainPage } from './pages/MainPage'
import { AnalyticsPage } from './pages/AnalyticsPage'
import classes from './App.module.css'

export const App: FC = () => (
  <div className={classes.container}>
    <Routes>
      <Route index element={<MainPage />} />
      <Route path="link/:id" element={<AnalyticsPage />} />
    </Routes>
  </div>
)
