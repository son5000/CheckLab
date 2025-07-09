import "./css/import.css";
import { AuthContextProvider } from "./lib/login/loginAuth";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginContainer from "./components/LoginContainer.jsx";
import LoginForm from "./pages/login/LoginFrom.jsx";
import Container from "./components/Container.jsx";
import History from "./pages/project/History.jsx";
import FileUpload from "./pages/project/FileUpload.jsx";
import FileDetail from "./components/project/history/FileDetail.jsx";
import Overview from "./pages/project/Overview.jsx";

function App() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginContainer />}>
            <Route index element={<LoginForm />} />
            <Route path="joinUs" />
          </Route>
          <Route path="/project" element={<Container />}>
            <Route index element={<Overview />} />
            <Route path="fileUpload" element={<FileUpload />} />
            <Route path="history" element={<History />} />
            <Route path="history/:id" element={<FileDetail />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;
