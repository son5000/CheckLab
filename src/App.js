import "./css/import.css";
import { AuthContextProvider } from "./lib/login/LoginAuth";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginContainer from "./components/LoginContainer.jsx";
import LoginForm from "./pages/login/LoginFrom.jsx";
import DashboardContainer from "./components/DashboardContainer.jsx";
import DashboardHome from "./pages/DashboardHome.jsx";
import DashboardHistory from "./pages/DashboardHistory.jsx";
import DashboardFileUpload from "./pages/DashboardFileUpload.jsx";

function App() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginContainer />}>
            <Route index element={<LoginForm />} />
            <Route path="joinUs" />
          </Route>
          <Route path="/dashboard" element={<DashboardContainer />}>
            <Route index element={<DashboardHome />} />
            <Route path="fileUpload" element={<DashboardFileUpload />} />
            <Route path="history" element={<DashboardHistory />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;
