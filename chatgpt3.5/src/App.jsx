import AISpeack from "./pages/aiSpeack/AISpeack"
import Painting from "./pages/painting/Painting"
import NotFound from './pages/404/NotFound'
import { HashRouter, BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path='/' element={<Navigate to='/speack' />}></Route>
        <Route path='/painting' element={< Painting />}></Route>
        <Route path='/speack' element={<AISpeack />}></Route>
        <Route path='*' element={<NotFound />}></Route>
      </Routes>
    </HashRouter>
  )
}
export default App
