import React from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import AlertMessage from "../Alert/AlertMessage";
import { deleteTaskAPI, listTaskAPI } from "../../Services/Tasks/userTasks";

const ListsTask = () => {
  const { mutateAsync, isError, isSuccess, isLoading, error } = useMutation({
    mutationFn: deleteTaskAPI,
    mutationKey: ["delete-Task"],
  });

  const {
    data,
    error: listErr,
    refetch,
    isFetched,
    isSuccess: listSuccess,
  } = useQuery({
    queryFn: listTaskAPI,
    queryKey: ["list-tasks"],
  });
  console.log(data);
  //   const dataArray = data ? (Array.isArray(data) ? data : Object.values(data)) : [];
  // console.log([dataArray]);

  const handleDelete = (id) => {
    mutateAsync(id)
      .then((data) => {
        AlertMessage("Task deleted successfully", "success");
        refetch();
      })
      .catch((err) => {
        AlertMessage("Failed to delete task", "error");
        console.log(err);
      });
  };

  return (
    <div className=" flex flex-col p-5 max-w-xl mx-auto mt-10">
      <ul>
        {data?.map((task) => (
          <li
            className="p-5   space-y-4 bg-orange-100  text-black m-2 rounded-md "
            key={task?.id}
          >
            <div className="flex justify-between">
              <div>
                <h1 className=" text-2xl text-bold">{task?.title}</h1>
                <div className="flex flex-row ">
                  <span
                    className={`m-2 p-1 rounded-md ${
                      task?.status === "Pending"
                        ? "bg-black text-white"
                        : "bg-white text-black"
                    }`}
                  >
                    {task?.status}
                  </span>
                  <div className="m-2 bg-white rounded-md p-1">
                    {new Date(task?.date).toLocaleDateString()}
                  </div>
                </div>
                <p className="text-xl font-style-italic">{task?.description}</p>
              </div>
              <div className= "mt-5 space-x-3">
                <Link to={`/update-task/${task?._id}`}>
                  <button className="text-green-700 hover:text-green-900 size-45">
                    <FaEdit />
                  </button>
                </Link>
                <button
                  onClick={() => handleDelete(task?._id)}
                  className="text-red-700 hover:text-red-900 size-45"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListsTask;
