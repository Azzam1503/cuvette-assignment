import {BrowserRouter, Route, Routes} from "react-router-dom";
import Navbar from "./components/Navbar";
import SignupPage from "./pages/SignupPage";

function App() {

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/register' element={<SignupPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
