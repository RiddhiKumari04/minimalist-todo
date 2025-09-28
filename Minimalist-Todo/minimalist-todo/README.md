# Minimalist To-Do App (Scaffold)

This is a minimal ready-to-run scaffold for the **Minimalist To-Do App** (frontend + backend).
It's prepared so you can download, unzip, `npm install`, and run locally. Use it as the base for your project and expand features.

## Structure
- server/  -> Node.js + Express backend (MongoDB)
- client/  -> React frontend (Tailwind-ready)

## Quick start (local)
1. Unzip the project.
2. Backend:
   ```bash
   cd server
   npm install
   # create .env from .env.example and set MONGO_URI
   npm run dev
   ```
3. Frontend:
   ```bash
   cd client
   npm install
   npm start
   ```
4. Open http://localhost:3000

## Notes
- Tailwind is already configured in client; after `npm install` you may run the dev server.
- This scaffold includes a simple offline queue (localStorage) and basic notification scheduling while the app is open.

Good luck — ping me if you want me to extend this with CI badges, full IndexedDB offline, or push notifications.
