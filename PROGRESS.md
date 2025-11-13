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
