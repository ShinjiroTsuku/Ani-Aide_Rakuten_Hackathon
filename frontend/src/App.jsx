import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ApiExample from './components/ApiExample.jsx'
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
} from 'react-router-dom'

// Define Home Page separately
function HomePage() {
  const [count, setCount] = useState(0)
  const [showApiExample, setShowApiExample] = useState(false)
  const navigate = useNavigate()

  const handleButtonHisaisyaClick = () => {
    alert('Button A clicked!')
  }

  const handleButtonShiensyaClick = () => {
    navigate('/login')
  }

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React + Axios</h1>

      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>

        <button onClick={handleButtonHisaisyaClick}>被害者</button>
        <button onClick={handleButtonShiensyaClick}>支援者</button>

        <button
          onClick={() => setShowApiExample(!showApiExample)}
          style={{
            marginTop: '20px',
            padding: '10px 20px',
            backgroundColor: '#646cff',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
          }}
        >
          {showApiExample ? 'Hide' : 'Show'} Axios API Example
        </button>
      </div>

      {showApiExample && <ApiExample />}

      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

// Dummy Login Page
function LoginPage() {
  return <h2>Login Page</h2>
}

// App component with router
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
