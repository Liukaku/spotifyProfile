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

interface TheState {
  token: any;
  music: any;
  tracks: any;
  profile: any;
  following: any;
  playlists: any;
}

export const index: NextPage = () => {
  const [token, updateToken] = useState<TheState>({
    token: {},
    music: {},
    tracks: {},
    profile: {},
    following: {},
    playlists: {},
  });

  const client = "db7d70beb5d14841b699b7df68b56a1c";
  const secret = "1316d41696ed444f88a9365c755eb8f2";

  useEffect(() => {
    //const accessCode: string = query.router.query.code;
    if (Object.keys(token.token).length === 0) {
      getEverything();
    }
  }, []);

  const getEverything = () => {
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
          fetch("https://api.spotify.com/v1/me/top/artists", {
            method: "get",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${data.access_token}`,
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
                  Authorization: `Bearer ${data.access_token}`,
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
                      Authorization: `Bearer ${data.access_token}`,
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
                          Authorization: `Bearer ${data.access_token}`,
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
                              Authorization: `Bearer ${data.access_token}`,
                            },
                          })
                            .then((res) => {
                              return res.json();
                            })
                            .then((res: object) => {
                              const topTracks = res;
                              updateToken({
                                token: accessToken,
                                music: songs,
                                tracks: topTracks,
                                profile: profileRes,
                                following: followingRes,
                                playlists: playlistRes,
                              });
                            });
                        });
                    });
                });
            });
        }
      });
  };

  if (Object.keys(token.token).length !== 0) {
    return (
      <div className="w-100 h-screen w-screen flex">
        <Head>
          <title>Spotify Profile</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="w-1/5 bg-black"></div>
        <div className="gradient w-full h-full">
          <Profile
            props={token.profile}
            playlists={token.playlists.total}
            following={token.following.artists.total}
          />
          <div className="w-full h-5/6 flex">
            <div className="w-1/2 h-1/2">
              {token.tracks.items.map((item: object, i: number) => {
                if (i < 5) {
                  return <Tracks props={token.tracks.items[i]} />;
                }
              })}
            </div>
            <div className="w-1/2 h-5/6 ">
              <div className=" flex justify-between">
                <h1 className="text-white font-extrabold ml-10 pt-2 mt-5">
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

export default index;
