"use client";
import NextImage from "next/image";
import { useState, useEffect } from "react";

const DEFAULT_IMAGE = "/assets/logo.png";

const MainImage = ({
  src,
  defaultImage = DEFAULT_IMAGE,
  imageClassName = "",
  alt = "Image",
  width = 200,
  height = 100,
  priority = false,
  preview,
  imageStyle,
  ...props
}) => {
  const [imgSrc, setImgSrc] = useState(src || defaultImage || DEFAULT_IMAGE);

  useEffect(() => {
    setImgSrc(src || defaultImage || DEFAULT_IMAGE);
  }, [src, defaultImage]);

  const validSrc = imgSrc || DEFAULT_IMAGE;

  return (
    <NextImage
      src={validSrc}
      alt={alt}
      width={width}
      height={height}
      className={`max-w-full h-auto ${imageClassName}`}
      priority={priority}
      loading={priority ? undefined : "lazy"}
      onError={() => setImgSrc(defaultImage || DEFAULT_IMAGE)}
      style={imageStyle}
      {...props}
    />
  );

};

export default MainImage;