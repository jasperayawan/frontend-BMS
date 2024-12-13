import React from 'react';

const StatusToggle = ({ status, setStatus }) => {

  return (
    <div
      className="relative inline-flex items-center cursor-pointer"
      onClick={() => setStatus(status === "ACTIVE" ? "INACTIVE" : "ACTIVE")}
    >
      {/* Hidden Input */}
      <input
        type="checkbox"
        className="sr-only"
        checked={status === "ACTIVE"}
        readOnly
      />
      {/* Background */}
      <div
        className={`w-12 h-6 rounded-full shadow-inner transition-colors ${
          status === "ACTIVE" ? "bg-green-500" : "bg-gray-200"
        }`}
      ></div>
      {/* Toggle Knob */}
      <div
        className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${
          status === "ACTIVE" ? "transform translate-x-6" : "transform translate-x-0"
        }`}
      ></div>
    </div>
  );
};

export default StatusToggle;
