import React from 'react';

const PatientTable = ({ 
  filteredData, 
  handlePatientSelection, 
  patientDataSelected, 
  componentRef 
}) => {
  return (
    <div ref={componentRef}>
      <table className="table-auto">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-orange-500 dark:text-slate-800">
          <tr>
            <th scope="col" className="py-2">No</th>
            <th scope="col" className="py-2">Patient ID No.</th>
            <th scope="col" className="py-2">Name</th>
            <th scope="col" className="py-2">Sex</th>
            <th scope="col" className="py-2">Blood type</th>
            <th scope="col" className="py-2">Birthdate</th>
            <th scope="col" className="py-2">Purok</th>
            <th scope="col" className="py-2">Contact No.</th>
            <th scope="col" className="py-2">Date registered</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.length > 0 ? (
            filteredData.map((data, index) => (
              <tr
                key={index}
                onClick={() => handlePatientSelection(data)}
                className={`${
                  patientDataSelected.objectId === data.objectId ? 'bg-yellow-500' : 'bg-zinc-100'
                } border-b dark:border-gray-700 cursor-pointer`}
              >
                <td className="px-4 py-2 text-gray-900 whitespace-nowrap">{index + 1}</td>
                <td className="px-4 py-2 text-gray-900 whitespace-nowrap">{data.patientIdNo}</td>
                <td className="px-4 py-2 text-gray-900 whitespace-nowrap">
                  {data.lastname} {data.firstname}
                </td>
                <td className="px-4 py-2 text-gray-900 whitespace-nowrap">{data.sex}</td>
                <td className="px-4 py-2 text-gray-900 whitespace-nowrap">{data.bloodType}</td>
                <td className="px-4 py-2 text-gray-900 whitespace-nowrap">{data.bod}</td>
                <td className="px-4 py-2 text-gray-900 whitespace-nowrap">{data.purok}</td>
                <td className="px-4 py-2 text-gray-900 whitespace-nowrap">{data.contact}</td>
                <td className="px-4 py-2 text-gray-900 whitespace-nowrap">{new Date(data.createdAt).toLocaleDateString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9" className="px-4 py-2 text-center text-gray-500">
                No patients found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PatientTable;