import AppRoutes from "./components/AppRoutes"
import Footer from "./components/Footer"
import Navbar from "./components/Navbar"

const App = () => {
  return (
    <div className="w-full px-7 md:px-16 max-w-[1600px]">
      <Navbar/>
      <AppRoutes/>
      <Footer/>
    </div>
  )
}

export default App
