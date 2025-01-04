import React from "react";
import { MdSystemUpdateAlt } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { FaClockRotateLeft } from "react-icons/fa6";
import { TbGrowth } from "react-icons/tb";
import { BiCalendar } from "react-icons/bi";
import { FaRegUser } from "react-icons/fa";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <>
      <div className=" text-center bg-gray-800 text-white flex flex-col items-center justify-center p-20 ">
        <div className="text-5xl font-bold mb-4">
          <h1> Welcome To The Advance To-Do List </h1>
        </div>
        <div className="text-2xl m-8 font-bold text-green-500  ">
          <p>
            This is a simple To-Do List application built using React, Express,
            and MongoDB.
          </p>
        </div>
        <div className="flex gap-4 text-lg mt-4 ">
          <div className=" flex flex-col  items-center  ">
            <MdSystemUpdateAlt className="text-5xl " />
            <p className=" m-5">  Update Efficiently</p>
          </div>
          <div className=" flex flex-col items-center ">
            <CiEdit  className="text-5xl " />
            <p className=" m-5"> Customize Your Tasks</p>
          </div>
          <div className=" flex flex-col items-center ">
            <FaClockRotateLeft  className="text-5xl "/>
            <p className=" m-5"> Organize Your Tasks</p>
          </div>
        </div>
         {/* To Register */}
        <Link to="/register">
          <button className="bg-blue-500 hover:bg-blue-700 text-green font-bold py-4 px-6 rounded mt-8">
            Get Started
          </button>
        </Link>

      </div>
        <div className=" flex flex-col items-center">
          <h2 className=" text-3xl font-bold mt-8"> 
            Features: 
          </h2>
        </div>
        <div className="text-center m-5 flex gap-4 text-lg mt-4 justify-center items-center pt-9 ">
          <div className=" flex flex-col items-center p-4 bg-gray-300 rounded-md hover:scale-105 ">
            <BiCalendar className="text-8xl  " />
            <p className=" text-xl m-4">Keep Track Of Tasks</p>
          </div>
          <div className=" flex flex-col items-center p-4 bg-blue-300 rounded-md hover:scale-105 ">
            <TbGrowth className="text-8xl " />
            <p className=" text-xl m-4"> Be Punctual </p>
          </div>
          <div className=" flex flex-col items-center p-4 bg-green-300 rounded-md hover:scale-105">
            <FaRegUser className="text-8xl " />
            <p className=" text-xl m-4"> Complete Control</p>
          </div>
        </div>
        <div className= " text-center flex flex-col items-center bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 m-10  p-10">
          <h2 className=" text-5xl font-bold mt-8">
            Join Our Community!
          </h2>
          <p className=" text-3xl font-bold text-white p-5"> 
            Join us and be a part of our family. And this will help you to be punctual and successful.
          </p>
          <Link to="/register">
            <button className="bg-black text-white font-bold hover:bg-white hover:text-black hover:border-black border-2 py-4 px-6 rounded-full mt-8">
              Join Now For Free
            </button>
          </Link>
        </div>
    </>
  );
};

export default HomePage;
