import UseAuth from "../../../../hooks/UseAuth";
import UseAxiosSecure from "../../../../hooks/UseAxiosSecure";
import UseDonorRequest from "../../../../hooks/UseDonorRequest";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Link } from "react-router-dom";

const DashboardDonor = () => {
  const [createRequest, refetch] = UseDonorRequest();
  const axiosSecure = UseAxiosSecure();
  const { user } = UseAuth();
  const specifyUserRequest = createRequest.filter(
    (specifyUser) => specifyUser.requesterEmail === user.email
  );
  const conditionAllRequestButton = specifyUserRequest.length > 3;
  const showRequestCondition = specifyUserRequest.length > 0;

  const handleDeleteItem = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(
          `/donatorCreateRequest/${item._id}`
        );
        if (res.data.deletedCount > 0) {
          refetch();
          Swal.fire({
            title: "Deleted!",
            text: "Your request has been deleted.",
            icon: "success",
          });
        }
        console.log(res.data);
      }
    });
  };
  const handleDoneRequest = async (data) => {
    //  send data to the server:
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
    const status = "done";
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
      `/dashboard/donatorCreateRequest/${data?._id}`,
      updateDonorRequestInfo
    );
    console.log(meniRes.data);
    if (meniRes.data.modifiedCount > 0) {
      refetch();
      Swal.fire({
        position: "top",
        icon: "success",
        title: "status Updated to done successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const handleCancelRequest = async (data) => {
    //  send data to the server:
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
    const status = "cancel";
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
      `/dashboard/donatorCreateRequest/${data?._id}`,
      updateDonorRequestInfo
    );
    console.log(meniRes.data);
    if (meniRes.data.modifiedCount > 0) {
      refetch();
      Swal.fire({
        position: "top",
        icon: "success",
        title: "status Updated to cancel successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  return (
    <>
      <Helmet>
        <title>Global Blood Fund | Dashboard</title>
      </Helmet>
      <>
        {showRequestCondition ? (
          <>
            <h2 className="text-center">
              <span className="text-4xl font-medium">
                <span className="text-red-500">Wecome</span> Back!,{" "}
                <span className="text-green-500">{user.displayName}</span>
              </span>
            </h2>
            <TableContainer className="mt-10" component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <span className="text-lg text-red-500">
                        recipient name
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="text-lg text-red-500">
                        donation status
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="text-lg text-red-500">
                        hospital name
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="text-lg text-red-500">Donor name</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-lg text-red-500">Donor Email</span>
                    </TableCell>
                    <TableCell align="left">
                      <span className="text-lg text-red-500">
                        recipient loaction
                      </span>
                    </TableCell>
                    <TableCell align="left">
                      <span className="text-lg text-red-500">
                        donation date
                      </span>
                    </TableCell>
                    <TableCell align="left">
                      <span className="text-lg text-red-500">
                        donation time
                      </span>
                    </TableCell>
                    <TableCell align="left">
                      <span className="text-lg text-red-500">Edit</span>
                    </TableCell>
                    <TableCell align="left">
                      <span className="text-lg text-red-500">Remove</span>
                    </TableCell>
                    <TableCell align="left">
                      <span className="text-lg text-red-500">View</span>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {specifyUserRequest.slice(-3).map((row) => (
                    <TableRow
                      key={row._id}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell component="th" scope="row">
                        {row.recipientName}
                      </TableCell>
                      <TableCell align="left">
                        {row.status === "inprogress" ? (
                          <div className="flex flex-col gap-2">
                            <button
                              className="btn w-16 btn-success"
                              onClick={() => handleDoneRequest(row)}
                            >
                              Done
                            </button>
                            <button
                              className="btn w-16 btn-accent"
                              onClick={() => handleCancelRequest(row)}
                            >
                              Cancel
                            </button>
                          </div>
                        ) : row.status === "done" ? (
                          <button className="btn w-16">Done</button>
                        ) : row.status === "cancel" ? (
                          <button className="btn w-16">Cancel</button>
                        ) : (
                          <button className="btn w-16">Pending</button>
                        )}
                      </TableCell>

                      <TableCell align="left">{row.hospitalName}</TableCell>
                      {row.status === "inprogress" ? (
                        <>
                          <TableCell align="left">
                            {row.requesterName}
                          </TableCell>
                          <TableCell align="left">
                            {row.requesterEmail}
                          </TableCell>
                        </>
                      ) : (
                        <>
                          <TableCell align="left">request is pending</TableCell>
                          <TableCell align="left">request is pending</TableCell>
                        </>
                      )}
                      <TableCell align="left">
                        {row.recipientUpazila},{row.recipientDistrict}
                      </TableCell>
                      <TableCell align="left">{row.donationDate}</TableCell>
                      <TableCell align="left">{row.donationTime}</TableCell>
                      <TableCell align="left">
                        <Link to={`/dashboard/donatorCreateRequest/${row._id}`}>
                          <button className="btn btn-info text-white">
                            Edit
                          </button>
                        </Link>
                      </TableCell>
                      <TableCell align="left">
                        <button
                          onClick={() => handleDeleteItem(row)}
                          className="btn btn-warning text-white"
                        >
                          Remove
                        </button>
                      </TableCell>
                      <TableCell align="left">
                        <Link to={`/donationDetails/${row._id}`}>
                          <button className="btn btn-accent text-white">
                            View
                          </button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            {conditionAllRequestButton ? (
              <Link to="/dashboard/myRequest">
                <button className="btn btn-info w-full mt-10">
                  View My All Request
                </button>
              </Link>
            ) : (
              <Link to="/dashboard/myRequest">
                <button className="btn btn-info w-full mt-10">
                  Go To My Request
                </button>
              </Link>
            )}
          </>
        ) : (
          ""
        )}
      </>
    </>
  );
};

export default DashboardDonor;
