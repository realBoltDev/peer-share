import { BrowserRouter, Routes, Route } from 'react-router-dom'
import BaseLayout from '@/layouts/BaseLayout'
import Home from '@/pages/Home'
import Share from '@/pages/Share'
import Receive from '@/pages/Connect'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<BaseLayout />}>
          <Route path='/' element={<Home />} />
          <Route path='/share' element={<Share />} />
          <Route path='/connect' element={<Share />} />
          <Route path='/about' element={<Share />} />
          <Route path='/receive/:sessionId' element={<Receive />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
