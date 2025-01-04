import React from "react";

const Footer = () => {
  return (
    <footer className="absolute bottom-23 w-full mt-10 bg-orange-100 text-black flex flex-col items-center justify-center p-5 rounded-lg">
      <p className="text-center text-3xl font-bold">�� 2025 To-Do List App. All rights reserved.</p>
      <p className="text-center ">
        <span className="font-semibold mr-2 p-5 m-5 text-xl">Developed by @PANTHER</span>
      </p>
      <ul className="flex flex-col items-center justify-center p-10">
        <h1 className="text-3xl font-bold"> Join Me:</h1>
        <li className="p-2 font-semibold text-xl">
            <a href="https://github.com/UmairDevloper">
              GitHub
            </a>
        </li>
        <li className="p-5 font-semibold text-xl">
            <a>
                muhammadumairullah669@gmail.com
            </a>
        </li>

      </ul>
    </footer>
  );
};

export default Footer;
