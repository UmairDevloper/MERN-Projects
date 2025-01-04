import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { FaUser } from "react-icons/fa";
import { SlEnvolope } from "react-icons/sl";
import { FaLock } from "react-icons/fa";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerAPI } from "../../Services/Users/userServices";
import AlertMessage from "../Alert/AlertMessage";
import { useEffect } from "react";
import { isPending } from "@reduxjs/toolkit";

const validationSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(3, "Password must be at least 3 characters long"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

const Register = () => {
  const { mutateAsync, isError, isSuccess, isLoading, error } = useMutation({
    mutationFn: registerAPI,
    mutationKey: ["register"],
  });

  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: (values) => {
      // submit the form
      console.log(values);
      mutateAsync(values)
        .then((data) => console.log(data))
        .catch((err) => {
          console.log(err);
        });
    },
  });

  useEffect(() => {
    setTimeout(() => {
      if (isSuccess) {
        navigate("/login");
      }
    }, 1000);
  }, [isLoading, isPending, isError]);
  return (
    <form
      onSubmit={formik.handleSubmit}
      className=" bg-orange-100  text-black flex flex-col items-center justify-center p-10 max-w-2xl mx-auto mt-10 "
    >
      <h1 className="text-5xl font-bold mb-4">Sign Up</h1>
      <p className="text-2xl m-6 ">Create a new account</p>
      {/* Display the messages */}
      {isLoading && <AlertMessage type={"loading"} message="Loading..." />}
      {isError && <AlertMessage type={"error"} message=" Registration Failed! Please try again " />}
      {isSuccess && (
        <AlertMessage type={"success"} message={"Registration Success "} />
      )}
      <div className="relative mb-4">
        <FaUser className="absolute text-3xl text-gray-600 left-0 top-4 pl-3" />
        <input
          type="text"
          placeholder="Username"
          name="username"
          {...formik.getFieldProps("username")}
          className="  p-4 pl-10 w-full rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
        />
        {formik.touched.username && formik.errors.username && (
          <div className="text-red-500">{formik.errors.username}</div>
        )}
      </div>
      <div className="relative mb-4">
        <SlEnvolope className="absolute text-3xl text-gray-600 left-0 top-4 pl-3" />
        <input
          type="email"
          placeholder="Email"
          name="email"
          {...formik.getFieldProps("email")}
          className=" p-4 pl-10 w-full rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
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
      <div className="relative mb-4">
        <FaLock className="absolute text-3xl text-gray-600 left-0 top-4 pl-3" />
        <input
          type="password"
          placeholder="Confirm Password"
          name="password"
          {...formik.getFieldProps("confirmPassword")}
          className=" p-4 pl-10 w-full rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
        />
        {formik.touched.confirmPassword && formik.errors.confirmPassword && (
          <div className="text-red-500">{formik.errors.confirmPassword}</div>
        )}
      </div>
      <div>
        <button
          type="submit"
          className="w-full p-4 rounded-lg text-white bg-blue-500 hover:bg-blue-600 focus:outline-none"
        >
          Sign Up / Register
        </button>
      </div>
    </form>
  );
};

export default Register;
