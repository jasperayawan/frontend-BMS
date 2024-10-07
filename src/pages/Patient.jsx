import React, { useState, useRef } from "react";
import { PatientData } from "../helper/DummyData";
import PatientModal from "../components/PatientModal";

const Patient = () => {
  const [searchType, setSearchType] = useState("ALL");
  const [searchInput, setSearchInput] = useState("");
  const [isPrint, setIsPrint] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [patientData, setPatientData] = useState(null);

  const componentRef = useRef(null);

  const handleOpenModal = (data) => {
    setIsModalOpen(true);
    setPatientData(data);
  };

  const handlePrint = () => {
    const printContent = componentRef.current;
    const printWindow = window.open("", "_blank");
    setIsPrint(true);

    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Print Patient Data</title>
            <style>
              body {
                font-family: Arial, sans-serif;
              }
              table {
                width: 100%;
                border-collapse: collapse;
              }
              th, td {
                border: 1px solid #000;
                padding: 8px;
                text-align: left;
              }
              th {
                background-color: #f2f2f2;
              }
              .print-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 20px;
              }
              .print-header img {
                max-width: 100px; /* Adjust size as needed */
              }
              .profilePic{
                width: 150px;
                height: 150px;
              }
                .formContainer{
                  display: flex;
                  gap: 1.5rem;
                }
                  .InitInnerformContainer{
                  display: flex;
                  flex-direction: column;
                  gap: 0.5rem
                  }
                  .secondInnerformContainer{
                  display: flex;
                  flex-direction: column;
                  line-height: 1px;
                  }
                  .cuttLine{
                    display: flex;
                    align-items: start;
                  }
                .secondInnerformContainer_child{
                  display: flex;
                  flex-direction: row;
                  column-gap: 2rem;
                  margin-right: calc(1.25rem /* 20px */ * var(--tw-space-x-reverse));
                  margin-left: calc(1.25rem /* 20px */ * calc(1 - var(--tw-space-x-reverse)));
                }
                  .secondInnerformContainer_child h5{
                  font-size: 12px;
                  font-weight: 600;
                  text-transform: uppercase;
                  }
                  .secondFormContainer{
                    display: flex;
                    flex-direction: column;
                    line-height: 1px;
                  }
                    .secondFormContainer_child{
                    display: flex;
                    flex-direction: row;
                    column-gap: 16px;
                    }
                    .secondFormContainer_childData{
                      display: flex;
                      flex-direction: column;
                      align-items: start;
                    }
              .dtContainer{
               display: flex;
               flex-direction: column;
               align-items: start;
              }
               .dtContainer h6 {
                font-size: 12px;
                font-weight: 600;
                text-transform: uppercase;
               }
                .dtContainer p {
                font-size: 12px;
               }
                @media print {
                .no-print {
                  display: none;
                }
  }
            </style>
          </head>
          <body>
            <div class="print-header">
              <img src="/sanfranciscologo.svg" alt="San Francisco Logo" />
              <h2 style="color: #000000; text-align: center;">
                BARANGAY SAN FRANCISCO HEALTH CENTER<br/> MANAGEMENT SYSTEM
              </h2>
              <img src="/pagadianlogo.svg" alt="Pagadian Logo" />
            </div>
            ${printContent.innerHTML}
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
      setIsPrint(false); // Reset isPrint state after printing
    }
  };

  const filteredData = PatientData.filter((data) => {
    if (searchType === "ALL") {
      return true;
    } else if (searchType === "NAME") {
      return data.lastName.toLowerCase().includes(searchInput.toLowerCase());
    } else if (searchType === "BLOODTYPE") {
      return data.bloodType.toLowerCase().includes(searchInput.toLowerCase());
    } else if (searchType === "PUROK") {
      return data.purok.toLowerCase().includes(searchInput.toLowerCase());
    } else if (searchType === "HEALTHCARE SERVICES") {
      return data.healthcareService
        ?.toLowerCase()
        .includes(searchInput.toLowerCase());
    }
    return false;
  });

  return (
    <div className="flex justify-center items-center mt-20">
      {isModalOpen && (
        <PatientModal
          patientData={patientData}
          setIsModalOpen={setIsModalOpen}
          isModalOpen={isModalOpen}
          handlePrint={handlePrint}
          componentRef={componentRef}
        />
      )}
      <div className="flex flex-col gap-y-10">
        <h1 className="text-2xl flex justify-center items-center font-semibold">
          PATIENT LIST
        </h1>
        <div className="flex flex-col gap-y-3">
          <div className="flex flex-row justify-center items-center gap-x-2">
            <span>Search by:</span>
            <select
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
              className="px-4 py-1 rounded-[12px] bg-zinc-300 outline-none w-[150px]"
            >
              <option value="ALL">ALL</option>
              <option value="NAME">NAME</option>
              <option value="BLOODTYPE">BLOODTYPE</option>
              <option value="PUROK">PUROK</option>
              <option value="HEALTHCARE SERVICES">HEALTHCARE SERVICES</option>
            </select>
            {searchType !== "ALL" && (
              <input
                type="search"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="border-[1.5px] border-zinc-500 rounded-md py-1 px-3 outline-none"
                placeholder={`Search by ${searchType.toLowerCase()}`}
              />
            )}
          </div>

          <div ref={componentRef}>
            <table className="table-auto">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-orange-500 dark:text-slate-800">
                <tr>
                  <th scope="col" className="py-2">
                    No
                  </th>
                  <th scope="col" className="py-2">
                    Patient ID No.
                  </th>
                  <th scope="col" className="py-2">
                    Name
                  </th>
                  <th scope="col" className="py-2">
                    Sex
                  </th>
                  <th scope="col" className="py-2">
                    Blood type
                  </th>
                  <th scope="col" className="py-2">
                    Birthdate
                  </th>
                  <th scope="col" className="py-2">
                    Purok
                  </th>
                  <th scope="col" className="py-2">
                    Contact No.
                  </th>
                  <th scope="col" className="py-2">
                    Date registered
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((data) => (
                    <tr
                      key={data.id}
                      onClick={() => handleOpenModal(data)}
                      className="bg-white border-b dark:bg-gray-200 dark:border-gray-700 cursor-pointer"
                    >
                      <td className="px-4 py-2 text-gray-900 whitespace-nowrap">
                        {data.id}
                      </td>
                      <td className="px-4 py-2 text-gray-900 whitespace-nowrap">
                        {data.patientIdNo}
                      </td>
                      <td className="px-4 py-2 text-gray-900 whitespace-nowrap">
                        {data.lastName} {data.firstName}
                      </td>
                      <td className="px-4 py-2 text-gray-900 whitespace-nowrap">
                        {data.sex}
                      </td>
                      <td className="px-4 py-2 text-gray-900 whitespace-nowrap">
                        {data.bloodType}
                      </td>
                      <td className="px-4 py-2 text-gray-900 whitespace-nowrap">
                        {data.birthdate}
                      </td>
                      <td className="px-4 py-2 text-gray-900 whitespace-nowrap">
                        {data.purok}
                      </td>
                      <td className="px-4 py-2 text-gray-900 whitespace-nowrap">
                        {data.contactUs}
                      </td>
                      <td className="px-4 py-2 text-gray-900 whitespace-nowrap">
                        {data.dateRegistered}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="9"
                      className="px-4 py-2 text-center text-gray-500"
                    >
                      No patients found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex justify-center mt-5">
            <button
              onClick={handlePrint}
              className="bg-yellow-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Print
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Patient;
