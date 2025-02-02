import React from "react";
function PromptMessage({ message }) {
  return (
    <div className="justify-end self-end px-5 py-2 rounded-md w-auto bg-[#0A1F2C] text-xs">
      {message}
    </div>
  );
}

export default PromptMessage;
