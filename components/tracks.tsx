import React, { useEffect } from "react";

interface InitialProps {
  props: TrackObj;
  modal: boolean;
}

interface TrackObj {
  album: TrackAlbum;
  artists: Array<artistsObj>;
  duration_ms: number;
  name: string;
}

interface artistsObj {
  name: string;
}

interface TrackAlbum {
  artists: Array<object>;
  images: Array<TrackImages>;
}

interface TrackImages {
  height: number;
  url: string;
  width: number;
}

export type { TrackObj, artistsObj, TrackAlbum, TrackImages };

const Tracks = (props: InitialProps) => {
  const theTrack = props.props;
  const modal = props.modal;

  const mins = Math.floor((theTrack.duration_ms / 1000 / 60) << 0).toString();
  let sec = Math.floor((theTrack.duration_ms / 1000) % 60).toString();
  //this will add convert 1:4 to 1:04 track length
  if (parseInt(sec) < 10) {
    sec = "0" + sec;
  }

  return (
    <div
      className={
        !modal
          ? "w-full flex flex-wrap mt-10 ml-5"
          : "w-9/12 flex flex-wrap mt-10 mx-auto"
      }
    >
      <div
        className="w-20 h-20 bg-center bg-contain cursor-pointer"
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
    </div>
  );
};

export default Tracks;
