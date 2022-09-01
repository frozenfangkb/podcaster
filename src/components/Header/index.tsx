import { Link } from "react-router-dom";
import React from "react";

export const Header: React.FC = () => {
  return (
    <div className="px-12 py-4 h-16 border-b border-gray-200">
      <Link to="/">
        <h2 className="text-blue-500">Podcaster</h2>
      </Link>
    </div>
  );
};
