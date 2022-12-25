// IMPORTS
import Nav from "./components/Nav";
import Home from "./components/Home";
import Footer from "./components/Footer";
import SignIn from "./components/SignIn";
import Logout from "./components/Logout";

import { Route, Routes } from "react-router-dom";

// STYLES
import "./styles/global-styles.scss";
import "./styles/nav.scss";
import "./styles/home.scss";
import "./styles/footer.scss";
import "./styles/auth.scss";
import Register from "./components/Register";
import { useContext } from "react";
import { AuthContext } from "./contexts/AuthContext";


const App = () => {
  const {currentUser} = useContext(AuthContext);
  return (
    <div className="app-container">
        <Nav/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          {!currentUser
          ? (
            <>
              <Route path="sign-in" element={<SignIn/>}/>
              <Route path="register" element={<Register/>}/>
            </>
          ) : (
            <>  
              <Route path="logout" element={<Logout/>}/>
            </>
          )}
        </Routes>
        <div className="space"></div>
        <Footer/>
    </div>
  )
}

export default App;