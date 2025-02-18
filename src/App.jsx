import Header from "./Components/Header/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import Home from "./Pages/Home/Home";
import Network from "./Pages/Network/Network";
import Jobs from "./Pages/Jobs/Jobs";
import Messaging from "./Pages/Messaging/Messaging";
import Notifications from "./Pages/Notifications/Notifications";
import Settings from "./Pages/Settings/Settings";
import Profile from "./Pages/Profile/Profile";
import ForgotPassword from "./Pages/ForgotPassword/ForgotPassword";
import ResetPassword from "./Pages/ResetPassword/ResetPassword";
import Footer from "./Components/Footer/Footer";
import About from "./Pages/About/About";
import GotoTop from "./Components/GotoTop";
import Accessibility from "./Pages/Accessibility/Accessibility";
import HelpCenter from "./Pages/HelpCenter/HelpCenter";

function App() {
  return (
    <>
    <BrowserRouter>
    <GotoTop/>
      <Header/>
      <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/accessibility' element={<Accessibility/>}/>
      <Route path='/help' element={<HelpCenter/>}/>
      <Route path='/network' element={<Network/>}/>
      <Route path='/jobs' element={<Jobs/>}/>
      <Route path='/messaging' element={<Messaging/>}/>
      <Route path='/notifications' element={<Notifications/>}/>
      <Route path='/settings' element={<Settings/>}/>
      <Route path='/profile' element={<Profile/>}/>
      <Route path='/forgot-password' element={<ForgotPassword/>}/>
      <Route path='/reset-password' element={<ResetPassword/>}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
    </>
  );
}

export default App;
