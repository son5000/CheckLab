import "./css/import.css";
import { AuthContextProvider } from "./lib/login/loginAuth";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginContainer from "./components/LoginContainer.jsx";
import LoginForm from "./pages/login/LoginFrom.jsx";
import DashboardContainer from "./components/DashboardContainer.jsx";
import DashboardHome from "./pages/dashboard/Home.jsx";
import DashboardHistory from "./pages/dashboard/History.jsx";
import DashboardFileUpload from "./pages/dashboard/FileUpload.jsx";

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
