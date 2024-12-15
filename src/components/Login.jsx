/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext.jsx";
import WarningToast from "./WarningToast.jsx";

const Login = () => {
  const navigate = useNavigate();
  const [userDetail, setUserDetail] = useState({
    username: "",
    password: "",
  });
  const { user, login } = useContext(UserContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(login(userDetail))
    if (login(userDetail)) {
      login(userDetail);
      navigate("/task");
    } else {
      navigate('/error')
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUserDetail((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRoute = () => {
    navigate("/signup");
  };

  return (
    <section className="bg-gray-5">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <h1 className="text-3xl mb-5 font-bold text-blue-800">
          Task Management
        </h1>
        <div className="w-full bg-blue-50 border-4 border-blue-700 rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-2xl font-bold leading-tight tracking-tight text-blue-900">
              Login in to your account
            </h1>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="flex mb-2 text-sm justify-start font-medium text-blue-900">
                  Username
                </label>
                <input
                  type="username"
                  name="username"
                  id="username"
                  value={userDetail.username}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="Username"
                  required
                />
              </div>
              <div>
                <label className="flex justify-start mb-2 text-sm font-medium text-blue-900">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={userDetail.password}
                  placeholder="••••••••"
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full text-white bg-blue-700 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Sign in
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{" "}
                <span
                  onClick={handleRoute}
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500 cursor-pointer"
                >
                  Sign up
                </span>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
