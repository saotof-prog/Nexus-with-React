import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import Stats from './components/Stats'
import Pricing from './components/Pricing'
import CTA from './components/CTA'
import Footer from './components/Footer'
import Verify from './Verify'

function App() {
  const [showVerify, setShowVerify] = useState(false)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.has('token')) {
      setShowVerify(true)
    }
  }, [])

  if (showVerify) {
    return <Verify />
  }

  return (
    <div className="scanlines relative min-h-svh">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Stats />
        <Pricing />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}

export default App
