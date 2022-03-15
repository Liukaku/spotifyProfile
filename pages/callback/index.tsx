import React from "react";
import Head from "next/head";
import useRouter from "next/router";
import axios from "axios";
import { useState, useEffect } from "react";
import { NextPage } from "next";
import Modal from "../../components/modal";
import Artist from "../../components/artist";
import Profile from "../../components/profile";
import Tracks from "../../components/tracks";
import Router from "next/router";

interface TheState {
  music: any;
  tracks: any;
  profile: any;
  following: any;
  playlists: any;
  loading: boolean;
}

export const Index: NextPage = () => {
  const [token, updateToken] = useState<TheState>({
    music: {},
    tracks: {},
    profile: {},
    following: {},
    playlists: {},
    loading: true,
  });

  const client = "db7d70beb5d14841b699b7df68b56a1c";
  const secret = "1316d41696ed444f88a9365c755eb8f2";

  useEffect(() => {
    let useStorage = false;
    if (parseInt(localStorage.getItem("Expires")) > new Date().getTime()) {
      useStorage = true;
    }
    console.log(parseInt(localStorage.getItem("Expires")));
    console.log(localStorage.getItem("Token"));
    if (Object.keys(token.music).length === 0) {
      getEverything(useStorage);
    }
  }, []);

  const getEverything = (useStorage: boolean) => {
    console.log(useStorage);
    if (useStorage) {
      console.log("using stored token");
      const expiresIn = parseInt(localStorage.getItem("Expires"));
      const theAuth = localStorage.getItem("Token");
      getTheRest(theAuth, expiresIn);
    } else {
      const accessCode: string = window.location.search
        .split("&state")[0]
        .replace("?code=", "");

      fetch("https://accounts.spotify.com/api/token", {
        method: "post",
        body: `grant_type=authorization_code&code=${accessCode}&redirect_uri=http://localhost:3000/callback`,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${Buffer.from(`${client}:${secret}`).toString(
            "base64"
          )}`,
        },
      })
        .then((res) => {
          let tokens: object = res.body;
          return res.json();
        })
        .then((data) => {
          console.log(data);
          const accessToken = data;
          if (accessToken.error) {
            window.location.assign("/?error");
            console.log("there has been an error");
          } else {
            getTheRest(data.access_token, data.expires_in);
          }
        });
    }
  };

  const getTheRest = (access: string, expires: number) => {
    fetch("https://api.spotify.com/v1/me/top/artists", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((res: object) => {
        console.log(res);

        const songs = res;
        fetch("https://api.spotify.com/v1/me", {
          method: "get",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access}`,
          },
        })
          .then((res) => {
            return res.json();
          })
          .then((res: object) => {
            const profileRes = res;
            fetch("https://api.spotify.com/v1/me/following?type=artist", {
              method: "get",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${access}`,
              },
            })
              .then((res) => {
                return res.json();
              })
              .then((res: object) => {
                const followingRes = res;
                fetch("https://api.spotify.com/v1/me/playlists", {
                  method: "get",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${access}`,
                  },
                })
                  .then((res) => {
                    return res.json();
                  })
                  .then((res: object) => {
                    const playlistRes = res;

                    fetch("https://api.spotify.com/v1/me/top/tracks", {
                      method: "get",
                      headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${access}`,
                      },
                    })
                      .then((res) => {
                        return res.json();
                      })
                      .then((res: object) => {
                        localStorage.setItem("Token", access);
                        localStorage.setItem(
                          "Expires",
                          `${new Date().getTime() + expires * 100}`
                        );
                        const topTracks = res;
                        updateToken({
                          music: songs,
                          tracks: topTracks,
                          profile: profileRes,
                          following: followingRes,
                          playlists: playlistRes,
                          loading: false,
                        });
                      });
                  });
              });
          });
      });
  };

  const sidebarLink = (linkTo: string) => {
    Router.push(`/${linkTo}`);
  };

  if (token.loading === false) {
    return (
      <div className="w-100 h-screen w-screen flex">
        <Head>
          <title>Spotify Profile</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div
          onClick={() => sidebarLink("home")}
          className="w-1/8 h-full bg-black text-white table fixed"
        >
          <div className=" top-0 bg-black">
            <div className="table-cell align-middle h-screen">
              <div className="h-28 table mx-auto w-full text-center hover:bg-zinc-700 hover:border-l-green-700 border-l-black border-l-2 duration-300 cursor-pointer">
                <div className="table-cell align-middle">
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
                className="h-28 table  mx-auto w-full text-center hover:bg-zinc-700 hover:border-l-green-700 border-l-black border-l-2 duration-300 cursor-pointer"
              >
                <div className="table-cell align-middle">
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
                className="h-28 table  mx-auto w-full text-center hover:bg-zinc-700 hover:border-l-green-700 border-l-black border-l-2 duration-300 cursor-pointer"
              >
                <div className="table-cell align-middle">
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
                  <h5 className="w-4/5 mx-auto text-md font-semibold">
                    Top Songs
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="gradient w-full h-full pl-10">
          <Profile
            props={token.profile}
            playlists={token.playlists.total}
            following={token.following.artists.total}
          />
          <div className="w-11/12 h-5/6 flex mx-auto">
            <div className="w-1/2 h-1/2">
              <div className=" flex justify-between">
                <h1 className="text-white font-extrabold ml-20 pt-2 mt-5">
                  Top Songs
                </h1>
                <a className="text-white font-extrabold mr-64 mt-5 rounded-full border border-white border-solid pt-2 pb-2 px-4">
                  See More
                </a>
              </div>
              {token.tracks.items.map((item: object, i: number) => {
                if (i < 5) {
                  return <Tracks props={token.tracks.items[i]} modal={false} />;
                }
              })}
            </div>
            <div className="w-1/2 h-5/6 ">
              <div className=" flex justify-between">
                <h1 className="text-white font-extrabold ml-20 pt-2 mt-5">
                  Top Artists
                </h1>
                <a className="text-white font-extrabold mr-64 mt-5 rounded-full border border-white border-solid pt-2 pb-2 px-4">
                  See More
                </a>
              </div>
              {token.music.items.map((item: object, n: number): JSX.Element => {
                if (n < 5) {
                  //TODO: create a component for this to display within so they can each have their own modal
                  return <Artist data={token.music.items[n]} key={n} />;
                }
              })}
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <div>loading...</div>;
  }
};

export default Index;
