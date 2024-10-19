import {BrowserRouter, Route, Routes} from "react-router-dom";
import Navbar from "./components/Navbar";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import Sidebar from "./components/Sidebar";
import Homepage from "./pages/Homepage";
import CreatePostPage from "./pages/CreatePostPage";
import VerificationPage from "./pages/VerificationPage";

function App() {
  const noSidebarRoutes = ["/login", "/register", "/verification"];
  const hasBorderTop = !noSidebarRoutes.includes(location.pathname);

  return (
    <div>
    <Navbar />
    <div style={{ display: "flex" }}>
    {!noSidebarRoutes.includes(location.pathname) && <Sidebar />}
    <div
        style={{
          flex: 1,
          borderTop: hasBorderTop ? "2px solid #ccc" : "none"
        }}
      >
      <Routes>
        <Route path='/register' element={<SignupPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/verification' element={<VerificationPage />} />
        <Route path='/' element={<Homepage />} />
        <Route path='/create' element={<CreatePostPage />} />
      </Routes>
    </div>
  </div>
  </div>
  )
}

export default App
