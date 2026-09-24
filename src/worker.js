// Atom Bench website worker: serves the app.
// (The ElevenLabs voice endpoint is parked in extras/elevenlabs-tts-worker.js until lessons are paid.)
export default {
  async fetch(req, env) {
    const url = new URL(req.url);
    if (url.pathname === '/api/health') return new Response(JSON.stringify({tts: false}), {headers: {'content-type': 'application/json'}});
    return env.ASSETS.fetch(req);
  }
};
