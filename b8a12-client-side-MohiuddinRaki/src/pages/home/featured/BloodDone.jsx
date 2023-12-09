import PropTypes from "prop-types";
import { motion } from "framer-motion";

const BloodDone = ({ blog }) => {
  const { requesterName, recipientName, photo } = blog;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
        transition={{ duration: 1 }}
        className="card card-compact bg-gray-500 shadow-xl"
      >
        <figure>
          <img className="w-full h-72" src={photo} alt={requesterName} />
        </figure>
        <div className="card-body">
          <div>
            <h2 className="text-2xl font-medium text-white">
              <span className="text-red-500">Requester Name:</span> {requesterName}
            </h2>
            <h2 className="text-2xl font-medium text-white"><span className="text-red-500 ">RecipientName: </span> {recipientName}</h2>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default BloodDone;

BloodDone.propTypes = {
  blog: PropTypes.object.isRequired,
};
