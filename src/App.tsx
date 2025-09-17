import { useState } from 'react'
import Header from './components/layout/Header'
import Sidebar from './components/layout/Sidebar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Sidebar>
        <Header />
      </Sidebar>
    </>
  )
}

export default App
