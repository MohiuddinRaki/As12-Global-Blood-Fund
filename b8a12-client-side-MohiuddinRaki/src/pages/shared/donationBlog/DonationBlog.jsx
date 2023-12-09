import { useState } from "react";
import UseAllBlogs from "../../../hooks/UseAllBlogs";
import AllBlog from "./AllBlog";
import { Helmet } from "react-helmet-async";

const DonationBlog = () => {
  const [allBlogs, refetch] = UseAllBlogs();
  const pendingallBlogs = allBlogs.filter(
    (pendingBlogs) => pendingBlogs.status === "publish"
  );

  const [filterType, setFilterType] = useState(pendingallBlogs);
  const [selectedType, setSelectedType] = useState("");

  const handleSearch = (event) => {
    const selectedValue = event.target.value;
    setSelectedType(selectedValue);

    if (selectedValue === "") {
      setFilterType(pendingallBlogs);
    } else {
      const filteringCategories = pendingallBlogs.filter((donor) =>
        donor.title.toLowerCase().includes(event.target.value.toLowerCase())
      );
      setFilterType(filteringCategories);
    }
    refetch();
  };

  return (
    <>
      <div>
        <Helmet>
          <title>Global Blood Fund || Donation Blogs</title>
        </Helmet>
        <div>
          <div className="container mx-auto my-5 flex flex-col md:flex-row items-center md:justify-center gap-5">
            <div>
              <input
                className="text-xl input input-bordered font-medium text-center py-2"
                type="text"
                placeholder="search by title..."
                onChange={handleSearch}
                value={selectedType}
              />
            </div>
          </div>
          <div className="container mx-auto p-8 md:p-16 lg:p-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-20">
            {filterType.map((blog, idx) => (
              <AllBlog key={idx} blog={blog}></AllBlog>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default DonationBlog;
