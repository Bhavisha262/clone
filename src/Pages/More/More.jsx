import React from "react";
import "./More.scss";

const moreServices = [
  {
    title: "LinkedIn Talent Insights",
    description: "Get data-driven insights to make smarter hiring decisions.",
    link: "https://business.linkedin.com/talent-solutions/talent-insights",
  },
  {
    title: "LinkedIn Marketing Solutions",
    description: "Grow your brand with LinkedIn’s powerful ad tools.",
    link: "https://business.linkedin.com/marketing-solutions",
  },
  {
    title: "LinkedIn Sales Solutions",
    description: "Find and engage with the right buyers using Sales Navigator.",
    link: "https://business.linkedin.com/sales-solutions",
  },
  {
    title: "LinkedIn Learning",
    description: "Upskill with expert-led video courses for professional growth.",
    link: "https://www.linkedin.com/learning/",
  },
  {
    title: "LinkedIn Corporate",
    description: "Explore company news, culture, and leadership updates.",
    link: "https://about.linkedin.com/",
  },
  {
    title: "LinkedIn Ads",
    description: "Promote your business with targeted advertising campaigns.",
    link: "https://www.linkedin.com/ad/start/",
  },
  {
    title: "LinkedIn Profinder",
    description: "Hire top freelancers for your business projects.",
    link: "https://www.linkedin.com/profinder",
  },
  {
    title: "LinkedIn Events",
    description: "Host and attend professional events and webinars.",
    link: "https://www.linkedin.com/events/",
  },
  {
    title: "LinkedIn Groups",
    description: "Join communities of professionals in your industry.",
    link: "https://www.linkedin.com/groups/",
  },
];

const More = () => {
  return (
    <div className="more-section">
      <h2 className="more-title">More</h2>
      <div className="more-container">
        {moreServices.map((service, index) => (
          <div key={index} className="more-item">
            <a href={service.link} target="_blank" rel="noopener noreferrer">
              <h3>{service.title}</h3>
            </a>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default More;
