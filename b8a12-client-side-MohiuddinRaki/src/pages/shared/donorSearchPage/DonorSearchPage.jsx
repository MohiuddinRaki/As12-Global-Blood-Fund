import { motion } from "framer-motion";
import UseUserInfo from "../../../hooks/UseUserInfo";
import UseDistrict from "../../../hooks/UseDistrict";
import UseUpazila from "../../../hooks/UseUpazila";
import { useState } from "react";

const DonorSearchPage = () => {
  const [userInfo, refetch] = UseUserInfo();
  const [donatorDistrict] = UseDistrict();
  const [donatorUpazila] = UseUpazila();
  const [filterDonors, setFilterDonors] = useState([]);
  const filterDonorsLength = filterDonors.length > 0;

  const handleSearchDonor = (event) => {
    event.preventDefault();
    const filteringBlogs = userInfo.filter(
      (donor) =>
        donor.district
          .toLowerCase()
          .includes(event.target.district.value.toLowerCase()) &&
        donor.upazila
          .toLowerCase()
          .includes(event.target.upazila.value.toLowerCase()) &&
        donor.blodGroup
          .toLowerCase()
          .includes(event.target.blodGroup.value.toLowerCase())
    );
    refetch();
    setFilterDonors(filteringBlogs);
  };

  return (
    <>
      <div className="container min-h-fit mx-auto space-y-20 my-10">
        {/* <div className="my-5 flex flex-col md:flex-row items-center md:justify-center gap-5"> */}
        <div>
          <form onSubmit={handleSearchDonor}>
            <div className="flex gap-6">
              <div className="form-control w-1/3">
                <label className="label">
                  <span className="label-text text-xl font-semibold">
                    District
                  </span>
                </label>
                <label className="input-group">
                  <select
                    type="text"
                    name="district"
                    className="input input-bordered w-full"
                  >
                    <option value="select a district">select a district</option>
                    {donatorDistrict.map((district) => (
                      <option key={district._id} value={district.name}>
                        {district.name}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <div className="form-control w-1/3">
                <label className="label">
                  <span className="label-text text-xl font-semibold">
                    Upazila
                  </span>
                </label>
                <label className="input-group">
                  <select
                    type="text"
                    name="upazila"
                    className="input input-bordered w-full"
                  >
                    <option value="select a district">select a district</option>
                    {donatorUpazila.map((upazila) => (
                      <option key={upazila._id} value={upazila.name}>
                        {upazila.name}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <div className="form-control w-1/3">
                <label className="label">
                  <span className="label-text text-xl font-semibold">
                    blood group
                  </span>
                </label>
                <label className="input-group">
                  <select
                    type="text"
                    name="blodGroup"
                    className="input input-bordered w-full"
                  >
                    <option value="select a blood group">
                      select a blood group
                    </option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </label>
              </div>
            </div>
            <input
              type="submit"
              value="Search Donor"
              className="btn btn-block text-white bg-black mt-8"
            />
          </form>
        </div>
        {filterDonorsLength ? (
          <>
            <h1 className="text-center font-bold text-4xl text-lime-500">
              Donor List
            </h1>

            <div className="container mx-auto grid grid-cols- md:grid-cols-2 gap-7 mt-10">
              {filterDonors.map((donor) => (
                <motion.div
                  key={donor._id}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ duration: 1 }}
                  className="card card-compact bg-gray-500 shadow-xl"
                >
                  <div className="flex gap-8">
                    <div className="w-1/2">
                      <img
                        className="h-full"
                        src={donor.image}
                        alt={donor.name}
                      />
                    </div>
                    <div className="w-1/2 space-y-3 mt-3">
                      <h2 className="text-2xl font-semiboldld text-lime-500">
                        <span className="text-orange-400">Name:</span>{" "}
                        {donor.name}
                      </h2>
                      <h2 className="text-2xl font-semiboldld text-lime-500">
                        <span className="text-orange-400">Email:</span>{" "}
                        {donor.email}
                      </h2>
                      <h2 className="text-2xl font-semiboldld text-lime-500">
                        <span className="text-orange-400">Blood Group:</span>{" "}
                        {donor.blodGroup}
                      </h2>
                      <h2 className="text-2xl font-semiboldld text-lime-500">
                        <span className="text-orange-400">Upazila:</span>{" "}
                        {donor.upazila}
                      </h2>
                      <h2 className="text-2xl font-semiboldld text-lime-500">
                        <span className="text-orange-400">District:</span>{" "}
                        {donor.district}
                      </h2>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        ) : (
          <h1 className="text-center font-bold text-4xl text-lime-500">
            No Available Donor in Your Information
          </h1>
        )}
      </div>
    </>
  );
};

export default DonorSearchPage;
