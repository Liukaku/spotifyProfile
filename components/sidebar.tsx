import { NextComponentType } from "next";
import Router from "next/router";
import Logo from "../imgs/Spotify_Icon_RGB_White.png";
import Image from "next/image";

const SideBar: NextComponentType = () => {
  const sidebarLink = (linkTo: string) => {
    console.log(linkTo);
    Router.push(`/${linkTo}`);
  };

  return (
    <div className="md:w-20 md:h-full w-full bottom-0 z-10 h-10 bg-black text-white table fixed">
      <div className="top-0 bg-black md:m-0 md:p-0">
        <div className="h-14 w-14 mx-auto md:absolute md:ml-3 md:mt-3">
          <Image src={Logo.src} layout="fill" />
        </div>
        <div className="md:table-cell flex align-middle h-full md:h-screen">
          <div
            onClick={() => sidebarLink("home")}
            className="h-28 table mx-auto md:w-full w-4/12 text-center hover:bg-zinc-700 md:hover:border-l-green-700 md:border-l-black md:border-l-2 md:border-t-0 hover:border-t-green-700 border-t-black border-t-2 duration-300 cursor-pointer"
          >
            <div className="table-cell mx-auto align-middle">
              <svg
                role="img"
                height="24"
                width="24"
                className="mx-auto "
                viewBox="0 0 24 24"
                style={{ fill: "white" }}
              >
                <path d="M13.5 1.515a3 3 0 00-3 0L3 5.845a2 2 0 00-1 1.732V21a1 1 0 001 1h6a1 1 0 001-1v-6h4v6a1 1 0 001 1h6a1 1 0 001-1V7.577a2 2 0 00-1-1.732l-7.5-4.33z"></path>
              </svg>
              <h5 className="w-4/5 mx-auto text-md font-semibold">Home</h5>
            </div>
          </div>
          <div
            onClick={() => sidebarLink("artists")}
            className="h-28 table mx-auto md:w-full w-4/12 text-center hover:bg-zinc-700 md:hover:border-l-green-700 md:border-l-black md:border-l-2 md:border-t-0 hover:border-t-green-700 border-t-black border-t-2 duration-300 cursor-pointer"
          >
            <div className="table-cell mx-auto align-middle">
              <img
                className="mx-auto table-cell align-middle"
                src="https://img.icons8.com/ios-glyphs/30/ffffff/stack-of-photos--v1.png"
              />
              <h5 className="w-4/5 mx-auto text-md font-semibold">
                Top Artists
              </h5>
            </div>
          </div>
          <div
            onClick={() => sidebarLink("tracks")}
            className="h-28 table mx-auto md:w-full w-4/12 text-center hover:bg-zinc-700 md:hover:border-l-green-700 md:border-l-black md:border-l-2 md:border-t-0 hover:border-t-green-700 border-t-black border-t-2 duration-300 cursor-pointer"
          >
            <div className="table-cell mx-auto align-middle">
              <svg
                className="mx-auto table-cell align-middle"
                xmlns="http://www.w3.org/2000/svg"
                style={{ fill: "white" }}
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M24 20.682c-.002 1.555-1.17 2.318-2.24 2.318-.903 0-1.76-.544-1.76-1.616 0-1.104 1.201-2.118 2.515-2.118.161 0 .323.015.485.047v-4.312l-6 1.229v5.45c-.002 1.556-1.18 2.32-2.258 2.32-.906 0-1.742-.542-1.742-1.61 0-1.106 1.201-2.125 2.518-2.125.16 0 .322.015.484.047v-6.52l7.998-1.792v8.682zm-13-6.682c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3zm0-1c1.103 0 2-.897 2-2s-.897-2-2-2-2 .897-2 2 .897 2 2 2zm-1.818 2.646c-1.293-.508-2.319-1.534-2.827-2.827l-1.025.128c.6 1.746 1.979 3.125 3.725 3.724l.127-1.025zm-4.869-2.572l-1 .125c.757 2.648 2.84 4.731 5.488 5.488l.125-1c-2.194-.683-3.93-2.418-4.613-4.613zm8.505-6.72c1.293.508 2.319 1.534 2.827 2.828l1.025-.128c-.6-1.746-1.979-3.125-3.725-3.725l-.127 1.025zm-1.771 15.644c.082-.734.378-1.441.878-2.045-.304.03-.613.047-.925.047-4.963 0-9-4.038-9-9s4.037-9 9-9c4.912 0 8.91 3.957 8.992 8.849l1.978-.443c-.311-5.798-5.096-10.406-10.97-10.406-6.075 0-11 4.925-11 11s4.925 11 11 11l.047-.002zm2.151-18.685l-.125 1c2.195.682 3.931 2.418 4.613 4.613l1-.125c-.755-2.648-2.838-4.732-5.488-5.488z" />
              </svg>
              <h5 className="w-4/5 mx-auto text-md font-semibold">Top Songs</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
