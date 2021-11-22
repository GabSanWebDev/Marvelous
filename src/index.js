import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import App from "./App";
import About from "./components/About/About";
import Detail from "./components/Detail/Detail";
import Favorites from "./components/Favorites/Favorites";


const rootElement = document.getElementById("root");
render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}/>
      <Route path="/detail/:id" element={<Detail />}/>
      <Route exact path="/favs" element={<Favorites />}/>
      <Route exact path="about" element={<About />}/>
    </Routes>
  </BrowserRouter>,
  rootElement
);


