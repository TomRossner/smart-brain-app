// IMPORTS
import Nav from "./components/Nav";
import Home from "./components/Home";
import Footer from "./components/Footer";
import SignIn from "./components/SignIn";
import Logout from "./components/Logout";
import Register from "./components/Register";
import Profile from "./components/Profile";

import { AuthContext } from "./contexts/AuthContext";
import { useContext } from "react";
import { Route, Routes } from "react-router-dom";

// STYLES
import "./styles/global-styles.scss";
import "./styles/nav.scss";
import "./styles/home.scss";
import "./styles/footer.scss";
import "./styles/auth.scss";
import "./styles/bounding-box.scss";
import "./styles/profile.scss";
import "./styles/animations.scss";
import "./styles/media-queries.scss";


const App = () => {
  const {currentUser} = useContext(AuthContext);
  return (
    <div className="app-container">
        <Nav/>
        <Routes>
          <Route path="/smart-brain-app" element={<Home/>}/>
          {!currentUser
          ? (
            <>
              <Route path="sign-in" element={<SignIn/>}/>
              <Route path="register" element={<Register/>}/>
            </>
          ) : (
            <>  
              <Route path="profile" element={<Profile/>}></Route>
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