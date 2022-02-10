import React, { useEffect } from "react";

interface InitialProps {
  props: TrackObj;
}

interface TrackObj {
  album: TrackAlbum;
  artist: Array<object>;
  duration_ms: number;
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

const Tracks = (props: InitialProps) => {
  const theTrack = props.props;

  return (
    <div className="w-full">
      <div
        className="w-20 h-20 bg-center bg-contain cursor-pointer"
        style={{ backgroundImage: `url(${theTrack.album.images[0].url})` }}
      ></div>
    </div>
  );
};

export default Tracks;
