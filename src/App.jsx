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
import AudienceInsights from "./Pages/Advertising/Audience/AudienceInsights";
import BillingPayments from "./Pages/Advertising/Billing/BillingPayments";
import Loader from "./Components/Loader/Loader";
import { useEffect, useState } from "react";
import gifjob from "../src/assets/our-time-is-now-our-time-is-now-for-jobs.gif"



function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
    setIsLoading(false);
    }, 2000);
    }, []);
  return (
    isLoading ?
    <Loader title="Welcome to World Of Jobs" src={gifjob} alt=""/>:
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
      <Route path='/audience-insights' element={<AudienceInsights/>}/>
      <Route path='/billing' element={<BillingPayments/>}/>
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
