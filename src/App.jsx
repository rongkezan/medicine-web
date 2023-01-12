import React from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import 'antd/dist/reset.css'
import '@/App.css'
import Home from '@/pages/Home'
import Layout from '@/pages/Layout'
import Statistic from '@/pages/Statistic'
import Config from '@/pages/Config'

const App = () => (
  <HashRouter>
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route path='/' index element={<Home />} />
        <Route path='/statistic' element={<Statistic />} />
        <Route path='/config' element={<Config />} />
      </Route>
    </Routes>
  </HashRouter>
)

export default App