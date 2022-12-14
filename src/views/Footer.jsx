export default function Footer() {
  var React = require("react");
  var { SocialIcon } = require("react-social-icons");

  return (
    <footer>
      <div className="footer-acknowledgment ">
        <h4 className="footer-ackn-heading">ACKNOWLEDGEMENT OF COUNTRY</h4>
        <p>
          We acknowledge the Traditional Custodians of NSW, and their continued
          connection to land, water and culture. We pay our respects to Elders
          past, present and emerging.
        </p>
      </div>
      <div className="footer-services">
        <div className="flex space-x-36 ml-[180px]">
          <div className="flex flex-col">
            <a
              className="footer-heading"
              href="https://www.service.nsw.gov.au/services"
            >
              BROWSE SERVICES
            </a>
            <a href="https://www.service.nsw.gov.au/services/births-relationships-and-deaths">
              Boating, fishing and outdoors
            </a>
            <a href="https://www.service.nsw.gov.au/services/boating-fishing-and-outdoors">
              Business, industries and employment
            </a>
            <a href="https://www.service.nsw.gov.au/services/concessions-rebates-and-assistance">
              Concessions, rebates and assistance
            </a>
            <a href="https://www.service.nsw.gov.au/services/driving-and-transport">
              Driving and transport
            </a>
            <a href="https://www.service.nsw.gov.au/services/education">
              Education
            </a>
            <a href="https://www.service.nsw.gov.au/services/health-and-care">
              Health and care
            </a>
            <a href="https://www.service.nsw.gov.au/services/housing-and-property">
              Housing and property
            </a>
            <a href="https://www.service.nsw.gov.au/services/legal-and-police-services">
              Legal and Police services
            </a>
          </div>
          <div className="flex flex-col">
            <a
              className="footer-heading"
              href="https://www.service.nsw.gov.au/about-us"
            >
              SERVICE NSW
            </a>
            <a href="https://www.service.nsw.gov.au/about-us">About us</a>
            <a href="https://www.service.nsw.gov.au/about-us/jobs-service-nsw">
              Jobs at Service NSW
            </a>
            <a href="https://www.service.nsw.gov.au/news">News</a>
            <a href="https://www.service.nsw.gov.au/service-nsw-mobile-app">
              Download the Service NSW app
            </a>
            <a href="https://www.service.nsw.gov.au/help-your-language">
              Help in your language
            </a>
            <a href="https://www.service.nsw.gov.au/service-status">
              Service status
            </a>
            <a href="https://www.service.nsw.gov.au/performance-dashboard">
              Performance dashboard
            </a>
          </div>
          <div className="flex flex-col">
            <a
              className="footer-heading"
              href="https://www.service.nsw.gov.au/contact-us"
            >
              CONTACT
            </a>
            <a href="https://www.service.nsw.gov.au/contact-us">Contact form</a>
            <a href="tel:137788">Phone 13 77 88</a>
            <a href="https://www.service.nsw.gov.au/service-centre">
              Find a Service NSW location
            </a>
            <a href="https://www.service.nsw.gov.au/nswgovdirectory">
              Find a NSW Government agency
            </a>
            <div className="footer-social">
              <SocialIcon url="https://www.facebook.com/ServiceNSW/" bgColor="#FFFFFF" style={{ height: 35, width: 35,}} />
              <SocialIcon url="https://twitter.com/ServiceNSW/" bgColor="#FFFFFF" style={{ height: 35, width: 35}} />
              <SocialIcon url="https://www.linkedin.com/company/servicensw/mycompany/verification//" bgColor="#FFFFFF" style={{ height: 35, width: 35}} />
              <SocialIcon url="https://www.instagram.com/servicensw/?ref=badge/" bgColor="#FFFFFF" style={{ height: 35, width: 35,}} />
              <SocialIcon url="https://www.youtube.com/channel/UCpFpdQqKphbZ5xiLV0nuwdQ/" bgColor="#FFFFFF" style={{ height: 35, width: 35,}} />
            </div>
          </div>
        </div>
      </div>
      <div className="footer-links">
        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
          <a href="https://www.service.nsw.gov.au/accessibility">
            Accessibility
          </a>
          <a href="https://www.service.nsw.gov.au/privacy-statement">Privacy</a>
          <a href="https://www.service.nsw.gov.au/terms-use">Terms of use</a>
          <a href="https://www.service.nsw.gov.au/copyright-and-disclaimer">
            Copyright and disclaimer
          </a>
          <a href="https://www.service.nsw.gov.au/accessing-information">
            Accessing information
          </a>
          <a href="https://www.nsw.gov.au/">NSW Government</a>
        </div>
      </div>
    </footer>
  );
}
