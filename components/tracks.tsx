import React, { useEffect, useState } from "react";
import Modal from "./modal";

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
          console.log(res);
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
    if (!modal) {
      toggleModal(true);
    }
  };

  return (
    <div
      className={
        !modal
          ? "w-full flex flex-wrap mt-10 ml-5"
          : "w-9/12 flex flex-wrap mt-10 mx-auto"
      }
    >
      <div
        onClick={() => {
          toggleModalFunc();
        }}
        className={
          !modal
            ? "w-20 h-20 bg-center bg-contain cursor-pointer"
            : "w-20 h-20 bg-center bg-contain"
        }
        style={{ backgroundImage: `url(${theTrack.album.images[0].url})` }}
      />
      <div
        className={
          !modal
            ? "w-7/12 flex flex-wrap justify-between"
            : "w-9/12 flex flex-wrap justify-between"
        }
      >
        {!modal ? (
          <div className=" w-4/5 ">
            <h1 className="mt-3 ml-5 font-bold text-white">{theTrack.name}</h1>
            <h2 className="mt-2 ml-5 font-medium text-gray-500">
              {theTrack.artists[0].name}
            </h2>
          </div>
        ) : (
          <div className=" w-4/5 ">
            <h1 className="mt-7 ml-5 font-bold text-white">{theTrack.name}</h1>
          </div>
        )}
        <div>
          <h2 className="mt-7 ml-5 font-medium text-gray-500">
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
                <div className="text-center">
                  <h1>{theTrack.name}</h1>
                  <div className="flex w-8/12 mx-auto">
                    <div
                      className={"w-40 h-40 bg-center bg-contain"}
                      style={{
                        backgroundImage: `url(${theTrack.album.images[0].url})`,
                      }}
                    />
                    <div className="w-60">
                      <h1 className="w-80 text-left ml-5">
                        {props.props.artists[0].name}
                      </h1>
                      <h1 className="w-80 text-left ml-5">
                        {props.props.album.name}
                      </h1>
                      <h1 className="w-80 text-left ml-5">
                        {props.props.album.release_date}
                      </h1>
                    </div>
                  </div>
                  <div className="w-full flex justify-evenly mt-3">
                    <div className="w-1/5">
                      <h2>
                        {mins}:{sec}
                      </h2>
                      <h3>Length</h3>
                    </div>
                    <div className="w-1/5">
                      <h2>{pitchClass[modalDetails.key]}</h2>
                      <h3>Key</h3>
                    </div>
                    <div className="w-1/5">
                      <h2>
                        {(trackAnalysis.track.mode = 1 ? "Major" : "Minor")}
                      </h2>
                      <h3>Modality</h3>
                    </div>
                    <div className="w-1/5">
                      <h2>{trackAnalysis.beats.length}</h2>
                      <h3>Beats</h3>
                    </div>
                  </div>
                  <div className="w-full flex justify-evenly mt-3">
                    <div className="w-1/5">
                      <h2>{props.props.popularity}%</h2>
                      <h3>Popularity</h3>
                    </div>
                    <div className="w-1/5">
                      <h2>{modalDetails.tempo}</h2>
                      <h3>BPM</h3>
                    </div>
                    <div className="w-1/5">
                      <h2>{trackAnalysis.sections.length}</h2>
                      <h3>Sections</h3>
                    </div>
                    <div className="w-1/5">
                      <h2>{trackAnalysis.track.time_signature}</h2>
                      <h3>Time Signature</h3>
                    </div>
                  </div>
                </div>
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
