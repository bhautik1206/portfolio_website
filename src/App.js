import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Contact from "./views/Contact";
import Navbar from "./components/Navbar";
import About from "./views/About";
import Home from "./views/Home";
import Services from "./views/Services";
import Projects from "./views/Projects";
import LoadingScreen from "./components/LoadingScreen";
import Freelancing from './views/Freelancing';
import { ThemeProvider } from "./themeProvider";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <ThemeProvider>
      {!loading ? (
        <Router>
          <Navbar />
          <Switch>
            <Route exact path="/">
              <Home />
              <About />
              <Services />
              <Freelancing />
              <Projects />
              <Contact />
            </Route>

            <Route exact path="/hide">
              <Home />
              <About />
              <Services />
              <Freelancing />
              <Projects />
              <Contact />
            </Route>
          </Switch>
        </Router>
      ) : (
        <LoadingScreen />
      )}
    </ThemeProvider>
  );
}

export default App;
