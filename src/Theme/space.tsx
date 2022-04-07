// const space = [0, 2, 4, 8, 16, 32, 64, 128, 256, 512];
const space: Array<string> = [];
const spacer = 16;

for (let i = 0; i < 20; i += 1) {
  space.push(`${spacer * (i * 0.5)}px`);
}

export { space, spacer };
