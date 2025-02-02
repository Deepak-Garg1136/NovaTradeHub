import React from "react";
function ResponseMessage({ message, error }) {
  return (
    <div
      className={`justify-end self-end px-5 py-2 rounded-md w-auto bg-[#0A1F2C] text-xs ${
        error != "" && "text-red-600"
      }`}
    >
      {error != "" ? error : message}
    </div>
  );
}

export default ResponseMessage;
