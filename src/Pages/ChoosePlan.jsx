import pricing from "../Assets/pricing-top.png";
import document from "../Assets/document.svg";
import leaf from "../Assets/leaf.svg";
import handshake from "../Assets/handshake.svg";
import "./ChoosePlan.css";
import Footer from "../Components/Footer";
import React, { useState } from "react";
import Login from "../Components/Login";
import SignUp from "../Components/SignUp";



const ChoosePlan = () => {
  const [selectedPlan, setSelectedPlan] = useState("");
  const [activeFaq, setActiveFaq] = useState(null);
  const [activeIcon, setActiveIcon] = useState(null);
  const [loginOpen, setLoginOpen] = useState(false);
  const [signUpOpen, setSignUpOpen] = useState(false);



const handleToggle = (index) => {
  setActiveFaq(activeFaq === index ? null : index);
  setActiveIcon(activeIcon === index ? null : index);
};


  return (
    <>
    {loginOpen && (
  <Login
    onClose={() => setLoginOpen(false)}
    onSignUp={() => {
      setLoginOpen(false);
      setSignUpOpen(true);
    }}
  />
)}

{signUpOpen && (
  <SignUp
    onClose={() => setSignUpOpen(false)}
    onLogin={() => {
      setSignUpOpen(false);
      setLoginOpen(true);
    }}
  />
)}
    <div className="container__plan">
      <div className="plan__header">
        <h1 className="plan__title"> Get unlimited access to many amazing books to read</h1>
        <p className="plan__pg">Turn ordinary moments into amazing learning opportunities</p>
        <img src={pricing} alt="pricing" className="plan__img" />  
      </div>
      <ul className="plan__list">
        <li className="plan__item">
          <img src={document} alt="document" className="plan__item-img" />
          <p className="plan__item-text"><span className="bold">Key ideas in few min</span> with many books to read</p>
        </li>
        <li className="plan__item">
          <img src={leaf} alt="leaf" className="plan__item-img" />
          <p className="plan__item-text"><span className="bold">3 million</span> people growing with Summarist everyday</p>
        </li>
        <li className="plan__item">
          <img src={handshake} alt="handshake" className="plan__item-img" />
          <p className="plan__item-text"><span className="bold">Precise recommendations</span> collections curated by experts</p>
        </li>
      </ul>
      <div className="plan__choices">
        <h2 className="plan__choices-title">Choose the plan that fits you</h2>
        <ul className="plan__choices-list">
          <li className={`plan__choices-item ${
              selectedPlan === "yearly" ? "plan__choices-item--selected" : ""}`}
              onClick={() => setSelectedPlan("yearly")}>
          <label className="plan__choices-circle">
            <input className="plan__card--dot"
              type="radio"
              name="plan"
              value="yearly"
              checked={selectedPlan === "yearly"}
              onChange={() => setSelectedPlan("yearly")}/>
              </label>
              <div className="plan__choice-option">
                <h3 className="plan__choices-item-title">Premium Plus Yearly</h3>
                <p className="plan__choices-item-price">$99.99/year</p>
                <p className="plan__choices-item-text">7-day free trial included</p>
              </div>
          </li>
          <li className="plan__intercede">
          <hr className="styled-line"></hr>
          <b className="plan__choices-text">or</b>
          <hr className="styled-line"></hr>
          </li>
          <li className={`plan__choices-item ${
            selectedPlan === "monthly" ? "plan__choices-item--selected" : ""}`}
            onClick={() => setSelectedPlan("monthly")}>
          <label className="plan__choices-circle">
            <input className="plan__card--dot"
              type="radio"
              name="plan"
              value="monthly"
              checked={selectedPlan === "monthly"}
              onChange={() => setSelectedPlan("monthly")}/>
              </label>
              <div className="plan__choice-option">
                <h3 className="plan__choices-item-title">Premium Monthly</h3>
                <p className="plan__choices-item-price">$9.99/month</p>
                <p className="plan__choices-item-text">No trial included</p>
              </div>
          
          </li>
        </ul>
        <div class="plan__card--cta">
          <span class="btn--wrapper">
            <button class="plan__choices-btn" onClick={() => setLoginOpen(true)}>
              <span className="plan__choices-btn">
                {selectedPlan === "monthly"
                  ? "Start your first month"
                  : "Start your free 7-day trial"}
              </span>
            </button>
          </span>
          <div class="plan__trial-text">
            {selectedPlan === "monthly"
                  ? "30-day money back guarantee, no questions asked."
                  : "Cancel your trial at any time before it ends, and you won’t be charged."}
            
          </div>
        </div>
      </div>
      <div className="plan__faqs">
        <div className="plan__faqs-question">
          <h2 className="plan__faqs-title">How does the free 7-day trial work?
            <svg onClick={() => handleToggle(0)} stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" className={`accordion__icon ${activeIcon === 0 ? "icon--active" : ""}`}  height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z">
            </path>
            </svg>
          </h2>
          <p className={`plan__faqs-text ${activeFaq === 0 ? "faq--active" : ""}`}>Begin your complimentary 7-day trial with a Summarist annual membership. 
            You are under no obligation to continue your subscription, and you will only be billed when the trial period expires. 
            With Premium access, you can learn at your own pace and as frequently as you desire, 
            and you may terminate your subscription prior to the conclusion of the 7-day free trial.</p>
        </div>
        <div className="plan__faqs-question">
          <h2 className="plan__faqs-title">Can I switch subscriptions from monthly to yearly, or yearly to monthly?
            <svg onClick={() => handleToggle(1)} stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" className={`accordion__icon ${activeIcon === 1 ? "icon--active" : ""}`} height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z">
            </path>
            </svg>
          </h2>
          <p className={`plan__faqs-text ${activeFaq === 1 ? "faq--active" : ""}`}>While an annual plan is active, it is not feasible to switch to a monthly plan. 
            However, once the current month ends, transitioning from a monthly plan to an annual plan is an option.</p>
        </div>
        <div className="plan__faqs-question">
          <h2 className="plan__faqs-title">What's included in the Premium plan?
            <svg onClick={() => handleToggle(2)} stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" className={`accordion__icon ${activeIcon === 2 ? "icon--active" : ""}`}  height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z">
            </path>
            </svg>
          </h2>
          <p className={`plan__faqs-text ${activeFaq === 2 ? "faq--active" : ""}`}>Premium membership provides you with the ultimate Summarist experience, 
            including unrestricted entry to many best-selling books high-quality audio, the ability to download titles for offline reading, 
            and the option to send your reads to your Kindle.</p>
        </div>
        <div className="plan__faqs-question">
          <h2 className="plan__faqs-title">Can I cancel during my trial or subscription?
            <svg onClick={() => handleToggle(3)} stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" className={`accordion__icon ${activeIcon === 3 ? "icon--active" : ""}`}  height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z">
            </path>
            </svg>
          </h2>
          <p className={`plan__faqs-text ${activeFaq === 3 ? "faq--active" : ""}`}>You will not be charged if you cancel your trial before its conclusion. 
            While you will not have complete access to the entire Summarist library, you can still expand your knowledge with one curated book per day.</p>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default ChoosePlan;