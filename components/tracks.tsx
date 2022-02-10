import React from "react";

interface InitialProps {
  tracks: TrackProps;
}

interface TrackProps {
  href: string;
  items: Array<TrackObj>;
  limit: number;
  next: string;
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
  const theTracks = props.tracks;
  return <div></div>;
};

export default Tracks;
