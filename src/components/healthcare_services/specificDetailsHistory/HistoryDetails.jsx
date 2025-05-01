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
  handlePrint,
  componentRef,
  user
}) => {
  return (
    <div>
        {activeTab === 'PRENATAL CARE' && (
            <PrenatalHistoryDetails
                selectedRow={specificHistoryData}
                myProfile={myProfile}
                activeTab={activeTab}
                handleCloseHistoryDetails={handleCloseHistoryDetails}
                handlePrint={handlePrint}
                componentRef={componentRef}
                user={user}
            />
        )}
        {activeTab === 'IMMUNIZATION' && (
            <ImmunizationDetails
                selectedRow={specificHistoryData}
                myProfile={myProfile}
                activeTab={activeTab}
                handleCloseHistoryDetails={handleCloseHistoryDetails}
                handlePrint={handlePrint}
                componentRef={componentRef}
                user={user}
            />
        )}
        {activeTab === 'FAMILY PLANNING' && (
            <FamilyPlanningDetails
                selectedRow={specificHistoryData}
                myProfile={myProfile}
                activeTab={activeTab}
                handleCloseHistoryDetails={handleCloseHistoryDetails}
                handlePrint={handlePrint}
                componentRef={componentRef}
                user={user}
            />
        )}
        {activeTab === 'OTHER SERVICES' && (
            <OtherServicesDetails
                selectedRow={specificHistoryData}
                myProfile={myProfile}
                activeTab={activeTab}
                handleCloseHistoryDetails={handleCloseHistoryDetails}
                handlePrint={handlePrint}
                componentRef={componentRef}
                user={user}
            />
        )}
    </div>
  );
};

export default HistoryDetails;
