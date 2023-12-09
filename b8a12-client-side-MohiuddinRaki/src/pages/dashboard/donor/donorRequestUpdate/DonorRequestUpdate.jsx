import { Helmet } from "react-helmet-async";
import UseAxiosSecure from "../../../../hooks/UseAxiosSecure";
import UseDistrict from "../../../../hooks/UseDistrict";
import UseUpazila from "../../../../hooks/UseUpazila";
import UseDonorRequest from "../../../../hooks/UseDonorRequest";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";

const DonorRequestUpdate = () => {
  const axiosSecure = UseAxiosSecure();
  const { id } = useParams();
  const [createRequest] = UseDonorRequest();
  const singleCreateRequestInfo = createRequest.find(
    (singleUser) => singleUser._id === id
  );
  const [donatorDistrict] = UseDistrict();
  const [donatorUpazila] = UseUpazila();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const requesterName = data.requesterName;
    const requesterEmail = data.requesterEmail;
    const recipientName = data.recipientName;
    const requestMessage = data.requestMessage;
    const recipientDistrict = data.recipientDistrict;
    const recipientUpazila = data.recipientUpazila;
    const hospitalName = data.hospitalName;
    const hospitalAddress = data.hospitalAddress;
    const donationDate = data.donationDate;
    const donationTime = data.donationTime;
    const status = data.status;

    // now send the menu item data to the server with image url:
    const updateDonorRequestInfo = {
      requesterName,
      requesterEmail,
      recipientName,
      requestMessage,
      recipientDistrict,
      recipientUpazila,
      hospitalName,
      hospitalAddress,
      donationDate,
      donationTime,
      status,
    };
    console.log(updateDonorRequestInfo);
    const meniRes = await axiosSecure.put(
      `/dashboard/donatorCreateRequest/${singleCreateRequestInfo._id}`,
      updateDonorRequestInfo
    );
    console.log(meniRes.data);
    if (meniRes.data.modifiedCount > 0) {
      reset();
      Swal.fire({
        position: "top",
        icon: "success",
        title: `${data.requesterName} updated Your Request Info Successfully`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  return (
    <>
      <div>
        <Helmet>
          <title>Global Blood Fund | Dashboard | Request Update</title>
        </Helmet>
        <h1 className="text-5xl text-center font-bold">
          <span className="text-red-500">Request</span> Update!
          {/* {createRequest.length}
          {singleUserInfo?.requesterName} */}
        </h1>
        <div className="hero mt-7">
          {/* <div className="hero-content flex-col lg:flex-row-reverse"> */}
          {/* <div className="md:w-1/2 w-full max-w-xl">
         <img src="https://i.ibb.co/YW2kYcG/istockphoto-1349428314-640x640.jpg" alt="" />
          </div> */}
          <div className="card md:w-1/2 w-full max-w-xl shadow-2xl bg-base-100 pb-6">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <div className="flex gap-5">
                <div className="form-control w-1/2">
                  <label className="label">
                    <span className="label-text">Requester Name*</span>
                  </label>
                  <input
                    readOnly
                    defaultValue={singleCreateRequestInfo?.requesterName}
                    placeholder="Requester Name"
                    {...register("requesterName")}
                    className="input input-bordered"
                  />
                  {errors.requesterName && (
                    <span className="text-red-500">
                      requester name field is required
                    </span>
                  )}
                </div>
                <div className="form-control w-1/2">
                  <label className="label">
                    <span className="label-text">Requester Email*</span>
                  </label>
                  <input
                    readOnly
                    defaultValue={singleCreateRequestInfo?.requesterEmail}
                    placeholder="email"
                    {...register("requesterEmail")}
                    className="input input-bordered"
                  />
                  {errors.requesterEmail && (
                    <span className="text-red-500">
                      requester email is required
                    </span>
                  )}
                </div>
              </div>
              <div className="flex gap-5">
                <div className="form-control w-1/2">
                  <label className="label">
                    <span className="label-text">Recipient Name*</span>
                  </label>
                  <input
                    type="text"
                    defaultValue={singleCreateRequestInfo?.recipientName}
                    placeholder="Recipient Name"
                    {...register("recipientName", { required: true })}
                    className="input input-bordered"
                  />
                  {errors.recipientName && (
                    <span className="text-red-500">
                      recipient name field is required
                    </span>
                  )}
                </div>
                <div className="form-control w-1/2">
                  <label className="label">
                    <span className="label-text">Request Message*</span>
                  </label>
                  <input
                    type="text"
                    defaultValue={singleCreateRequestInfo?.requestMessage}
                    placeholder="Request Message"
                    {...register("requestMessage", { required: true })}
                    className="input input-bordered"
                  />
                  {errors.requestMessage && (
                    <span className="text-red-500">
                      request message field is required
                    </span>
                  )}
                </div>
              </div>
              <div className="flex gap-5">
                <div className="form-control w-1/2">
                  <label className="label">
                    <span className="label-text">Recipient District*</span>
                  </label>
                  <select
                    defaultValue={singleCreateRequestInfo?.recipientDistrict}
                    {...register("recipientDistrict", { required: true })}
                    className="select select-bordered"
                  >
                    <option disabled value="default">
                      select a district
                    </option>
                    {donatorDistrict.map((district) => (
                      <option key={district._id} value={district.name}>
                        {district.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-control w-1/2">
                  <label className="label">
                    <span className="label-text">Recipient Upazila*</span>
                  </label>
                  <select
                    defaultValue={singleCreateRequestInfo?.recipientUpazila}
                    {...register("recipientUpazila", { required: true })}
                    className="select select-bordered"
                  >
                    <option disabled value="default">
                      select a upazila
                    </option>
                    {donatorUpazila.map((upazila) => (
                      <option key={upazila._id} value={upazila.name}>
                        {upazila.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex gap-5">
                <div className="form-control w-1/2">
                  <label className="label">
                    <span className="label-text">Hospital Name*</span>
                  </label>
                  <input
                    type="text"
                    defaultValue={singleCreateRequestInfo?.hospitalName}
                    placeholder="Hospital Name"
                    {...register("hospitalName", { required: true })}
                    className="input input-bordered"
                  />
                  {errors.hospitalName && (
                    <span className="text-red-500">
                      hospital name field is required
                    </span>
                  )}
                </div>
                <div className="form-control w-1/2">
                  <label className="label">
                    <span className="label-text">Hospital Address*</span>
                  </label>
                  <input
                    type="address"
                    defaultValue={singleCreateRequestInfo?.hospitalAddress}
                    placeholder="Hospital Address"
                    {...register("hospitalAddress", { required: true })}
                    className="input input-bordered"
                  />
                  {errors.hospitalAddress && (
                    <span className="text-red-500">
                      hospital address is required
                    </span>
                  )}
                </div>
              </div>
              <div className="flex gap-5">
                <div className="form-control w-1/2">
                  <label className="label">
                    <span className="label-text">Donation Date*</span>
                  </label>
                  <input
                    type="date"
                    defaultValue={singleCreateRequestInfo?.donationDate}
                    placeholder="Donation Time"
                    {...register("donationDate", { required: true })}
                    className="input input-bordered"
                  />
                  {errors.donationDate && (
                    <span className="text-red-500">
                      donation date field is required
                    </span>
                  )}
                </div>
                <div className="form-control w-1/2">
                  <label className="label">
                    <span className="label-text">Donation Time*</span>
                  </label>
                  <input
                    type="time"
                    defaultValue={singleCreateRequestInfo?.donationTime}
                    placeholder="Donation Time"
                    {...register("donationTime", { required: true })}
                    className="input input-bordered"
                  />
                  {errors.donationTime && (
                    <span className="text-red-500">
                      donation time is required
                    </span>
                  )}
                </div>
              </div>
              <div className="form-control mt-6">
                <input
                  className="btn btn-success"
                  type="submit"
                  value="Request Update"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default DonorRequestUpdate;
