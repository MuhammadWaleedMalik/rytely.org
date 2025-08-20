import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Privacy from './pages/Privacy';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import Cookies from './pages/Cookies';
import Terms from './pages/Terms';

import FAQs from './pages/Faqs';


import Accessanduse from './pages/Accessanduse';
import Team from './pages/Teams';
import JoinTeams from './pages/Services/JoinTeams';
import Fans from './pages/Services/Fans';
import AthleteQA from './pages/Services/AthleteQA';
import LiveGames from './pages/Services/LiveGames';
import SportsQA from './pages/Services/SportsQA';




function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
                <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                
                <Route path="/blogs" element={<Blog />} />
             
                <Route path="/preservation" element={<Privacy />} />

                <Route path="/access-/-use" element={<Accessanduse />} />
                
                
                <Route path="/contact-us" element={<Contact />} />
             
                <Route path="/faqs" element={<FAQs />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/cookies" element={<Cookies />} />
                <Route path="/teammembers" element={<Team />} />
               
               
             
               
                <Route path="/teams" element={ <ProtectedRoute> <JoinTeams/> </ProtectedRoute>} />
                <Route path="/fans" element={ <ProtectedRoute> <Fans/> </ProtectedRoute>} />
                <Route path="/titan-gps" element={ <ProtectedRoute> <AthleteQA/> </ProtectedRoute>} />
                <Route path="/live-games" element={ <ProtectedRoute> <LiveGames /> </ProtectedRoute>} />
                <Route path="/analytics" element={ <ProtectedRoute> <SportsQA/> </ProtectedRoute>} />
    
    




            
                

                </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;