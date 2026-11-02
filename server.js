require('dotenv').config();
const path = require('path');
const express = require('express');
const { AccessToken } = require('livekit-server-sdk');

const { LIVEKIT_URL, LIVEKIT_API_KEY, LIVEKIT_API_SECRET, PORT = 3000 } = process.env;
if (!LIVEKIT_URL || !LIVEKIT_API_KEY || !LIVEKIT_API_SECRET) {
  console.error('Missing LIVEKIT_URL, LIVEKIT_API_KEY or LIVEKIT_API_SECRET in .env');
  process.exit(1);
}

const app = express();
app.use(express.static(path.join(__dirname, 'public')));

// Issues a short-lived join token for one room.
app.get('/api/token', async (req, res) => {
  const room = String(req.query.room || '').replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 64);
  const name = String(req.query.name || 'Guest').slice(0, 40);
  if (!room) return res.status(400).json({ error: 'room is required' });

  const identity = `${name}-${Math.random().toString(36).slice(2, 8)}`;
  const at = new AccessToken(LIVEKIT_API_KEY, LIVEKIT_API_SECRET, {
    identity,
    name,
    ttl: '2h',
  });
  at.addGrant({ roomJoin: true, room, canPublish: true, canSubscribe: true, canPublishData: true });
  res.json({ token: await at.toJwt(), url: LIVEKIT_URL });
});

// Meeting links look like /room/abc-defg-hij
app.get('/room/:id', (_req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));

app.listen(PORT, () => console.log(`Meeting app running at http://localhost:${PORT}`));
