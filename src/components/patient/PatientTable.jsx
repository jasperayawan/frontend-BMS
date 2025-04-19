import React from 'react';

const PatientTable = ({ 
  filteredData = [], 
  handlePatientSelection, 
  patientDataSelected = {}, 
  componentRef, 
  onRowDoubleClick, 
  searchType, 
  searchInput,
  hasSearched,
  setIsPatientSelected 
}) => {
  const data = Array.isArray(filteredData) ? filteredData : [];

  return (
    <div ref={componentRef} className="overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left">
        <thead className="text-xs uppercase bg-gradient-to-r from-orange-400 to-orange-600 text-white">
          <tr>
            <th scope="col" className="px-4 py-3 text-black">No</th>
            <th scope="col" className="px-4 py-3 text-black">Patient ID No.</th>
            <th scope="col" className="px-4 py-3 text-black">Name</th>
            <th scope="col" className="px-4 py-3 text-black">Sex</th>
            <th scope="col" className="px-4 py-3 text-black">Blood type</th>
            <th scope="col" className="px-4 py-3 text-black">Birthdate</th>
            <th scope="col" className="px-4 py-3 text-black">Purok</th>
            <th scope="col" className="px-4 py-3 text-black">Contact No.</th>
            <th scope="col" className="px-4 py-3 text-black">Date registered</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((data, index) => (
              <tr
                key={index}
                onClick={() => {
                  handlePatientSelection(data)
                  setIsPatientSelected(true)
                }
                }
                onDoubleClick={() => onRowDoubleClick(data)}
                className={`${
                  patientDataSelected?.objectId === data?.objectId 
                    ? 'bg-yellow-100 hover:bg-yellow-200' 
                    : 'bg-white hover:bg-gray-50'
                } border-b transition duration-200 ease-in-out cursor-pointer`}
              >
                <td className="px-4 py-3 text-gray-900">{index + 1}</td>
                <td className="px-4 py-3 text-gray-900 font-medium">{data.patientIdNo}</td>
                <td className="px-4 py-3 text-gray-900">
                  {data.lastname} {data.firstname}
                </td>
                <td className="px-4 py-3 text-gray-900">{data.sex}</td>
                <td className="px-4 py-3 text-gray-900">{data.bloodType}</td>
                <td className="px-4 py-3 text-gray-900">{data.bod}</td>
                <td className="px-4 py-3 text-gray-900">{data.purok}</td>
                <td className="px-4 py-3 text-gray-900">{data.contact}</td>
                <td className="px-4 py-3 text-gray-900">{new Date(data.createdAt).toLocaleDateString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9" className="px-4 py-4 text-center text-gray-500 bg-white">
                {hasSearched && searchType === "BLOODTYPE" && searchInput 
                  ? `No patients found with blood type ${searchInput}`
                  : hasSearched 
                    ? "No patients found."
                    : data.length === 0 
                      ? "No patients available."
                      : null}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PatientTable;