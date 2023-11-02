import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./pages";
import Cities from "./components/Cities";
import ViewCityInfo from "./pages/cityInfo";
import NewCity from "./pages/newCity";
import Prices from "./pages/prices";
import NewPrices from "./pages/prices/newPrices";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Layout />}>
          <Route path="/" element={<Cities />} />
          <Route path="/prices" element={<Prices />} />
          <Route path="/newPrices" element={<NewPrices />} />
        </Route>
        <Route path="/suburbs/:id" element={<ViewCityInfo />} />
        <Route path="/newCity" element={<NewCity />} />
      </Routes>
    </Router>
  );
}

export default App;
