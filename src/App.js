import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./pages";
import Cities from "./components/Cities";
import ViewCityInfo from "./pages/cityInfo";
import NewCity from "./pages/newCity";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Layout />}>
          <Route path="/" element={<Cities />} />
        </Route>
        <Route path="/suburbs/:id" element={<ViewCityInfo />} />
        <Route path="/newCity" element={<NewCity />} />
        <Route path="/" />
      </Routes>
    </Router>
  );
}

export default App;
