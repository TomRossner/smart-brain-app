// IMPORTS
import Nav from "./components/Nav";
import Home from "./components/Home";
import Footer from "./components/Footer";


// STYLES
import "./styles/global-styles.scss";
import "./styles/nav.scss";
import "./styles/home.scss";
import "./styles/footer.scss";

import {AppContainer} from "./styles/styledComponents/MainStyles";

const App = () => {

  return (
    <AppContainer>
        <Nav/>
        <Home/>
        <Footer/>
    </AppContainer>
  )
}

export default App;