import React from "react";
import { Video } from "cloudinary-react";

const VideoPlayer = () => {
  return (
    <Video
      cloudName="dfv8dnx20"
      publicId="elephants"
      key="elephants"
      controls
      autoPlay
      videoCodec={"auto"}
    />
  );
};

export default VideoPlayer;
