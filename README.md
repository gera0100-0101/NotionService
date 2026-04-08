# NotionService
Notion app with React Web client and Fast Api server<br>
It has only one client so far, i plan to include more clients as desktop app, mobile android/ios app, telegram bot

## Project structure

```
notion.client/
 ├─ public/
 ├─ src/
      └─ frontendFolders/scripts...

```
notion.client is the frontend web client it has this own readme.md file<br>

```
fastApi/
 ├─ api/
 ├─ services/
 └─ main.py

```
api/ folder has an Rest/Websocket endpoints
services/ floder has an services with backend logic
main.py is the main script that start the whole backend app
