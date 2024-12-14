import React from "react";
import PrenatalHistoryDetails from "./PrenatalHistoryDetails";

const HistoryDetails = ({
  specificHistoryData,
  myProfile,
  activeTab,
  handleCloseHistoryDetails,
}) => {
  return (
    <div className="w-full">
      <PrenatalHistoryDetails
        selectedRow={specificHistoryData}
        myProfile={myProfile}
        activeTab={activeTab}
        handleCloseHistoryDetails={handleCloseHistoryDetails}
      />
    </div>
  );
};

export default HistoryDetails;
