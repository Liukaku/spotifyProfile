import React from "react";
import useRouter from "next/router";
import axios from "axios";
import { useState, useEffect } from "react";

export const index = () => {
  const [token, updateToken] = useState<object>({});

  const query: any = useRouter;
  const client: string = "db7d70beb5d14841b699b7df68b56a1c";
  const secret: string = "1316d41696ed444f88a9365c755eb8f2";

  useEffect(() => {
    //const accessCode: string = query.router.query.code;
    if (Object.keys(token).length === 0) {
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
            console.log("allo");
            if (localStorage.getItem("bearer")) {
              console.log("using stored token");
              fetch("https://api.spotify.com/v1/me/top/artists", {
                method: "get",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${localStorage.getItem("bearer")}`,
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
                      Authorization: `Bearer ${localStorage.getItem("bearer")}`,
                    },
                  })
                    .then((res) => {
                      return res.json();
                    })
                    .then((res: object) => {
                      localStorage.setItem("bearer", accessToken.access_token);
                      updateToken({
                        token: accessToken,
                        music: songs,
                        profile: res,
                      });
                    });
                });
            } else {
              console.log("no token in storage");
            }
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
                    localStorage.setItem("bearer", accessToken.access_token);
                    updateToken({
                      token: accessToken,
                      music: songs,
                      profile: res,
                    });
                  });
              });
          }
        });
    }
  }, []);

  if (Object.keys(token).length !== 0) {
    return (
      <div className="w-100 h-screen w-screen flex">
        <div className="w-1/5 bg-black"></div>
        <div className="gradient w-full h-full">
          <div className="w-4/5 mx-auto">
            <img
              className="mx-auto rounded-full"
              src={token.profile.images[0].url}
            />
            <h1 className="spotifyGreen text-4xl">
              {token.profile.display_name}
            </h1>
          </div>
        </div>
      </div>
    );
  } else {
    return <div>loading...</div>;
  }
};

export default index;
