import { Link } from "react-router-dom";
import React from "react";
import { useAppSelector } from "../../store/hooks";
import { selectLoading } from "../../store/slices/loadingSlice";
import BounceLoader from "react-spinners/BounceLoader";

export const Header: React.FC = () => {
  const loading = useAppSelector(selectLoading);

  return (
    <div className="px-12 py-4 h-16 border-b border-gray-200 flex w-full bg-white">
      <div className="flex justify-start items-center w-full">
        <Link to="/">
          <h2 className="text-blue-500">Podcaster</h2>
        </Link>
      </div>
      <div className="flex justify-end items-center w-full">
        <BounceLoader loading={loading} size={40} color="#60a5fa" />
      </div>
    </div>
  );
};
