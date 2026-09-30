import { useState, useEffect } from "react";
// React Router v6: Switch -> Routes, exact removed, element prop used
import { HashRouter as Router, Routes, Route } from "react-router-dom";
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
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Home />
                  <About />
                  <Services />
                  <Freelancing isHide={false} />
                  <Projects />
                  <Contact />
                </>
              }
            />
            <Route
              path="/hide"
              element={
                <>
                  <Home />
                  <About />
                  <Services />
                  <Freelancing isHide={true} />
                  <Projects />
                  <Contact />
                </>
              }
            />
          </Routes>
        </Router>
      ) : (
        <LoadingScreen />
      )}
    </ThemeProvider>
  );
}

export default App;
