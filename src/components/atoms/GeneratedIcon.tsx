"use client";

import React, { FC, useRef, useEffect } from "react";
import Image from "next/image";

import { AVATAR_PIXELS } from "@/utils/constants";
import { buildOpts, renderIcon } from "@/utils/helper/generateIcon";
import { GeneratedIconProps } from "@/types";

const iconCache = new Map<string, string>(); // Cache of seed -> DataURL

export const GeneratedIcon: FC<GeneratedIconProps> = ({
  seed,
  size = AVATAR_PIXELS,
  scale = 4,
  ...others
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const dataURL = iconCache.get(seed);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!dataURL && canvas) {
      const opts = buildOpts({ seed, size, scale });
      renderIcon(opts, canvas);

      iconCache.set(seed, canvas.toDataURL());
    }
  }, [seed, size, scale, dataURL]);

  if (dataURL) {
    return (
      <Image
        src={dataURL}
        alt="avatar icon"
        width={size * scale}
        height={size * scale}
        {...others}
      />
    );
  }

  return <canvas ref={canvasRef} {...others} />;
};
