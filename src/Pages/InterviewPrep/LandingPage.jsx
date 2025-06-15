import React, { useContext, useState } from "react";
import { APP_FEATURES } from "../../utils/data";
import Login from "../Auth/Login";
import SignUp from "../Auth/SignUp";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import ProfileInfoCard from "../../components/Cards/ProfileInfoCard";

const LandingPage = () => {
  const [currentPage, setCurrentPage] = useState("login");
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const loginChecker = () => {
    if (!user) {
      document.getElementById("my_modal_4").showModal();
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-base-100">
      {/* Navbar */}
      <div className="navbar bg-base-100 shadow-sm px-4 md:px-8">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl normal-case">Interview Prep</a>
        </div>
        <div className="flex items-center gap-4 flex-wrap">
          {/* Theme toggle */}
          <label className="flex cursor-pointer items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-current"
            >
              <circle cx="12" cy="12" r="5" />
              <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
            </svg>
            <input type="checkbox" value="dark" className="toggle theme-controller" />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-current"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          </label>

          {/* Auth CTA */}
          {user ? (
            <ProfileInfoCard />
          ) : (
            <button onClick={loginChecker} className="btn btn-success whitespace-nowrap">
              Login / Signup
            </button>
          )}
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-10 px-4 sm:px-6 lg:px-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left - Text */}
          <div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
              Ace Interviews with AI-Powered Learning
            </h2>
            <p className="text-base md:text-lg mb-6">
              Crack interviews with intelligent, personalized guidance.
              AI helps you learn faster, answer better, and stand out.
            </p>

            <div className="w-full">
              <button className="btn btn-success btn-wide mt-3 shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out">
                Get Started
              </button>
            </div>

            <ul className="space-y-4 mt-10">
              {APP_FEATURES.map((f) => (
                <li key={f.id} className="flex items-start gap-3">
                  <span className="bg-green-600 p-2 rounded-full">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span>{f.description}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right - Image */}
          <div className="w-full">
            <img
              src="https://d2xhtkw2dlln4s.cloudfront.net/wp-content/uploads/2017/03/Quick-Interview-Prep-Tips.png"
              alt="App Screenshot"
              className="w-full rounded-xl shadow-2xl border border-gray-300"
            />
          </div>
        </div>
      </section>

      {/* Modal */}
      <dialog id="my_modal_4" className="modal">
        <div className="modal-box w-11/12 md:w-3/5 lg:w-1/3 max-w-3xl">
          {currentPage === "login" ? <Login /> : <SignUp />}
          <div className="text-center mt-5">
            {currentPage === "login" ? (
              <p>
                Don’t have an account?
                <button onClick={() => setCurrentPage("signup")} className="btn btn-error ml-2">
                  Sign Up
                </button>
              </p>
            ) : (
              <p>
                Already have an account?
                <button onClick={() => setCurrentPage("login")} className="btn btn-error ml-2">
                  Login
                </button>
              </p>
            )}
          </div>
          <div className="modal-action">
            <form method="dialog">
              <button
                onClick={() => setCurrentPage("login")}
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              >
                ✕
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default LandingPage;
