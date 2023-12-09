import { Helmet } from "react-helmet-async";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TablePagination } from "@mui/material";
import { useState } from "react";
import UseUserInfo from "../../../../hooks/UseUserInfo";
import { FaUser } from "react-icons/fa";
import UseAxiosSecure from "../../../../hooks/UseAxiosSecure";
import Swal from "sweetalert2";
import UseAuth from "../../../../hooks/UseAuth";

const AllUsers = () => {
  const { user } = UseAuth();
  const [userInfo, refetch] = UseUserInfo();
  const axiosSecure = UseAxiosSecure();
  // const [filterDonations, setFilterDonations] = useState(userInfo);
  // const loginUser = userInfo.find(
  //   (loginUser) => loginUser?.email === user?.email
  // );
  const [filterType, setFilterType] = useState(userInfo);
  const [selectedType, setSelectedType] = useState("");

  const handleSearchCaetegory = (event) => {
    const selectedValue = event.target.value;
    setSelectedType(selectedValue);

    if (selectedValue === "select") {
      setFilterType(userInfo);
    } else {
      const filteringCategories = userInfo.filter((donor) =>
        donor.status.toLowerCase().includes(event.target.value.toLowerCase())
      );
      setFilterType(filteringCategories);
    }
    refetch();
  };

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // const handleSearchCaetegory = (event) => {
  //   const filteringDonations = filterDonations.filter((donor) =>
  //     donor.status.toLowerCase().includes(event.target.value.toLowerCase())
  //   );
  //   setFilterDonations(filteringDonations);
  //   refetch();
  // };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleBlock = async (donor) => {
    //  send data to the server:
    const name = donor.name;
    const email = donor.email;
    const district = donor.district;
    const upazila = donor.upazila;
    const blodGroup = donor.blodGroup;
    const image = donor.image;
    const role = "donor";
    const status = "block";
    const userInfo = {
      name,
      email,
      district,
      upazila,
      blodGroup,
      image,
      role,
      status,
    };

    const meniRes = await axiosSecure.put(
      `/dashboard/donationUsers/${donor?._id}`,
      userInfo
    );
    console.log(meniRes.data);
    if (meniRes.data.modifiedCount > 0) {
      refetch();
      Swal.fire({
        position: "top",
        icon: "success",
        title: `now ${donor?.name} blocked`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const handleUnBlock = async (donor) => {
    //  send data to the server:
    const name = donor.name;
    const email = donor.email;
    const district = donor.district;
    const upazila = donor.upazila;
    const blodGroup = donor.blodGroup;
    const image = donor.image;
    const role = "donor";
    const status = "active";
    const userInfo = {
      name,
      email,
      district,
      upazila,
      blodGroup,
      image,
      role,
      status,
    };

    const meniRes = await axiosSecure.put(
      `/dashboard/donationUsers/${donor?._id}`,
      userInfo
    );
    console.log(meniRes.data);
    if (meniRes.data.modifiedCount > 0) {
      refetch();
      Swal.fire({
        position: "top",
        icon: "success",
        title: `now ${donor?.name} active`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const handleAdmin = (user) => {
    axiosSecure.patch(`/dashboard/donationUsers/${user._id}`).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "top",
          icon: "success",
          title: `${user?.name} is an admin now`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  const handleVolunteer = (user) => {
    axiosSecure.patch(`/dashboard/donationUser/${user?._id}`).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "top",
          icon: "success",
          title: `${user?.name} is a volunteer now`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  return (
    <>
      <div>
        <Helmet>
          <title>Global Blood Fund | Dashboard | My Request</title>
        </Helmet>
        <h2 className="text-center">
          <span className="text-4xl font-medium">
            <span className="text-green-500">
              Total Users: {userInfo.length}
            </span>
          </span>
        </h2>
        <div>
          <form>
            <select
              type="text"
              className="input input-bordered"
              onChange={handleSearchCaetegory}
              value={selectedType}
            >
              <option value="select">Select</option>
              <option value="active">Active</option>
              <option value="block">Block</option>
            </select>
          </form>
        </div>
        <TableContainer className="mt-10" component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <span className="text-xl font-semibold text-red-500">
                    avatar
                  </span>
                </TableCell>
                <TableCell align="left">
                  <span className="text-xl font-semibold text-red-500">
                    name
                  </span>
                </TableCell>
                <TableCell align="left">
                  <span className="text-xl font-semibold text-red-500">
                    email
                  </span>
                </TableCell>
                <TableCell align="left">
                  <span className="text-xl font-semibold text-red-500">
                    status
                  </span>
                </TableCell>
                <TableCell align="left">
                  <span className="text-xl font-semibold text-red-500">
                    role
                  </span>
                </TableCell>
                <TableCell align="left">
                  <span className="text-xl font-semibold text-red-500">
                    Action
                  </span>
                </TableCell>
                <TableCell align="left">
                  <span className="text-xl font-semibold text-red-500">
                    Make Admin
                  </span>
                </TableCell>
                <TableCell align="left">
                  <span className="text-xl font-semibold text-red-500">
                    Make Volunteer
                  </span>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filterType
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow
                    key={row._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <img
                        className="w-14 h-14 rounded-full"
                        src={row.image}
                        alt={row.name}
                      />
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <span className="text-lg flex w-max text-white rounded-md p-2 border box-border bg-emerald-500">
                        {row.name}
                      </span>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <span className="text-sm text-white rounded-md p-2 border bg-cyan-500 box-border">
                        {row.email}
                      </span>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <span className="text-xl text-white rounded-md p-2 border bg-green-500  box-border">
                        {row.status}
                      </span>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <span className="text-xl text-white rounded-md p-2 border bg-orange-500  box-border">
                        {row.role}
                      </span>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {user?.email === row.email ? (
                        <button className="btn btn-warning">User</button>
                      ) : (
                        <>
                          {row?.status === "active" ? (
                            <button
                              onClick={() => handleBlock(row)}
                              className="btn btn-warning"
                            >
                              Block
                            </button>
                          ) : (
                            <button
                              onClick={() => handleUnBlock(row)}
                              className="btn btn-accent"
                            >
                              UnBlock
                            </button>
                          )}
                        </>
                      )}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row?.role === "admin" && row?.status === "active" ? (
                        <span className="text-zinc-500 text-3xl">Admin</span>
                      ) : row?.status === "block" ? (
                        <button className="text-green-500 text-3xl">
                          <FaUser></FaUser>
                        </button>
                      ) : (
                        <button
                          onClick={() => handleAdmin(row)}
                          className="text-green-500 text-3xl"
                        >
                          <FaUser></FaUser>
                        </button>
                      )}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {user?.email === row.email ? (
                        <button className="text-green-500 text-3xl">
                          <FaUser></FaUser>
                        </button>
                      ) : row?.role === "volunteer" &&
                        row?.status === "active" ? (
                        <span className="text-zinc-500 text-3xl">
                          volunteer
                        </span>
                      ) : row?.status === "block" ? (
                        <button className="text-green-500 text-3xl">
                          <FaUser></FaUser>
                        </button>
                      ) : (
                        <button
                          onClick={() => handleVolunteer(row)}
                          className="text-green-500 text-3xl"
                        >
                          <FaUser></FaUser>
                        </button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={userInfo.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </div>
    </>
  );
};

export default AllUsers;
