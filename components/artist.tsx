import React, { useState } from "react";
import Modal from "./modal";

interface PropsObj {
  data: {
    images: Array<imgObj>;
    name: String;
  };
  key: number;
}

interface imgObj {
  url: String;
}

const Artist = (props: PropsObj) => {
  const [modal, toggleModal] = useState(false);

  const importProps: PropsObj = props;

  return (
    <div
      className="h-1/12 w-10/12 flex  mt-10 ml-5"
      key={`album${importProps.key}`}
    >
      <div
        onClick={(e) => {
          toggleModal(true);
        }}
        className="rounded-full w-20 h-20 bg-center bg-contain cursor-pointer"
        style={{ backgroundImage: `url(${importProps.data.images[0].url})` }}
        // src={importProps.data.images[0].url}
      >
        <div className="w-full h-20 opacity-0 hover:opacity-100 transit ease-in-out duration-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            height="50"
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
      <h1
        onClick={(e) => {
          toggleModal(true);
        }}
        className="mt-7 ml-5 font-bold text-white cursor-pointer hover:underline"
      >
        {importProps.data.name}
      </h1>
      <Modal
        toggle={modal}
        content={
          <button
            onClick={(e) => {
              toggleModal(false);
            }}
          >
            {importProps.data.name}
          </button>
        }
      />
    </div>
  );
};

export default Artist;
