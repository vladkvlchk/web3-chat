"use client";

import { AVATAR_PIXELS } from "@/utils/constants";
import React, { FC, useRef, useEffect } from "react";

const randseed = new Array(4); // Xorshift: [x, y, z, w] 32 bit values

function seedrand(seed: string) {
  randseed.fill(0);
  for (let i = 0; i < seed.length; i++) {
    randseed[i % 4] =
      (randseed[i % 4] << 5) - randseed[i % 4] + seed.charCodeAt(i);
  }
}

function rand() {
  const t = randseed[0] ^ (randseed[0] << 11);
  randseed[0] = randseed[1];
  randseed[1] = randseed[2];
  randseed[2] = randseed[3];
  randseed[3] = randseed[3] ^ (randseed[3] >> 19) ^ t ^ (t >> 8);
  return (randseed[3] >>> 0) / ((1 << 31) >>> 0);
}

function createColor() {
  const h = Math.floor(rand() * 360);
  const s = `${rand() * 60 + 40}%`;
  const l = `${(rand() + rand() + rand() + rand()) * 25}%`;
  return `hsl(${h},${s},${l})`;
}

function createImageData(size: number) {
  const width = size;
  const height = size;
  const dataWidth = Math.ceil(width / 2);
  const mirrorWidth = width - dataWidth;

  const data: number[] = [];
  for (let y = 0; y < height; y++) {
    let row = [];
    for (let x = 0; x < dataWidth; x++) {
      row[x] = Math.floor(rand() * 2.3);
    }
    const r = row.slice(0, mirrorWidth).reverse();
    row = row.concat(r);
    data.push(...row);
  }

  return data;
}

function buildOpts(opts: Partial<IconOptions>): IconOptions {
  const seed =
    opts.seed || Math.floor(Math.random() * Math.pow(10, 16)).toString(16);
  seedrand(seed);

  return {
    seed,
    size: opts.size || 8,
    scale: opts.scale || 4,
    color: opts.color || createColor(),
    bgcolor: opts.bgcolor || createColor(),
    spotcolor: opts.spotcolor || createColor(),
  };
}

function renderIcon(opts: IconOptions, canvas: HTMLCanvasElement) {
  const imageData = createImageData(opts.size);
  const width = Math.sqrt(imageData.length);

  canvas.width = canvas.height = opts.size * opts.scale;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  ctx.fillStyle = opts.bgcolor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < imageData.length; i++) {
    if (imageData[i]) {
      const row = Math.floor(i / width);
      const col = i % width;
      ctx.fillStyle = imageData[i] === 1 ? opts.color : opts.spotcolor;
      ctx.fillRect(col * opts.scale, row * opts.scale, opts.scale, opts.scale);
    }
  }
}

interface IconOptions {
  seed: string;
  size: number;
  scale: number;
  color: string;
  bgcolor: string;
  spotcolor: string;
}

type AvatarIconProps = {
  seed: string;
  size?: number;
  scale?: number;
  className?: string;
};

export const GeneratedIcon: FC<AvatarIconProps> = ({
  seed,
  size = AVATAR_PIXELS,
  scale = 4,
  ...others
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const opts = buildOpts({ seed, size, scale });
      renderIcon(opts, canvasRef.current);
    }
  }, [seed, size, scale]);

  return <canvas ref={canvasRef} {...others} />;
};
