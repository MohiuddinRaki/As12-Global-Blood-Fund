import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div
      className="hero h-[700px]"
      style={{
        backgroundImage: `url('https://i.ibb.co/QcX5jVX/360-F-137309034-4o-K5-Bo-Yq-Uc7s-Uo-Nor1lt-GW0-PAYNz-Ex-K9.jpg')`,
      }}
    >
      <div className="hero-overlay "></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold uppercase">
           <span className="text-[#ed1b2f]">To Give</span> Is Human
          </h1>
          <p className="mt-10 text-xl font-medium text-gray-300">
            We save lifes by helping some of the worlds poorest  countries collect sufficient, safe blood
          </p>
          <div className="flex justify-center gap-7 mt-8">
          <h1><Link to="/register"><button className="btn btn-outline text-white text-xl">Join as a donor</button></Link></h1>
          <h1><Link to="/donorSearch"><button className="btn btn-accent text-white text-xl">Search Donors</button></Link></h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
