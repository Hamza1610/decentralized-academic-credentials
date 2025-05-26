// import { useState } from 'react';

// function App() {

//   const [message, setMessage] = useState('Hello!');

//   return (
//     <div className='main'>
//       <h2>Welcome To The Internet Computer</h2>
//       <div className='content'>
//         <p>Say Hello</p>
//         <button onClick = { () => alert(message) }>Test</button>
//       </div>
//     </div>
//   );
// }

// export default App;



// 


















import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import StudentDashboard from "./pages/dashboard/StudentDashboard";
import InstitutionDashboard from "./pages/dashboard/InstitutionDashboard";
import CredentialVerify from "./pages/credentials/CredentialVerify";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "./context/AuthContext";

// Student pages
import StudentCredentials from "./pages/dashboard/student/StudentCredentials";
import ShareCredential from "./pages/dashboard/student/ShareCredential";
import RequestCredential from "./pages/dashboard/student/RequestCredential";
import StudentProfile from "./pages/dashboard/student/StudentProfile";

// Institution pages
import IssueCredential from "./pages/dashboard/institution/IssueCredential";
import AddStudent from "./pages/dashboard/institution/AddStudent";
import Students from "./pages/dashboard/institution/Students";
import Templates from "./pages/dashboard/institution/Templates";

// Shared pages
import Settings from "./pages/dashboard/Settings";
import Help from "./pages/dashboard/Help";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/register" element={<Register />} />
            
            {/* Student routes */}
            <Route path="/dashboard/student" element={<StudentDashboard />} />
            <Route path="/dashboard/student/credentials" element={<StudentCredentials />} />
            <Route path="/dashboard/student/share" element={<ShareCredential />} />
            <Route path="/dashboard/student/request" element={<RequestCredential />} />
            <Route path="/dashboard/student/profile" element={<StudentProfile />} />
            
            {/* Institution routes */}
            <Route path="/dashboard/institution" element={<InstitutionDashboard />} />
            <Route path="/dashboard/institution/issue" element={<IssueCredential />} />
            <Route path="/dashboard/institution/students" element={<Students />} />
            <Route path="/dashboard/institution/students/add" element={<AddStudent />} />
            <Route path="/dashboard/institution/templates" element={<Templates />} />
            
            {/* Shared routes */}
            <Route path="/dashboard/settings" element={<Settings />} />
            <Route path="/dashboard/help" element={<Help />} />
            
            <Route path="/credentials/verify" element={<CredentialVerify />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
