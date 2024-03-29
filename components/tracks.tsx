import React, { useEffect, useState } from "react";
import Modal from "./modal";
import TrackChart from "./trackChart";

interface InitialProps {
  props: TrackObj;
  modal: boolean;
}

interface TrackObj {
  album: TrackAlbum;
  artists: Array<artistsObj>;
  duration_ms: number;
  name: string;
  id: string;
  popularity: number;
  external_urls: {
    spotify: string;
  };
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

interface TrackShapeObj {
  acousticness: number;
  analysis_url: string;
  danceability: number;
  duration_ms: number;
  energy: number;
  id: string;
  instrumentalness: number;
  key: number;
  liveness: number;
  loudness: number;
  mode: number;
  speechiness: number;
  tempo: number;
  time_signature: number;
  track_href: string;
  type: string;
  uri: string;
  valence: number;
}

export type { TrackObj, artistsObj, TrackAlbum, TrackImages };

const Tracks = (props: InitialProps) => {
  const theTrack = props.props;
  const modal = props.modal;

  const [showModal, toggleModal] = useState(false);
  const [modalLoaded, updateLoading] = useState(false);
  const [modalDetails, updateModalDetails] = useState<TrackShapeObj | any>({});
  const [trackAnalysis, updateTrackAnalysis] = useState<Object | any>({});

  useEffect(() => {
    if (Object.keys(modalDetails).length === 0 && showModal) {
      getTrackMood().then((res) => {
        if (res.error) {
          localStorage.clear();
          window.location.assign("/?error");
        } else {
          updateModalDetails(res);
          getTrackAnalysis().then((response) => {
            if (response.error) {
              localStorage.clear();
              window.location.assign("/?error");
            } else {
              updateTrackAnalysis(response);
              updateLoading(true);
            }
          });
        }
      });
    }
  }, [showModal]);

  const getTrackMood = async () => {
    try {
      const request = await fetch(
        `https://api.spotify.com/v1/audio-features/${props.props.id}`,
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
    } catch (error) {
      return error;
    }
  };
  const getTrackAnalysis = async () => {
    try {
      const request = await fetch(
        `https://api.spotify.com/v1/audio-analysis/${props.props.id}`,
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
    } catch (error) {
      return error;
    }
  };

  const pitchClass = [
    "C",
    "C#/D♭",
    "D",
    "D#/E♭",
    "E",
    "F",
    "F#/G♭",
    "G",
    "G#/A♭",
    "A",
    "A#/B♭",
    "B",
  ];

  const mins = Math.floor((theTrack.duration_ms / 1000 / 60) << 0).toString();
  let sec = Math.floor((theTrack.duration_ms / 1000) % 60).toString();
  //this will add convert 1:4 to 1:04 track length
  if (parseInt(sec) < 10) {
    sec = "0" + sec;
  }

  const toggleModalFunc = () => {
    toggleModal(true);
  };

  return (
    <div
      className={
        !modal
          ? "w-full flex flex-wrap mt-10 md:ml-5 ml-0"
          : "md:w-9/12 w-full flex flex-wrap mt-10 mx-auto"
      }
    >
      <div
        onClick={() => {
          toggleModalFunc();
        }}
        className={
          !modal
            ? "w-20 h-20 bg-center bg-contain cursor-pointer"
            : "w-20 h-20 bg-center md:ml-0 ml-5 bg-contain cursor-pointer"
        }
        style={{ backgroundImage: `url(${theTrack.album.images[0].url})` }}
      />
      <div
        className={
          !modal
            ? "md:w-7/12 w-9/12 flex flex-wrap justify-between"
            : "md:w-9/12 w-7/12 md:ml-0 ml-1 flex flex-wrap justify-between"
        }
      >
        {!modal ? (
          <div className=" w-4/5 ">
            <h1 className="md:mt-3 ml-5 font-bold text-white">
              {theTrack.name}
            </h1>
            <h2 className="mt-2 ml-5 font-medium text-gray-500">
              {theTrack.artists[0].name}
            </h2>
          </div>
        ) : (
          <div className="w-4/5 ">
            <h1 className="md:mt-7 md:ml-5 font-bold text-white">
              {theTrack.name}
            </h1>
          </div>
        )}
        <div className="w-1/5">
          <h2 className="md:ml-5 ml-0 mt-5 font-medium text-gray-500">
            {mins}:{sec}
          </h2>
        </div>
      </div>
      <Modal
        toggle={showModal}
        content={
          modalLoaded ? (
            <div className="">
              <div className="sticky top-0 modalWindow">
                <button
                  className="top-1 right-0 rounded-full float-right sticky  w-6 mr-1  mt-1 "
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
                <div className="text-center">
                  <h1 className="spotifyBold text-2xl mb-5 md:pt-0 pt-5 w-11/12 mx-auto">
                    {theTrack.name}
                  </h1>
                  <div className="md:flex table-row md:w-8/12 w-10/12 mx-auto">
                    <div
                      className={
                        "md:w-40 table-cell w-52 h-40 bg-no-repeat bg-center bg-contain"
                      }
                      style={{
                        backgroundImage: `url(${theTrack.album.images[0].url})`,
                      }}
                    />
                    <div className="w-60 table-cell align-middle">
                      <h1 className="md:w-80 w-4/5 text-left ml-5 spotifyBold text-lg">
                        {props.props.artists[0].name}
                      </h1>
                      <h1 className="md:w-80 w-4/5 text-left ml-5 text-lg">
                        {props.props.album.name}
                      </h1>
                      <h1 className="md:w-80 w-4/5 text-left ml-5 text-zinc-500 mb-5">
                        {props.props.album.release_date}
                      </h1>
                      <a
                        className="bg-spotifyGreen p-4 rounded-full text-sm font-black"
                        target="_blank"
                        rel="noreferrer"
                        href={props.props.external_urls.spotify}
                      >
                        PLAY ON SPOTIFY
                      </a>
                    </div>
                  </div>
                  <div className="w-full flex justify-evenly mt-3">
                    <div className="w-1/5">
                      <h2 className="text-xl spotifyBold">
                        {mins}:{sec}
                      </h2>
                      <h3>Length</h3>
                    </div>
                    <div className="w-1/5">
                      <h2 className="text-xl spotifyBold">
                        {pitchClass[modalDetails.key]}
                      </h2>
                      <h3>Key</h3>
                    </div>
                    <div className="w-1/5">
                      <h2 className="text-xl spotifyBold">
                        {(trackAnalysis.track.mode = 1 ? "Major" : "Minor")}
                      </h2>
                      <h3>Modality</h3>
                    </div>
                    <div className="w-1/5">
                      <h2 className="text-xl spotifyBold">
                        {trackAnalysis.beats.length}
                      </h2>
                      <h3>Beats</h3>
                    </div>
                  </div>
                  <div className="w-full flex justify-evenly mt-3">
                    <div className="w-1/5">
                      <h2 className="text-xl spotifyBold">
                        {props.props.popularity}%
                      </h2>
                      <h3>Popularity</h3>
                    </div>
                    <div className="w-1/5">
                      <h2 className="text-xl spotifyBold">
                        {modalDetails.tempo}
                      </h2>
                      <h3>BPM</h3>
                    </div>
                    <div className="w-1/5">
                      <h2 className="text-xl spotifyBold">
                        {trackAnalysis.sections.length}
                      </h2>
                      <h3>Sections</h3>
                    </div>
                    <div className="w-1/5">
                      <h2 className="text-xl spotifyBold">
                        {trackAnalysis.track.time_signature}
                      </h2>
                      <h3>Time Signature</h3>
                    </div>
                  </div>
                </div>
                <TrackChart data={modalDetails} />
              </div>
            </div>
          ) : (
            ""
          )
        }
      />
    </div>
  );
};

export default Tracks;
