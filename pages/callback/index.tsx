import React from "react";
import useRouter from "next/router";
import axios from "axios";
import { useState, useEffect } from "react";

export const index = () => {
  const [token, updateToken] = useState({});

  const query: any = useRouter;
  const client: string = "db7d70beb5d14841b699b7df68b56a1c";
  const secret: string = "1316d41696ed444f88a9365c755eb8f2";

  useEffect(() => {
    //const accessCode: string = query.router.query.code;
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
        updateToken(data);
        document.cookie = data.access_token;

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
          .then((res) => {
            console.log(res);
          });
      });
  }, []);

  return <div>'hello'</div>;
};

export default index;
