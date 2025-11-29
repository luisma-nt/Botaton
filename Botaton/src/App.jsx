import { useState } from 'react'
import NavBar from './componentes/NavBar'
import Footer from './componentes/Footer'
import GraficosApex from './componentes/Graficos'
import GestionVoluntarios from './componentes/GestionVoluntarios'



function App() {
  const [count, setCount] = useState(0)

  return (
<>
  <NavBar/>
  <GraficosApex/>
  <GestionVoluntarios/>
  <Footer/>
</>
  )
}

export default App
