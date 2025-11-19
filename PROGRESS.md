# PeerShare Development Log

### Nov 6, 2025
- Setup base project structure
- Added react router support for pages
- Refactored types and data
- Added icons in navbar

### Nov 8, 2025
- Migrated the whole project to Mantine from ShadCN as things kept breaking for me

### Nov 9, 2025
- Changed font to Russo One
- Isolated navigation data with types support
- Added main content for home page with proper padding & margin
- Added connection status with pulse dot

### Nov 10, 2025
- Added client info box which shows peer id and nickname
- Added nickname edit feature
- Moved client info and connection status in a grid
- Added file upload dropzone with diabled state handling
- I've used useState to store data and pass it down in components via props. Maybe I'll switch to zustand later.
- Added files display table with progress bar and action button. They're dummy and don't work right now.
- Made proper file size getter function i.e it shows in KB, MB, GB, TB.

### Nov 11, 2025
- Added incoming connection request modal on home page
- Added spinning icon on file upload in files table
- Added main content for connect page
- Added status panel on connect page which includes peer id, nickname and connection status
- Added connection request peer id input and button
- Moved some component function parameter types to types folder

### Nov 12, 2025
- Completed about page
- Added more connection status
- Added about card types

### Nov 13, 2025
- Added socket.io client to frontend
- Added zustand for persistent state management across pages
- Started working on backend of project with Node.js & Express.js
- Implemented socket.io server
- Added redis to store peer info
- Added random peer id generator function with collision check
- Added random nickname generator function
- Setup events for peer id and nickname to generate on page load

### Nov 14, 2025
- Initially I was using 2 separate repos for frontend and backend. Now I decided to move them into single repo.
- Spent an hour trying to safely move files. But I think it still got kind of messed up xd.
- Refactored socket and event related files
- Added connection events in server socket
- Added connection zustand state
- Added more events in both server and client sockets

### Nov 15, 2025
- I was busy all day so nothing new added but looked over some code.

### Nov 16, 2025
- Added an orange pulse dot css class for waiting status
- Added connect page zustand state for button etc.
- Used useEffect to set default values for component state
- Fixed redis code bugs
- Used slices and single store instead of multiple stores in zustand to make it organized and better
- Incoming request modal works now and status gets updated on request accept

### Nov 17, 2025
- Added RTCPeerConnection feature for both side
- I'm using Google Stun server for discovering ICE candidates
- Added RTCPeerConnection events for handling ice candidates, connection state change and data channel
- Added signalingSlice for RTCPeerConnection handling
- Made zustand slices use AppState so that all the slices can call each other
- Added WebRTCSlice for connection, state and data channel
- Added events for handling RTCPeerConnection offer, answer and ice candidate
- Did a lot of restructuring in the codebase
- Tested the WebRTC connection to send a demo txt file and it worked
- Connection setup works and both peers are able to talk to each other
- Nickname now updates live on edit for both peers

### Nov 18, 2025
- Modified code to update connection status from state change of RTCPeerConnection
- If either peer gets disconnected, the other peer is notified
- When a peer gets disconnected, other peer's connection status is updated in redis now
- Did some more restructuring with the files
- Updated event names to make it more clear and understandable
- Connection status is now displayed same on both home and connect pages
- Added to show peer role which can be either sender or receiver
- Added two cloudflare stun servers to increase success rate
