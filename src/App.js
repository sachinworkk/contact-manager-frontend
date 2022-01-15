import { Routes, Route } from "react-router-dom";

import ContactDetail from "./contacts/ContactDetail";
import ContactMainPage from "./contacts/ContactMainPage";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/contacts" element={<ContactMainPage />} />
        <Route path="/contacts/:contactId" element={<ContactDetail />} />
      </Routes>
    </div>
  );
}

export default App;
