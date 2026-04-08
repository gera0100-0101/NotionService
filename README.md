# NotionService
Notion app with React Web client and Fast Api server<br>
It has only one client so far, i plan to include more clients as desktop app, mobile android/ios app, telegram bot

## Frontend structure

```
notion.client/
 ├─ public/
 ├─ src/
      └─ frontendFolders/scripts...

```
notion.client is the frontend web client it has this own readme.md file<br>

## Backend structure

```
fastApi/
 ├─ api/
 ├─ services/
 └─ main.py

```
api/ folder has an Rest/Websocket endpoints<br>
services/ floder has an services with backend logic<br>
main.py is the main script that start the whole backend app<br>

```
fastApi/
 ├─ api/
     └─ time.py
 ├─ services/
     └─ timeService.py
```
time.py file has a web socket endpoint that get the time from services/timeService.py which gets time using url about time zone in the moscow
