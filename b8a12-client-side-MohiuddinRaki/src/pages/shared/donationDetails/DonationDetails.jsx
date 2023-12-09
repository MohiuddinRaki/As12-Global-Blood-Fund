import { motion } from "framer-motion";
import UseDonorRequest from "../../../hooks/UseDonorRequest";
import { useNavigate, useParams } from "react-router-dom";
import UseAxiosSecure from "../../../hooks/UseAxiosSecure";
import Swal from "sweetalert2";

const DonationDetails = () => {
  const [createRequest, refetch] = UseDonorRequest();
  const axiosSecure = UseAxiosSecure();
  const naviGate = useNavigate();
  const { id } = useParams();
  const singlePendingRequest = createRequest.find(
    (singleRequest) => singleRequest._id === id
  );

  const handleDonate = async (donor) => {
    //  send data to the server:
    const requesterName = donor.requesterName;
    const requesterEmail = donor.requesterEmail;
    const recipientName = donor.recipientName;
    const requestMessage = donor.requestMessage;
    const recipientDistrict = donor.recipientDistrict;
    const recipientUpazila = donor.recipientUpazila;
    const hospitalName = donor.hospitalName;
    const hospitalAddress = donor.hospitalAddress;
    const donationDate = donor.donationDate;
    const donationTime = donor.donationTime;
    const status = "inprogress";
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

    const meniRes = await axiosSecure.put(
      `/dashboard/donatorCreateRequest/${donor?._id}`,
      updateDonorRequestInfo
    );
    console.log(meniRes.data);
    if (meniRes.data.modifiedCount > 0) {
      refetch();
      Swal.fire({
        position: "top",
        icon: "success",
        title: "Donate pending to inprogress Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    naviGate("/donationRequest");
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
        transition={{ duration: 1 }}
        className="card card-compact max-w-5xl my-10 bg-gray-500 shadow-xl container mx-auto p-8 md:p-16 lg:p-0"
      >
        <div className="card-body">
          <div className="space-y-2 m-5">
            <h2 className="text-3xl font-bold text-orange-500">
              <span className="text-teal-500">RequesterName: </span>
              {singlePendingRequest?.requesterName}
            </h2>
            <h2 className="text-3xl font-medium text-orange-500">
              <span className="text-teal-500">RequesterEmail: </span>
              {singlePendingRequest?.requesterEmail}
            </h2>
            <h2 className="text-2xl text-sky-500">
              <span className="text-lime-500">recipientName: </span>
              {singlePendingRequest?.recipientName}
            </h2>
            <h2 className="text-2xl text-sky-500">
              <span className="text-lime-500">requestMessage: </span>
              {singlePendingRequest?.requestMessage}
            </h2>
            <h2 className="text-2xl text-sky-500">
              <span className="text-lime-500">recipientDistrict: </span>
              {singlePendingRequest?.recipientDistrict}
            </h2>
            <h2 className="text-2xl text-sky-500">
              <span className="text-lime-500">recipientUpazila: </span>
              {singlePendingRequest?.recipientUpazila}
            </h2>
            <h2 className="text-2xl text-sky-500">
              <span className="text-lime-500">hospitalName: </span>
              {singlePendingRequest?.hospitalName}
            </h2>
            <h2 className="text-2xl text-sky-500">
              <span className="text-lime-500">hospitalAddress: </span>
              {singlePendingRequest?.hospitalAddress}
            </h2>
            <h2 className="text-2xl text-sky-500">
              <span className="text-lime-500">donationDate :</span>
              {singlePendingRequest?.donationDate}
            </h2>
            <h2 className="text-2xl text-sky-500">
              <span className="text-lime-500">donationTime</span>
              {singlePendingRequest?.donationTime}
            </h2>
          </div>
          {/* Open the modal using document.getElementById('ID').showModal() method */}
          {singlePendingRequest.status === "pending" ? (
            <button
              className="btn"
              onClick={() => document.getElementById("my_modal_5").showModal()}
            >
              DONATE
            </button>
          ) : singlePendingRequest.status === "done" ? (
            <button className="btn btn-info">
              allReady This request is Done
            </button>
          ) : singlePendingRequest.status === "cancel" ? (
            <button className="btn btn-info">
              This request has been Cancel
            </button>
          ) : (
            <button className="btn btn-info">
              alReady This request is inProgress
            </button>
          )}
          <dialog
            id="my_modal_5"
            className="modal modal-bottom sm:modal-middle"
          >
            <div className="modal-box">
              <div className="flex gap-5">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-xl font-medium">
                      Donor Name
                    </span>
                  </label>
                  <input
                    readOnly
                    type="tect"
                    name="email"
                    placeholder={singlePendingRequest?.requesterName}
                    className="input input-bordered"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-xl font-medium">
                      Donor Email
                    </span>
                  </label>
                  <input
                    readOnly
                    type="email"
                    name="email"
                    placeholder={singlePendingRequest?.requesterEmail}
                    className="input input-bordered"
                  />
                </div>
              </div>
              <div className="modal-action">
                <form method="dialog">
                  <button
                    onClick={() => handleDonate(singlePendingRequest)}
                    className="btn btn-success"
                  >
                    CONFIRM
                  </button>
                </form>
              </div>
            </div>
          </dialog>
        </div>
      </motion.div>
    </>
  );
};

export default DonationDetails;
