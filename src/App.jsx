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
import CreateAd from "./Pages/Advertising/CreateAd/CreateAd";
import CampaignManager from "./Pages/Advertising/Campaign/CampaignManager";



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
      <Route path='/advertising' element={<Advertising/>}/>
      <Route path='/adchoices' element={<AdChoices/>}/>
      <Route path='/create-ad' element={<CreateAd/>}/>
      <Route path='/campaign-manager' element={<CampaignManager/>}/>
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
