import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Provider } from './Provider'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Provider children={<></>}/>} path='/'/>
      </Routes>
    </BrowserRouter>
      
  )
}

export default App
