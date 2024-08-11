import { Button, Frog, TextInput } from 'frog';
import { devtools } from 'frog/dev';
import { serveStatic } from 'frog/serve-static';
// import { neynar } from 'frog/hubs'
import { handle } from 'frog/vercel';

// Uncomment to use Edge Runtime.
// export const config = {
//   runtime: 'edge',
// }

export const app = new Frog({
  assetsPath: '/',
  basePath: '/api',
  // Supply a Hub to enable frame verification.
  // hub: neynar({ apiKey: 'NEYNAR_FROG_FM' })
  title: 'Frog Frame',
});

app.frame('/', (c) => {
  const { buttonValue, inputText, status } = c;
  const fruit = inputText || buttonValue;
  console.log(status);
  return c.res({
    action: '/character',
    image: (
      <div
        style={{
          alignItems: 'center',
          background: status === 'response' ? 'linear-gradient(to right, #432889, #17101F)' : 'black',
          backgroundSize: '100% 100%',
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'nowrap',
          height: '100%',
          justifyContent: 'center',
          textAlign: 'center',
          width: '100%',
        }}
      >
        <img src="/intro_banner.png" />
      </div>
    ),
    intents: [<Button>Reveal Your Allegiance</Button>],
  });
});

app.frame('/character', (c) => {
  const { buttonValue, inputText, status } = c;
  const isPunk = Math.random() > 0.5;
  return c.res({
    action: 'gameplay',
    image: (
      <div
        style={{
          alignItems: 'center',
          background: status === 'response' ? 'linear-gradient(to right, #432889, #17101F)' : 'black',
          backgroundSize: '100% 100%',
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'nowrap',
          height: '100%',
          justifyContent: 'center',
          textAlign: 'center',
          width: '100%',
        }}
      >
        <img src={isPunk ? '/punk.png' : '/fed.png'} />
      </div>
    ),
    intents: [<Button>Play</Button>],
  });
});

// @ts-ignore
const isEdgeFunction = typeof EdgeFunction !== 'undefined';
const isProduction = isEdgeFunction || import.meta.env?.MODE !== 'development';
devtools(app, isProduction ? { assetsPath: '/.frog' } : { serveStatic });

export const GET = handle(app);
export const POST = handle(app);
