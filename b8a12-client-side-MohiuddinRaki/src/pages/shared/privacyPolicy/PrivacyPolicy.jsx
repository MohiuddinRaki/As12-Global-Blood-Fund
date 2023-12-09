import { Helmet } from "react-helmet-async";

const PrivacyPolicy = () => {
  return (
  <>
    <Helmet><title>Global Blood Fund || Privacy Policy</title></Helmet>
    <div className="container mx-auto pt-40">
      <h1 className="text-4xl font-bold text-center text-[#701c45]">
        PRIVACY POLICY
      </h1>
      <p className="text-gray-400 font-medium text-lg my-10">
        Global Blood Fund uses cookies to enhance your browsing experience.
        Information gathered relates to IP address, browser, language
        preferences and pages visited. No personal information is collected in
        this way. Should you be kind enough to offer financial support through
        our link to PayPal, your details will not be visible to or captured by
        us and PayPal’s own privacy policy shall apply. Should you decide to
        interact with some of our programs – the EqXchange portal or Small
        Grants Program for example – we may request personal details (though not
        sensitive information). These details will be used for the purpose of
        providing the program or service and may be retained to ensure that we
        can keep you updated with activity and informed of future opportunities
        that may be of interest. At no point will your information be shared
        with any third party organization. All emails or other electronic forms
        of communication will offer the opportunity to “unsubscribe” and we
        honor any and all such requests. Should at any point you wish to inquire
        – for review or correction – what, if any, information is held about you
        by our charity, please contact mohammadmohiuddin3490@gmail.com ,We
        pledge prompt and full disclosure and will amend or delete information
        about you as you require.
      </p>
    </div>
  </>
  );
};

export default PrivacyPolicy;
