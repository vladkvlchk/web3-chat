interface IconOptions {
  seed: string;
  size: number;
  scale: number;
  color: string;
  bgColor: string;
  spotColor: string;
}

const randSeed = new Array(4);

function seedRand(seed: string) {
  randSeed.fill(0);
  for (let i = 0; i < seed.length; i++) {
    randSeed[i % 4] =
      (randSeed[i % 4] << 5) - randSeed[i % 4] + seed.charCodeAt(i);
  }
}

function rand() {
  const t = randSeed[0] ^ (randSeed[0] << 11);
  randSeed[0] = randSeed[1];
  randSeed[1] = randSeed[2];
  randSeed[2] = randSeed[3];
  randSeed[3] = randSeed[3] ^ (randSeed[3] >> 19) ^ t ^ (t >> 8);
  return (randSeed[3] >>> 0) / ((1 << 31) >>> 0);
}

function createColor() {
  const h = Math.floor(rand() * 360);
  const s = `${rand() * 60 + 40}%`;
  const l = `${(rand() + rand() + rand() + rand()) * 25}%`;
  return `hsl(${h},${s},${l})`;
}

export function buildOpts(opts: Partial<IconOptions>): IconOptions {
  const seed =
    opts.seed || Math.floor(Math.random() * Math.pow(10, 16)).toString(16);
  seedRand(seed);

  return {
    seed,
    size: opts.size || 8,
    scale: opts.scale || 4,
    color: opts.color || createColor(),
    bgColor: opts.bgColor || createColor(),
    spotColor: opts.spotColor || createColor(),
  };
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

export function renderIcon(opts: IconOptions, canvas: HTMLCanvasElement) {
  const imageData = createImageData(opts.size);
  const width = Math.sqrt(imageData.length);

  canvas.width = canvas.height = opts.size * opts.scale;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  ctx.fillStyle = opts.bgColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < imageData.length; i++) {
    if (imageData[i]) {
      const row = Math.floor(i / width);
      const col = i % width;
      ctx.fillStyle = imageData[i] === 1 ? opts.color : opts.spotColor;
      ctx.fillRect(col * opts.scale, row * opts.scale, opts.scale, opts.scale);
    }
  }
}
