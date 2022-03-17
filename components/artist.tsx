import React, { useEffect, useState } from "react";
import Modal from "./modal";
import Tracks from "./tracks";
import type { TrackObj, artistsObj, TrackAlbum, TrackImages } from "./tracks";

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
  };
  key: number;
  pageView: boolean;
}

interface imgObj {
  url: String;
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
        },
        duration_ms: 0,
        artists: [],
        name: "",
        id: "",
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
        console.log(res.tracks);
        console.log(secRes);
        updateArtist({
          albums: secRes,
          tracks: res.tracks,
          loading: false,
        });
      });
    });
  }, []);

  const importProps: PropsObj = props;

  return (
    <div
      className={
        importProps.pageView
          ? "h-1/12 w-2/12 flex  mt-10 ml-5 "
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
            ? "rounded-full w-32 h-32 bg-center bg-contain cursor-pointer"
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
              <div className="sticky top-0 modalWindow">
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
                <h1 className="text-center font-extrabold text-7xl">
                  {importProps.data.name}
                </h1>
                <div className="flex max-w-sm mx-auto text-center ">
                  {importProps.data.genres.map((item: string, n: number) => {
                    return <h3 className="mx-auto">{item}</h3>;
                  })}
                </div>
                <h2 className="text-center">
                  {importProps.data.followers.total} followers
                </h2>
              </div>
              <div className="w-9/12 mx-auto">
                <h1 className="text-xl font-bold mt-3 ml-36">Popular</h1>
                {artist.tracks.map((item, i) => {
                  if (i < 5) {
                    return <Tracks props={artist.tracks[i]} modal={true} />;
                  }
                })}
              </div>
              <h1 className="mt-10 mb-10 w-7/12 mx-auto">Albums</h1>
              <div className="flex w-full overflow-auto whitespace-nowrap pl-5 pr-5">
                {artist.albums.items.map((item, i) => {
                  if (artist.albums.items[i].album_type === "album") {
                    return (
                      <div className="min-w-alb ml-5 mr-5 w-auto rounded bg-zinc-900 hover:bg-zinc-800 duration-300 ease-in-out pl-2 pr-2">
                        <div
                          className="w-full h-44 bg-no-repeat bg-center bg-contain"
                          style={{
                            backgroundImage: `url(${artist.albums.items[i].images[0].url})`,
                          }}
                        />
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
