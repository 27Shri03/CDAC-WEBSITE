import Home from "./Components/home";
import Navbar from "./Components/Navbar";
import ASR from "./Components/Intro/ASR";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Container } from '@mui/material';
import FileUploadComponent from "./Components/Shared/file_upload";
import { AppProvider } from "./Context/AppContext";
import Speech2Speech from "./Components/Intro/Speech2Speech";

const App = () => {
  return (
    <AppProvider>
      <Router>
        <Navbar />
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/uploadFiles" element={<FileUploadComponent />} />
            <Route path="/asr" element={<ASR />} />
            <Route path="/text2text" element={<Speech2Speech />} />
          </Routes>
        </Container>
      </Router>
    </AppProvider>
  );
};

export default App;
