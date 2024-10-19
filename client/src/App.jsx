import {Navigate, Route, Routes} from "react-router-dom";
import Navbar from "./components/Navbar";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import Sidebar from "./components/Sidebar";
import Homepage from "./pages/Homepage";
import CreatePostPage from "./pages/CreatePostPage";
import VerificationPage from "./pages/VerificationPage";
import UserContext from "./context/UserContext";
import { useContext } from "react";


function App() {
  const noSidebarRoutes = ["/login", "/register", "/verification"];
  const hasBorderTop = !noSidebarRoutes.includes(location.pathname);
  const {user} = useContext(UserContext);

  return (
    <div>
    <Navbar />
    <div style={{ display: "flex" }}>
    {user && <Sidebar />}
      <Routes>
        <Route path='/register' element={<SignupPage />} />
        <Route path='/login' element={user ? <Navigate to={"/"} /> : <LoginPage />} />
        <Route path='/verification' element={user ? <Navigate to={"/"} /> : <VerificationPage />} />
        <Route path='/' element={user ? <Homepage /> : <Navigate to={"/login"} /> } />
        <Route path='/create' element={user ? <CreatePostPage /> : <Navigate to={"/login"} /> } />
      </Routes>
    </div>
  </div>
  )
}

export default App
