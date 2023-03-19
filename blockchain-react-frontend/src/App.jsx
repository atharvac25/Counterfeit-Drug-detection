import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddDrugPage from "./pages/add_drug_page";
import DrugDataPage from "./pages/drug_data_page";
import AssignDrugToDistributerPage from "./pages/assign_drug_to_distributer_page";
import AddDistributerPage from "./pages/add_distributer_page";


function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="addDrug" element={<AddDrugPage />} />
          <Route path="drugData" element={<DrugDataPage />} />
          <Route path="assignDrugToDistributer" element={<AssignDrugToDistributerPage />} />
          <Route path="addDistributer" element={<AddDistributerPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
