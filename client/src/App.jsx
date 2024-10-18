import {BrowserRouter, Route, Routes} from "react-router-dom";
import Navbar from "./components/Navbar";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import Sidebar from "./components/Sidebar";
import CreatePostPage from "./pages/CreatePostPage";

function App() {

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/register' element={<SignupPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/create' element={<CreatePostPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
