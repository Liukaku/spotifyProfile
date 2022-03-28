import type { NextPage } from "next";
import Head from "next/head";
import Logo from "../imgs/Spotify_Icon_RGB_White.png";
import { useState, useEffect } from "react";
import Router from "next/router";
import Artist from "../../components/artist";
import SideBar from "../../components/sidebar";

interface AlbumState {
  items: Array<ArtistsObj>;
  limit: number;
}

interface ArtistsObj {
  data: {
    images: Array<imgObj>;
    name: String;
    genres: Array<string>;
    followers: {
      href: string | null;
      total: number;
    };
    id: string;
  };
  key: number;
}

interface imgObj {
  url: String;
}

const ArtistsPage: NextPage = () => {
  const [artistState, updateAlbums] = useState<AlbumState>({
    items: [],
    limit: 50,
  });

  const [selected, updateSelected] = useState(0);

  useEffect(() => {
    const theAuth = localStorage.getItem("Token");
    fetchTracks(theAuth, "long_term").then((res) => {
      if (!res.error) {
        updateAlbums(res);
      } else {
        localStorage.clear();
        window.location.assign("/?error");
      }
    });
  }, []);

  useEffect(() => {
    const optionArr = ["long_term", "medium_term", "short_term"];
    const theAuth = localStorage.getItem("Token");
    fetchTracks(theAuth, optionArr[selected]).then((res) => {
      if (!res.error) {
        updateAlbums(res);
      } else {
        localStorage.clear();
        window.location.assign("/?error");
      }
    });
  }, [selected]);

  const fetchTracks = async (authToken: string, termOption: string) => {
    try {
      const theFetch = await fetch(
        `https://api.spotify.com/v1/me/top/artists?limit=50&time_range=${termOption}`,
        {
          method: "get",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      const response: AlbumState = await theFetch.json();
      return response;
    } catch (error) {
      return error;
    }
  };

  const selection = [
    {
      key: 0,
      value: "All Time",
    },
    {
      key: 1,
      value: "Last 6 Months",
    },
    {
      key: 2,
      value: "Last 4 Weeks",
    },
  ];

  return (
    <div className="w-100 h-screen w-screen flex">
      <SideBar />
      <div className="w-full gradient">
        <div className="w-4/5 mt-10 text-white text-xl font-black flex mx-auto justify-between">
          <h1>Top Tracks</h1>
          <div className="flex">
            {selection.map((option, n) => {
              if (option.key === selected) {
                return <h1 className="underline  mr-2">{option.value}</h1>;
              } else {
                return (
                  <h1
                    onClick={() => {
                      updateSelected(option.key);
                    }}
                    className="cursor-pointer mr-2 text-gray-400"
                  >
                    {option.value}
                  </h1>
                );
              }
            })}
          </div>
        </div>
        <div className="w-4/5 flex flex-wrap pl-20 mx-auto">
          {artistState.items.map((artist: ArtistsObj | any, i: number) => {
            return <Artist data={artist} key={i} pageView={true} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default ArtistsPage;
