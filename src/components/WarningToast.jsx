import { Croissant, X } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function WarningToast() {
  const navigate = useNavigate();
  const redirectToLoginPage = () => navigate("/");
  return (
    <div
      className="flex justify-between p-4 mb-4 rounded-lg bg-red-800"
      role="alert"
    >
      <span className="font-semibold text-white">Username and Password doesn't match in the database</span>
      <button onClick={redirectToLoginPage} className="text-white"><X /></button>
    </div>
  );
}
