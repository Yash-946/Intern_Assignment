import React, { useState } from "react";
import axios from "axios";
import z from "zod";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Signup() {
  const history = useNavigate();
  const [isChecked, SetisChecked] = useState(false);
  const [signupdata, Setsignupdata] = useState({
    username: "",
    email: "",
    password: "",
    fullname: "",
    profile_picture: "",
  });

  const change = (e) => {
    const { name, value } = e.target;
    Setsignupdata({ ...signupdata, [name]: value });
  };

  const submit = async (e) => {
    if (
      signupdata.username == "" ||
      signupdata.email == "" ||
      signupdata.password == ""
    ) {
      toast.error("Input fiels empty");
    } else {
      const x = CheckInputFields(signupdata.username,signupdata.email,signupdata.password)
      console.log(x);

      if (x == true) {
        e.preventDefault();
        await axios
          .post("https://intern-assignment-fpe9.onrender.com/api/v1/signup", signupdata)
          .then((r) => {
            if (r.data.message === "error") {
              toast.error("Please select unique username and email")
            } else {
              toast.success("SignUP Successfull ");
              // console.log(r.data.token);
              storeToken(r.data.token)
              history("/post");
            }
          });
      }
      else{
       toast.error("Please check your inputs")
      }
    }
  };

  return (
    <div className="flex justify-center flex-col bg-orange-200 h-screen">
      <div className="flex justify-center bg-orange-200">
        <ToastContainer autoClose={1500} />
        <form className="p-3 bg-slate-200 shadow-orange-600 shadow-lg w-1/2 ">

          <div className="text-3xl font-extrabold mb-5 mt-4">Create an account</div>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Username *
            </label>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              name="username"
              placeholder="Enter your username"
              onChange={change}
              value={signupdata.username}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-90">
              Email address *
            </label>
            <input
              type="email"
              name="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter your email"
              onChange={change}
              value={signupdata.email}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Password *
            </label>
            <input
              type="password"
              name="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Password must be 8 character long"
              onChange={change}
              value={signupdata.password}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Full name
            </label>
            <input
              type="text"
              name="fullname"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter your full name"
              onChange={change}
              value={signupdata.fullname}
            />
          </div>
          <div className="mb-6">
            <div className="mb-6">
              <label
                className="block mb-2 text-sm font-medium text-gray-900"
                htmlFor="Profile_Picture"
              >
                Profile Picture
              </label>
              <input
                className="block w-full text-sm  text-gray-900 border border-gray-300 rounded-lg cursor-not-allowed bg-gray-50 focus:outline-none dark:border-gray-600 dark:placeholder-gray-400"
                name="Profile_Picture"
                type="file"
                accept=".png, .jpeg, .jpg"
                disabled
                onChange={change}
                value={signupdata.profile_picture}
              />
            </div>
          </div>
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="remember"
                type="checkbox"
                onChange={(e) => SetisChecked(e.target.checked)}
                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                required
              />
            </div>
            <label className="ms-2 text-sm font-medium text-gray-900">
              I agree with the{" "}
              <a
                href="#"
                className="text-blue-600 hover:underline dark:text-blue-500"
              >
                terms and conditions
              </a>
              .
            </label>
          </div>

          <button
            type="button"
            className={`mt-3 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 ${
              isChecked ? "cursor-pointer" : "cursor-not-allowed"
            }`}
            disabled={!isChecked}
            onClick={submit}
          >
            Submit
          </button>

        </form>
      </div>
    </div>
  );
}

function CheckInputFields(username,email,password) {
  const CheckValidation = z.object({
    username: z.string(),
    email: z.string().email(),
    password: z.string().min(8, "Password must be at least 8 characters long"),
  });
  
  const check = CheckValidation.safeParse({username,email,password});
  if(check.success != true){
    return check.error
  }
  return check.success;
}

function storeToken(token) {
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 7); 
  const tokenData = {
    value: token,
    expires: expirationDate.getTime() 
  };
  localStorage.setItem('token', JSON.stringify(tokenData));
}

export default Signup;