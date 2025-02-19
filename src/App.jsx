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
import PrivacyTerms from "./Pages/Privacy/PrivacyTerms";
import Advertising from "./Pages/Advertising/Advertising";
import AdChoices from "./Pages/AdChoices/AdChoices";
import BusinessServices from "./Pages/BusinessServices/BusinessServices";
import More from "./Pages/More/More";
import ScrollToTop from "react-scroll-to-top";

function App() {
  return (
    <>
    <BrowserRouter>
    <ScrollToTop
        smooth
        viewBox="0 0 14 14"
        svgPath="M6.62307 0.788849 1.63734 6.14949c-0.30342 0.32624 -0.07027 0.85474 0.37706 0.85474h2.42001v5.86147c0 0.2813 0.22974 0.5093 0.51314 0.5093h4.10517c0.2834 0 0.51314 -0.228 0.51314 -0.5093V7.00423h2.42004c0.4473 0 0.6804 -0.5285 0.377 -0.85473L7.3772 0.788849c-0.20319 -0.218465 -0.55094 -0.218466 -0.75413 0Z"
      />

    <GotoTop/>
      <Header/>
      <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/accessibility' element={<Accessibility/>}/>
      <Route path='/advertising' element={<Advertising/>}/>
      <Route path='/adchoices' element={<AdChoices/>}/>
      <Route path='/business' element={<BusinessServices/>}/>
      <Route path='/more' element={<More/>}/>
      <Route path='/help' element={<HelpCenter/>}/>
      <Route path='/privacy' element={<PrivacyTerms/>}/>
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
