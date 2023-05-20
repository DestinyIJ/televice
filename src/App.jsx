import 'swiper/swiper.min.css'
import './assets/boxicons-2.0.7/css/boxicons.min.css'
import './App.scss'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './components'




function App() {

  return (
    <>
      <Routes>
        <Route path='/signin' element={<>sign in</>} />
        <Route path='/signup' element={<>sign up</>} />
        <Route path='/forgot-password' element={<>forgot-password</>} />
        <Route path='/reset-password' element={<>reset-password</>} />

        <Route path='/*' 
          element={<Layout />}
        />

      </Routes>
    </>
  )
}

export default App
