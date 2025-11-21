# PeerShare
PeerShare is a peer-to-peer file sharing tool. No uploads to server is required, files are transfered directly between devices. A direct WebRTC connection is created between two devices using STUN servers from Google and Cloudflare.
Files are sent in chunks over DataChannel and saved into IndexedDB on the receiver’s side. The chunks are finally assembled together to form the complete file at the end.

This project was made for [Midnight Hackathon](https://midnight.hackclub.com) organized by Hack Club.

## Features
* Direct P2P file transfer using WebRTC
* Live speed, progress and transfer status
* Chunked sending (for fast, less memory usage and stable throughput)
* Chunks are saved in IndexedDB and assembled at the end
* Modal based connection request
* Live peer nickname updates
* Uses socket.io for initial communication between devices
* Files do not go through servers

## Screenshots
<img src=assets/screenshot1.png alt="SCREENSHOT"/>
<img src=assets/screenshot2.png alt="SCREENSHOT"/>

## Usage

### 1. Clone the repo
```bash
git clone https://github.com/realBoltDev/peer-share.git
```

---
### 2. Frontend Setup
* Rename `.env.example` to `.env.development` or `.env.production` as needed and add ENVIORNMENT variable values.

```bash
cd frontend
npm install
npm run dev
```

---
### 3. Backend Setup
* Rename `.env.example` to `.env.development` or `.env.production` as needed and add ENVIORNMENT variable values.
* If you want to run in production mode, you'll need to pass `NODE_ENV=production` in command.

```bash
cd backend
npm install
npm run dev
```

### Redis
If you don’t have Redis installed, the easiest way is running through Docker:

```bash
docker run -p 6379:6379 redis
```

---
## How To Use
1. Open home and connect pages in same or different devices.
2. Get the peer id and connect from other device.
3. Accept the request. It should create an RTCPeerConnection and open DataChannel.
4. Select or drag-and-drop the files you would like to send.
5. Click the upload button and watch it transfer live.
6. Receiver gets file data in chunks and is written into IndexedDB
7. When done, chunks are assembled and file is available to save to device.

[View project development progress →](./PROGRESS.md)
