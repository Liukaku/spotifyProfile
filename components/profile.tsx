import React from "react";

interface Props {
  display_name: string;
  images: Array<ProfileImages>;
  followers: ProfileFollowers;
  id: number;
  product: string;
}

interface ProfileFollowers {
  href: string | null;
  total: number;
}

interface ProfileImages {
  height: number | null;
  width: number | null;
  url: string;
}

const Profile = (props: any) => {
  const stateProps: Props = props.props;
  console.log(props);
  console.log(stateProps);
  return (
    <div className="w-4/5 mx-auto mb-5 mt-5">
      <img
        className="mx-auto rounded-full"
        src={stateProps.images[0].url}
        height="100"
        width="100"
      />
      <h1 className="text-white text-4xl text-center">
        {stateProps.display_name}
      </h1>
      <div className="w-6/12   spotifyGreen flex mx-auto justify-around">
        <h1>{stateProps.followers.total}</h1>
        <h1>{props.following}</h1>
        <h1>{props.playlists}</h1>
      </div>
      <div className="w-6/12 text-white flex mx-auto justify-around">
        <h1>Followers</h1>
        <h1>Following</h1>
        <h1>Playlists</h1>
      </div>
    </div>
  );
};

export default Profile;
