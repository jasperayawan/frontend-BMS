import React from "react";
import PrenatalHistoryDetails from "./PrenatalHistoryDetails";
import ImmunizationDetails from "./ImmunizationDetails";
import OtherServicesDetails from "./OtherServicesDetails";
import FamilyPlanningDetails from "./FamilyPlanningDetails";

const HistoryDetails = ({
  specificHistoryData,
  myProfile,
  activeTab,
  handleCloseHistoryDetails,
}) => {
  return (
    <div className="w-full">
        {activeTab === 'PRENATAL CARE' && (
            <PrenatalHistoryDetails
                selectedRow={specificHistoryData}
                myProfile={myProfile}
                activeTab={activeTab}
                handleCloseHistoryDetails={handleCloseHistoryDetails}
            />
        )}
        {activeTab === 'IMMUNIZATION' && (
            <ImmunizationDetails
                selectedRow={specificHistoryData}
                myProfile={myProfile}
                activeTab={activeTab}
                handleCloseHistoryDetails={handleCloseHistoryDetails}
            />
        )}
        {activeTab === 'FAMILY PLANNING' && (
            <FamilyPlanningDetails
                selectedRow={specificHistoryData}
                myProfile={myProfile}
                activeTab={activeTab}
                handleCloseHistoryDetails={handleCloseHistoryDetails}
            />
        )}
        {activeTab === 'OTHER SERVICES' && (
            <OtherServicesDetails
                selectedRow={specificHistoryData}
                myProfile={myProfile}
                activeTab={activeTab}
                handleCloseHistoryDetails={handleCloseHistoryDetails}
            />
        )}
    </div>
  );
};

export default HistoryDetails;
