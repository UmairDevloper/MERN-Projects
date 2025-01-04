import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useMutation, useQuery } from "@tanstack/react-query";
import AlertMessage from "../Alert/AlertMessage";
import { useNavigate, useParams } from "react-router-dom";
import { updateTaskAPI } from "../../Services/Tasks/userTasks";

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  date: Yup.date().required("Due Date is required"),
  status: Yup.string()
    .oneOf(["Pending", "Completed"])
    .required("Status is required"),
});

const UpdateTask = () => {
  const { id } = useParams();
  console.log(id);

  const navigate = useNavigate();

  const { mutateAsync, isError, error, isSuccess } = useMutation({
    mutationFn: updateTaskAPI,
    mutationKey: ["update-key"],
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      date: "",
      status: "",
    },
    validationSchema,
    onSubmit: (values) => {
      const data = {
        ...values,
        id,
      };
      // Your form submission logic here
      console.log(data);
      mutateAsync(data)
        .then((data) => {
          navigate("/lists-task");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className=" bg-orange-100  text-black flex flex-col p-5 max-w-xl mx-auto mt-10"
    >
      <div className="text-3xl   mb-4">
        <h1 className="text-3xl font-static text-center font-bold m-6">
          Task Updations
        </h1>
        <p className="text-xl font-italic text-center  m-6">
          Add the changes to your To-Do List
        </p>
      </div>
      <div className="relative mb-4">
        <label className="text-xl font-bold m-6" htmlFor="title">
          Title:
        </label>
        <input
          type="text"
          id="title"
          name="title"
          placeholder="Enter task title"
          className="max-w-xl h-12 p-4 pl-10 w-full rounded-full border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
          {...formik.getFieldProps("title")}
        />
        {formik.touched.title && formik.errors.title ? (
          <p className=" error text-red-800">{formik.errors.title}</p>
        ) : null}
      </div>
      <div className="relative mb-4">
        <label className="text-xl font-bold m-6" htmlFor="description">
          Description:
        </label>
        <textarea
          id="description"
          name="description"
          placeholder="Enter task description"
          className="max-w-xl h-15 p-4 pl-10 w-full rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
          {...formik.getFieldProps("description")}
        />
        {formik.touched.description && formik.errors.description ? (
          <p className=" error text-red-800">{formik.errors.description}</p>
        ) : null}
      </div>
      <div className="relative mb-4">
        <label className="text-xl font-bold m-6" htmlFor="date">
          Due Date:
        </label>
        <input
          type="date"
          id="date"
          name="date"
          className="max-w-xl h-12 p-4 pl-10 w-full rounded-full border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
          {...formik.getFieldProps("date")}
        />
        {formik.touched.date && formik.errors.date ? (
          <p className=" error text-red-800">{formik.errors.date}</p>
        ) : null}
      </div>
      <div className="relative mb-4">
        <label className="text-xl font-bold m-6 rounded-lg" htmlFor="status">
          Status:
        </label>
        <select
          id="status"
          name="status"
          className="max-w-xl h-15 p-4 pl-10 w-full rounded-full border-1 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
          defaultValue="Pending"
          {...formik.getFieldProps("status")}
        >
          <option value="">Select status type</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>
        {formik.touched.status && formik.errors.status ? (
          <p className=" error text-red-800">{formik.errors.status}</p>
        ) : null}
      </div>
      {/* Submit Button */}
      <div className="flex justify-center">
        <button
          type="submit"
          className="bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={formik.handleSubmit}
        >
          Update Task
        </button>
      </div>
    </form>
  );
};

export default UpdateTask;
