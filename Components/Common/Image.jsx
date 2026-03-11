"use client";

import { Image } from "primereact/image";
import { useState } from "react";

const DEFAULT_IMAGE = "/images/default.png";

const MainImage = ({
  src,
  defaultImage = DEFAULT_IMAGE,
  imageClassName = "max-h-12 max-w-24",
  preview = true,
  alt = "Image",
  ...props
}) => {
  const [imgSrc, setImgSrc] = useState(src || defaultImage);

  return (
    <Image
      src={imgSrc}
      alt={alt}
      imageClassName={imageClassName}
      preview={preview}
      onError={() => setImgSrc(defaultImage)}
      {...props}
    />
  );
};

export default MainImage;