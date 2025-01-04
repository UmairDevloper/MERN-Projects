import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { SlEnvolope } from "react-icons/sl";
import { FaLock } from "react-icons/fa";
import { loginAPI } from "../../Services/Users/userServices";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutAction } from "../../Redux/slice";
import { useEffect } from "react";
import AlertMessage from "../Alert/AlertMessage";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(3, "Password must be at least 3 characters long"),
});

const Login = () => {
  const { mutateAsync, isError,error, isPending, isSuccess, isLoading } = useMutation(
    {
      mutationFn: loginAPI,
      mutationKey: ["login"],
    }
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      // submit the form
      console.log(values);
      mutateAsync(values)
        .then((data) => {
          dispatch(logoutAction(data));
          localStorage.setItem("userInfo", JSON.stringify(data));
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });

  useEffect(() => {
    setTimeout(() => {
      if (isSuccess) {
        navigate("/dashboard");
      }
    }, 1000);
  }, [isLoading, isPending, isError]);
  return (
    <form
      onSubmit={formik.handleSubmit}
      className=" bg-orange-100 text-black flex flex-col items-center justify-center p-10 max-w-2xl mx-auto mt-10 "
    >
      <h1 className="text-5xl font-bold mb-4">Login</h1>
      <p className="text-2xl m-6 ">Enter your email and password to login</p>
      {/* Display the messages */}
      {isLoading && <AlertMessage type={"loading"} message="Loading..." />}
      {isError && <AlertMessage type={"error"} message="Login Failed! Invalid Credentials " />}
      {isSuccess && (
        <AlertMessage type={"success"} message={"Login Success "} />
      )}
      <div className="relative mb-4">
        <SlEnvolope className="absolute text-3xl text-gray-600 left-0 top-4 pl-3" />
        <input
          type="email"
          placeholder="Email"
          name="email"
          {...formik.getFieldProps("email")}
          className="p-4 pl-10 w-full rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
        />
        {formik.touched.email && formik.errors.email && (
          <div className="text-red-500">{formik.errors.email}</div>
        )}
      </div>
      <div className="relative mb-4">
        <FaLock className="absolute text-3xl text-gray-600 left-0 top-4 pl-3" />
        <input
          type="password"
          placeholder="Password"
          name="password"
          {...formik.getFieldProps("password")}
          className=" p-4 pl-10 w-full rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
        />
        {formik.touched.password && formik.errors.password && (
          <div className="text-red-500">{formik.errors.password}</div>
        )}
      </div>
      <div>
        <button
          type="submit"
          className="w-full p-4 rounded-lg text-white bg-blue-500 hover:bg-blue-600 focus:outline-none"
        >
          Sign In / Login
        </button>
      </div>
    </form>
  );
};

export default Login;
