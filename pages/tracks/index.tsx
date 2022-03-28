import type { NextPage } from "next";
import Head from "next/head";
import Logo from "../imgs/Spotify_Icon_RGB_White.png";
import { useState, useEffect } from "react";
import Router from "next/router";
import Tracks from "../../components/tracks";
import SideBar from "../../components/sidebar";

interface TrackState {
  items: Array<TrackObj>;
  limit: number;
}

interface TrackObj {
  album: TrackAlbum;
  artists: Array<artistsObj>;
  duration_ms: number;
  name: string;
  id: string;
  popularity: number;
}

interface artistsObj {
  name: string;
}

interface TrackAlbum {
  artists: Array<object>;
  images: Array<TrackImages>;
  name: string;
  release_date: string;
}

interface TrackImages {
  height: number;
  url: string;
  width: number;
}

const TracksPage: NextPage = () => {
  const [trackState, updateTracks] = useState<TrackState>({
    items: [],
    limit: 50,
  });

  const [selected, updateSelected] = useState(0);

  useEffect(() => {
    const theAuth = localStorage.getItem("Token");
    fetchTracks(theAuth, "long_term").then((res) => {
      if (!res.error) {
        updateTracks(res);
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
        updateTracks(res);
      } else {
        localStorage.clear();
        window.location.assign("/?error");
      }
    });
  }, [selected]);

  const fetchTracks = async (authToken: string, termOption: string) => {
    try {
      const theFetch = await fetch(
        `https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=${termOption}`,
        {
          method: "get",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      const response: TrackState = await theFetch.json();
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
        <div className="w-2/5 pl-20 mx-auto">
          {trackState.items.map((track: TrackObj, i: number) => {
            return <Tracks key={i} props={track} modal={false} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default TracksPage;
