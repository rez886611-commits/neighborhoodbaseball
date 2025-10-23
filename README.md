Neighbourhood Baseball — site package
===================================

Files included:
- index.html
- scores.html
- schedule.html
- teams.html
- contact.html
- assets/styles.css
- assets/main.js

How to publish on GitHub Pages (quick):
1. Create a GitHub account at https://github.com if you don't have one.
2. Create a new repository named `neighbourhoodbaseball` (or any name you like).
3. Upload all files and folders in this ZIP to the repository (you can drag-and-drop on GitHub web UI).
4. In the repo, go to Settings → Pages (or "Pages" in the sidebar).
5. Under "Source", choose the branch `main` (or `master`) and click Save. Select root (/) as the folder.
6. GitHub will build and publish. Your site will be at:
   https://<your-github-username>.github.io/neighbourhoodbaseball
7. If your repo name is different, replace the final path with the repo name.

Notes:
- The score tracker is interactive and works on the page, but results are stored only in memory and will reset when the page reloads.
- If you want scores saved across reloads later, I can update the site to use browser localStorage or a Google Sheet / Firebase backend.
