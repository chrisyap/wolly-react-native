import { colors } from './colors';
import { rgba } from 'polished';

const shadows: Array<string> = [];
const steps = 25;

for (let i = 0; i < steps; i += 1) {
  const sha = `
  0 ${steps * i * 0.03}px ${steps * i * 0.05}px 0 ${rgba(colors.bluegrey, 0.1)}, 
  0 ${steps * i * 0.02}px ${steps * i * 0.1}px 0 ${rgba(colors.bluegrey, 0.1)}`;
  shadows.push(sha);
}

export { shadows };
