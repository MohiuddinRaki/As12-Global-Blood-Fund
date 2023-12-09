import { Link, NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className=" bg-[#701c45]">
      <div className="footer p-10 text-base-content container mx-auto">
        <div>
          <h1 className="text-[#ed1b2f] text-3xl font-bold my-3">
            GLOBAL NEED
          </h1>
          <div>
            <li className="text-lg font-medium text-teal-500 lg:text-white">
              <NavLink>mission</NavLink>
            </li>
            <li className="text-lg font-medium text-teal-500 lg:text-white">
              <NavLink>work</NavLink>
            </li>
            <li className="text-lg font-medium text-teal-500 lg:text-white">
              <NavLink>history</NavLink>
            </li>
          </div>
        </div>
        <div>
          <h1 className="text-[#ed1b2f] text-3xl font-bold my-3">WHY BLOOD?</h1>
          <div>
            <li className="text-lg font-medium text-teal-500 lg:text-white">
              <NavLink>impact</NavLink>
            </li>
            <li className="text-lg font-medium text-teal-500 lg:text-white">
              <NavLink>News</NavLink>
            </li>
            <li className="text-lg font-medium text-teal-500 lg:text-white">
              <NavLink>faq</NavLink>
            </li>
          </div>
        </div>
        <div>
          <h1 className="text-[#ed1b2f] text-3xl font-bold my-3">
            FUND OUR MISSION
          </h1>
          <div>
            <li className="text-lg font-medium text-teal-500 lg:text-white">
              <NavLink>partner</NavLink>
            </li>
            <li className="text-lg font-medium text-teal-500 lg:text-white">
              <NavLink>get involved</NavLink>
            </li>
            <li className="text-lg font-medium text-teal-500 lg:text-white">
              <NavLink>donate</NavLink>
            </li>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-5 md:px-0">
        <div className="flex">
          <div className="items-center mr-2">
            <img
              className="rounded-full max-w-16 h-10"
              src="https://i.ibb.co/VH4RCT0/Document.jpg"
            />
          </div>
          <div>
            <Link
              to="/"
              className="btn btn-ghost normal-case text-white font-bold text-lg md:text-4xl pl-16 md:pl-44 lg:pl-0"
            >
              G.Blood Fund
            </Link>
          </div>
        </div>
        <ul className="menu-horizontal gap-5 my-5">
          <li className="text-lg font-medium text-teal-500 lg:text-[#ed1b2f]">
            <NavLink to="/privacy">privacy policy </NavLink>
          </li>
          <li className="text-lg font-medium text-teal-500 lg:text-[#ed1b2f]">
            contact us
          </li>
        </ul>
      </div>

      <p className="text-white pb-10 text-center">
        © Global Blood Fund. All Rights Reserved, 2023. With thanks to Fresenius
        Kabi for design support.<br></br> Global Blood Fund® is a tax-exempt
        501(c)(3) nonprofit organization. Your gift is tax-deductible as allowed
        by law. Charity IDs: 39-2071848 (US); 1162880 (UK)
      </p>
    </footer>
  );
};

export default Footer;
