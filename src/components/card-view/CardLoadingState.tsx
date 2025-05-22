
import React from "react";

const CardLoadingState: React.FC = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="text-center">
        <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-vistafy-purple border-t-transparent mx-auto"></div>
        <p>Loading business card...</p>
      </div>
    </div>
  );
};

export default CardLoadingState;
