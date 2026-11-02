# Meet: a Zoom-style web meeting app

Share a link, join from any browser. Camera, mic, screen share, chat.

## Run it (5 minutes)
1. Make a free project at https://cloud.livekit.io and copy the URL, API key, and API secret.
2. In this folder: `cp .env.example .env` and paste the three values in.
3. `npm install`
4. `npm start`, then open http://localhost:3000 and click "Start new meeting".
5. Copy the invite link and open it in a second browser tab or on your phone.

## Put it online
Deploy this folder to Render or Railway (build: `npm install`, start: `npm start`).
Add the three LIVEKIT_* values as environment variables. Camera and mic need HTTPS,
which both services provide.

## Next steps
Host controls, waiting room, login, recording, scheduling.
