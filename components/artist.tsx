import React, { useEffect, useState } from "react";
import Modal from "./modal";
import Tracks from "./tracks";
import Logo from "../imgs/Spotify_Icon_RGB_White.png";
import type { TrackObj, artistsObj, TrackAlbum, TrackImages } from "./tracks";
import Image from "next/image";

interface PropsObj {
  data: {
    images: Array<imgObj>;
    name: String;
    genres: Array<string>;
    followers: {
      href: string | null;
      total: number;
    };
    id: string;
    external_urls: {
      spotify: string;
    };
  };
  key: number;
  pageView: boolean;
}

interface imgObj {
  url: string;
}

interface artistState {
  tracks: Array<TrackObj>;
  albums: {
    items: [
      {
        album_type: string;
        name: string;
        images: [{ url: string }];
        release_date: string;
      }
    ];
  };
  loading: boolean;
}

const Artist = (props: PropsObj) => {
  const [modal, toggleModal] = useState(false);
  const [artist, updateArtist] = useState<artistState>({
    tracks: [
      {
        album: {
          artists: [],
          images: [],
          name: "",
          release_date: "",
        },
        duration_ms: 0,
        artists: [],
        name: "",
        id: "",
        popularity: 0,
        external_urls: {
          spotify: "",
        },
      },
    ],
    albums: {
      items: [
        {
          album_type: "",
          name: "",
          images: [{ url: "" }],
          release_date: "",
        },
      ],
    },
    loading: true,
  });

  const getTracks = async (type: string) => {
    console.log(importProps.data);
    const request = await fetch(
      `https://api.spotify.com/v1/artists/${importProps.data.id}/${type}?country=GB`,
      {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
      }
    );
    const response = await request.json();
    return response;
  };

  useEffect(() => {
    getTracks("top-tracks").then((res) => {
      getTracks("albums").then((secRes) => {
        updateArtist({
          albums: secRes,
          tracks: res.tracks,
          loading: false,
        });
      });
    });
  }, [props]);

  const importProps: PropsObj = props;

  return (
    <div
      className={
        importProps.pageView
          ? "h-1/12 md:w-2/12 w-2/6 flex  mt-10 md:ml-5 "
          : "h-1/12 w-10/12 flex  mt-10 ml-5 "
      }
      key={`album${importProps.key}`}
    >
      <div
        onClick={(e) => {
          toggleModal(true);
        }}
        className={
          importProps.pageView
            ? "rounded-full md:w-32 w-28 h-28 md:h-32 bg-center bg-contain cursor-pointer"
            : "rounded-full w-20 h-20 bg-center bg-contain cursor-pointer"
        }
        style={{ backgroundImage: `url(${importProps.data.images[0].url})` }}
        // src={importProps.data.images[0].url}
      >
        <div
          className={
            importProps.pageView
              ? "w-full h-32 opacity-0 hover:opacity-100 transit ease-in-out duration-300"
              : "w-full h-20 opacity-0 hover:opacity-100 transit ease-in-out duration-300"
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={importProps.pageView ? "100" : "50"}
            height={importProps.pageView ? "100" : "50"}
            viewBox="0 0 24 24"
            className="ml-4 mt-4"
          >
            <path
              fill="white"
              d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-.001 5.75c.69 0 1.251.56 1.251 1.25s-.561 1.25-1.251 1.25-1.249-.56-1.249-1.25.559-1.25 1.249-1.25zm2.001 12.25h-4v-1c.484-.179 1-.201 1-.735v-4.467c0-.534-.516-.618-1-.797v-1h3v6.265c0 .535.517.558 1 .735v.999z"
            />
          </svg>
        </div>
      </div>
      {importProps.pageView ? (
        ""
      ) : (
        <h1
          onClick={(e) => {
            toggleModal(true);
          }}
          className="mt-7 ml-5 font-bold text-white cursor-pointer hover:underline"
        >
          {importProps.data.name}
        </h1>
      )}
      {artist.loading === true ? (
        ""
      ) : (
        <Modal
          toggle={modal}
          content={
            <div className="">
              <div className=" md:mt-24 mt-44 blur-lg absolute h-72 w-full opacity-50 bg-center" style={{backgroundImage: `url(${importProps.data.images[0].url})`}} />
              <div className="sticky top-0 modalHeaderBackground z-10">
                <button
                  className="absolute top-0 right-0 rounded-full   w-6 mr-1  mt-1 "
                  onClick={(e) => {
                    toggleModal(false);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="17"
                    height="17"
                    viewBox="0 0 50 50"
                    style={{ fill: "white", margin: "auto" }}
                  >
                    <path d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z"></path>
                  </svg>
                </button>
                <h1 className="text-center font-extrabold md:pt-0 pt-5 w-11/12 mx-auto md:text-7xl text-6xl">
                  {importProps.data.name}
                </h1>
              </div>

              <div className="relative h-64 w-64 mx-auto my-5 rounded-full shadow-lg shadow-black z-0">
                <Image
                  className="rounded-full"
                  src={importProps.data.images[0].url}
                  layout="fill"
                />
              </div>

              <div className="flex max-w-sm mx-auto text-center ">
                {importProps.data.genres.map((item: string, n: number) => {
                  return (
                    <h3 key={n} className="mx-auto">
                      {item}
                    </h3>
                  );
                })}
              </div>
              <h2 className="text-center mb-5">
                {importProps.data.followers.total} followers
              </h2>
              <div className="w-44 mx-auto">
                <a
                  className="bg-spotifyGreen p-4 rounded-full text-sm font-black"
                  rel="noreferrer"
                  target="_blank"
                  href={props.data.external_urls.spotify}
                >
                  PLAY ON SPOTIFY
                </a>
              </div>
              <div className="md:w-9/12 w-11/12 mx-auto">
                <h1 className="text-xl font-bold mt-3 ml-36">Popular</h1>
                {artist.tracks.map((item, i) => {
                  if (i < 5) {
                    return <Tracks props={artist.tracks[i]} modal={true} />;
                  }
                })}
              </div>
              <h1 className="mt-10 mb-10 w-7/12 mx-auto">Albums</h1>
              <div className="flex w-full overflow-auto whitespace-nowrap md:bg-inherit bg-album pl-5 pr-5">
                {artist.albums.items.map((item, i) => {
                  if (artist.albums.items[i].album_type === "album") {
                    return (
                      <div className="md:min-w-alb min-w-mobAlb ml-5 mr-5 w-auto rounded bg-zinc-900 hover:bg-zinc-800 duration-300 ease-in-out pl-2 pr-2 ">
                        <div
                          className="w-full h-44 bg-no-repeat bg-center bg-contain"
                          style={{
                            backgroundImage: `url(${artist.albums.items[i].images[0].url})`,
                          }}
                        >
                          <div className="w-full h-full opacity-0 hover:opacity-100 duration-100 ease-linear ">
                            <div className="relative w-3/6 mx-auto aspect-square md:top-6 top-16">
                              <Image
                                className=""
                                layout="fill"
                                src={Logo.src}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="whitespace-normal">
                          <h1>{artist.albums.items[i].name}</h1>
                          <h1 className="text-gray-500">
                            {artist.albums.items[i].release_date.split("-")[0]}
                          </h1>
                        </div>
                      </div>
                    );
                  }
                })}
              </div>
            </div>
          }
        />
      )}
    </div>
  );
};

export default Artist;
