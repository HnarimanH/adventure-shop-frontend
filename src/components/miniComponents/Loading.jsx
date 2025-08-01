// src/components/Loading.jsx
import React from "react";

const Loading = () => {
  return (
    <div className="fixed inset-0 bg-white/50 backdrop-blur-2xl z-50 flex items-center justify-center">
      <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-blue-400 border-solid"></div>
    </div>
  );
};

export default Loading;