import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import BeerList from "./components/BearList/BearList";

import MyRecipes from "./components/MyRecipes/MyRecipes";
import RecipePage from "./components/RecipePage/RecipePage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<BeerList />} />
          <Route path="/recipe/:id" element={<RecipePage />} />
          <Route path="my-recipes" element={<MyRecipes />} />
          <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
