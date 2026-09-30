import "./Footer.css";

const Footer = () => {

  return (
    <>
   <section id="footer">
      <div className="container__footer">
        <div className="row__footer">
          <div className="footer__top--wrapper">
            <div className="footer__block">
              <div className="footer__link--title">Actions</div>
              <div>
                <div className="footer__link--wrapper">
                  <div className="footer__link">Summarist Magazine</div>
                </div>
                <div className="footer__link--wrapper">
                  <div className="footer__link">Cancel Subscription</div>
                </div>
                <div className="footer__link--wrapper">
                  <div className="footer__link">Help</div>
                </div>
                <div className="footer__link--wrapper">
                  <div className="footer__link">Contact us</div>
                </div>
              </div>
            </div>
            <div className="footer__block">
              <div className="footer__link--title">Useful Links</div>
              <div>
                <div className="footer__link--wrapper">
                  <div className="footer__link">Pricing</div>
                </div>
                <div className="footer__link--wrapper">
                  <div className="footer__link">Summarist Business</div>
                </div>
                <div className="footer__link--wrapper">
                  <div className="footer__link">Gift Cards</div>
                </div>
                <div className="footer__link--wrapper">
                  <div className="footer__link">Authors & Publishers</div>
                </div>
              </div>
            </div>
            <div className="footer__block">
              <div className="footer__link--title">Company</div>
              <div>
                <div className="footer__link--wrapper">
                  <div className="footer__link">About</div>
                </div>
                <div className="footer__link--wrapper">
                  <div className="footer__link">Careers</div>
                </div>
                <div className="footer__link--wrapper">
                  <div className="footer__link">Partners</div>
                </div>
                <div className="footer__link--wrapper">
                  <div className="footer__link">Code of Conduct</div>
                </div>
              </div>
            </div>
            <div className="footer__block">
              <div className="footer__link--title">Other</div>
              <div>
                <div className="footer__link--wrapper">
                  <div className="footer__link">Sitemap</div>
                </div>
                <div className="footer__link--wrapper">
                  <div className="footer__link">Legal Notice</div>
                </div>
                <div className="footer__link--wrapper">
                  <div className="footer__link">Terms of Service</div>
                </div>
                <div className="footer__link--wrapper">
                  <div className="footer__link">Privacy Policies</div>
                </div>
              </div>
            </div>
          </div>
          <div className="footer__copyright--wrapper">
            <div className="footer__copyright">
              Copyright &copy; 2023 Summarist.
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default Footer;