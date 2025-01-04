import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { FaUser } from "react-icons/fa";
import { SlEnvolope } from "react-icons/sl";
import UpdatePassword from "./UpdatePassword";
import { updateProfileAPI } from "../../Services/Users/userServices";
import AlertMessage from "../Alert/AlertMessage";
import { useMutation } from "@tanstack/react-query";

const validationSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
});

const Profile = () => {
  const { mutateAsync, isError, isSuccess, isLoading, error } = useMutation({
    mutationFn: updateProfileAPI,
    mutationKey: ["updateProfile"],
  });
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
    },
    validationSchema,
    onSubmit: (values) => {
      // submit the form
      mutateAsync(values)
        .then((data) => console.log(data))
        .catch((err) => console.log(err));
    },
  });
  return (
    <div className="text-center p-10 ">
      <div className="text-5xl font-bold mb-4 text-center p-5 shadow-2xl w-1/2 mx-auto rounded-lg bg-orange-100 text-black">
        <h1> Hi! {formik.values.username}</h1>
      </div>
      <form
        onSubmit={formik.handleSubmit}
        className=" bg-orange-100 text-black flex flex-col items-center justify-center p-10 max-w-2xl mx-auto mt-10 "
      >
        <h1 className="text-5xl font-bold mb-4">Profile</h1>
        <p className="text-2xl m-6 ">Update your profile</p>
        {/* Display the messages */}
        {isLoading && <AlertMessage type={"loading"} message="Loading..." />}
        {isError && <AlertMessage type={"error"} message="Error in Updating Profile" />}
        {isSuccess && (
          <AlertMessage type={"success"} message={"Profile Updated Success "} />
        )}
        <div className="relative mb-4">
          <FaUser className="absolute text-3xl text-gray-600 left-0 top-4 pl-3" />
          <input
            type="text"
            placeholder="Username"
            name="username"
            {...formik.getFieldProps("username")}
            className=" p-4 pl-10 w-full rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
          />
          {formik.touched.username && formik.errors.username && (
            <div className="text-red-500">{formik.errors.username}</div>
          )}
        </div>
        <div className="relative mb-4">
          <SlEnvolope className="absolute text-3xl left-0 top-4 pl-3" />
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
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Update Profile
        </button>
      </form>
      <UpdatePassword />
    </div>
  );
};

export default Profile;
