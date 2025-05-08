import { Routes , Route } from "react-router-dom";
import HomePage from "./pages/homepage";
import About from "./pages/About";
import Product from "./pages/Product";
import NavbarComponent from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
      <div>
        <NavbarComponent/>
        <Routes>
          <Route path="" element={<HomePage/>} />
          <Route path="/About" element={<About/>} />
          <Route path="/Product" element={<Product/>} />
        </Routes>
        <Footer/>
      </div>
  )
}

export default App
