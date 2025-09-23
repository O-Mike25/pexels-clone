import AppRoutes from "./components/AppRoutes"
import Footer from "./components/Footer"
import Navbar from "./components/Navbar"

const App = () => {
  return (
    <div className="w-full max-w-[1600px]">
      <Navbar/>
      <AppRoutes/>
      <Footer/>
    </div>
  )
}

export default App
