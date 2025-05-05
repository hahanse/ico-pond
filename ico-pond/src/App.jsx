import { Routes , Route } from "react-router-dom";
import HomePage from "./pages/homepage";
import NavbarComponent from "./components/Navbar";

function App() {
  return (
      <div>
        <NavbarComponent/>
        <Routes>
          <Route path="" element={<HomePage/>} />
        </Routes>
      </div>
  )
}

export default App
