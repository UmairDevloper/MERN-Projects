import React from "react";
import { listTaskAPI } from "../../Services/Tasks/userTasks";
import { useQuery } from "@tanstack/react-query";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend);

const TaskChart = () => {
  const { data, error, isFetched, isSuccess } = useQuery({
    queryFn: listTaskAPI,
    queryKey: ["list-tasks"],
  });

  const task = data?.reduce(
    (acc, item) => {
      if (item?.status === "Pending") {
        acc.Pending += 1;
      } else if (item?.status === "Completed") {
        acc.Completed += 1;
      }
      return acc;
    },
    {
      Pending: 0,
      Completed: 0,
    }
  );

  const data1 = {
    labels: ["Completed", "Pending"],
    datasets: [
      {
        label: "Tasks Total",
        data: [task?.Completed, task?.Pending],
        backgroundColor: ["#468499", "#f08080" ],
        borderColor: ["#468499", "#f08080"],
        borderWith: 1,
        hoverOffset: 4,
      },
    ],
  };
  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          padding: 25,
          boxWidth: 12,
          font: {
            size: 14,
          },
        },
      },
      title: {
        display: true,
        text: "Completed vs Pending",
        font: {
          size: 18,
          weight: "bold",
        },
        padding: {
          top: 10,
          bottom: 30,
        },
      },
    },
    cutout: "70%",
  };

  return (
    <div className="mx-auto w-1/2 m-10 mt-10 my-8 p-6 bg-white rounded-lg shadow-xl border border-gray-200">
      <h1 className="text-2xl font-bold text-center mb-6">
        Tasks Status Overview
      </h1>
      <div style={{ height: "350px" }}>
        <Doughnut data={data1} options={options} />
      </div>
    </div>
  );
};

export default TaskChart;
