import React from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import 'antd/dist/reset.css'
import '@/App.css'
import Home from '@/pages/Home'
import Layout from '@/pages/Layout'

const App = () => (
  <HashRouter>
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route path='/' index element={<Home />} />
      </Route>
    </Routes>
  </HashRouter>
)

export default App