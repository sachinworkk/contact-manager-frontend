import { Routes, Route } from "react-router-dom";

import LoginPage from "./login/LoginPage";
import ContactDetail from "./contacts/ContactDetail";
import ContactMainPage from "./contacts/ContactMainPage";

import ProtectedRoute from "./commons/ProtectedRoute";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/contacts" element={<ContactMainPage />} />
          <Route path="/contacts/:contactId" element={<ContactDetail />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
