import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import NotMobile from "./components/NotMobile";
import { AppProvider } from "./context/AppProvider";
import Login from "./components/Login";
import ChatMembers from "./components/ChatMembers";
import ChatConversation from "./components/ChatConversation";
import Notifications from "./components/Notifications";
import Profile from "./components/Profile";
import bgImg from './assets/images/screen-bg.png';
import Search from "./components/Search";
import AdminLogin from "./components/admin/AdminLogin";
import AddUser from "./components/admin/AddUser";
import NotFound from "./components/NotFound";

function App() {
  const [isMobile, setIsMobile] = useState(false);
  const [session, setSession] = useState(true);
  const [role, setRole] = useState('user');

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <AppProvider>
      <div
        style={{
          backgroundImage: `url(${bgImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
        }}
      >
        <Router>
          <>
            {isMobile ? (
              // Mobile View
              session ? (
                role === "user" ? (
                  <Routes>
                    <Route path="/chat-members/:userID" element={<ChatMembers />} />
                    <Route path="/chats/:sid/:rid" element={<ChatConversation />} />
                    <Route path="/notifications" element={<Notifications />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                ) : (
                  // If session is true but role is not user, show 404
                  <Routes>
                    <Route path="/" element={<Login />} /> 
                    <Route path="*" element={<NotFound />} /> 
                  </Routes>
                )
              ) : (
                // If session is false, show Header for mobile users
                <Routes>
                  <Route path="/" element={<Login />} />
                  <Route path="*" element={<NotFound />} /> 
                </Routes>
              )
            ) : (
              // Not Mobile View (Desktop or large screens)
              session ? (
                role === "admin" ? (
                  <Routes>
                    <Route path="/" element={<AddUser />} />
                    <Route path="*" element={<NotFound />} /> {/* 404 for other roles in admin view */}
                  </Routes>
                ) : (
                  // If session is true and role is not admin, show 404
                  <Routes>
                    <Route path="/" element={<AdminLogin />} />
                    <Route path="*" element={<NotFound />} /> 
                  </Routes>
                )
              ) : (
                // If session is false, show AdminLogin
                <Routes>
                  <Route path="/" element={<AdminLogin />} />
                  <Route path="*" element={<NotFound />} /> {/* 404 for session false */}
                </Routes>
              )
            )}
          </>
        </Router>
      </div>
    </AppProvider>
  );
}

export default App;
