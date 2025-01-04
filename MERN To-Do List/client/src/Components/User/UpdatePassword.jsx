import React from 'react'
import * as Yup from "yup";
import { useFormik } from "formik";
import { FaLock } from "react-icons/fa";
import AlertMessage from '../Alert/AlertMessage';
import { updatePasswordAPI } from '../../Services/Users/userServices';
import { useMutation } from '@tanstack/react-query';
import { useDispatch } from "react-redux";
import { logoutAction } from '../../Redux/slice';


const validationSchema = Yup.object({
    password: Yup.string()
        .required("Password is required")
        .min(3, "Password must be at least 3 characters long"),
})
const UpdatePassword = () => {
    const dispatch = useDispatch();

    const { mutateAsync, isError, isSuccess, isLoading, error } = useMutation({
      mutationFn: updatePasswordAPI,
      mutationKey: ["updatePassword"],
    })
    const formik = useFormik({
        initialValues:{
            password: "",
        },
        validationSchema,
        onSubmit: (values) => {
            // submit the form
            console.log(values);
            mutateAsync(values.password)
              .then((data) => {
                dispatch(logoutAction());
                localStorage.removeItem("userInfo");
              })
              .catch((err) => {
                console.log(err);
              });
        },
    })


  return (
    <div>
      <form  onSubmit={formik.handleSubmit} className="  bg-orange-100  text-black flex flex-col items-center justify-center p-10 max-w-2xl mx-auto mt-10 ">
        <h1 className="text-5xl font-bold mb-4">
          Update Password
        </h1>
        <p className="text-2xl m-6">
          Enter your new password to update your account
        </p>
          {/* Display the messages */}
      {isLoading && <AlertMessage type={"loading"} message="Loading..." />}
      {isError && <AlertMessage type={"error"} message=" Something went wrong" />}
      {isSuccess && (
        <AlertMessage type={"success"} message={"Password Updated Success "} />
      )}
        <div className="relative mb-4">
          <FaLock className="absolute text-3xl text-gray-600 left-0 top-4 pl-3" />
          <input
            type="password"
            placeholder="New Password"
            name="newPassword"
            {...formik.getFieldProps("password")}
            className=" p-4 pl-10 w-full rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
          />
          {formik.touched.password && formik.errors.password && (
            <div className="text-red-500">{formik.errors.password}</div>
          )}
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded"
        >
          Update Password
          </button>
      </form>
    </div>
  )
}

export default UpdatePassword