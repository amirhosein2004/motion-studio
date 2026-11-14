import {loadFont} from '@remotion/fonts';
import {staticFile} from 'remotion';
export const fontReady=Promise.all([
  loadFont({family:'Vazirmatn',url:staticFile('fonts/Vazirmatn-Regular.woff2'),weight:'400'}),
  loadFont({family:'Vazirmatn',url:staticFile('fonts/Vazirmatn-Bold.woff2'),weight:'700'}),
]);
