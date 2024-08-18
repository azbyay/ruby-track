after cloning the repo, run:

for the frontend:
```bash
cd frontend
npm install
npm run dev
```
the frontend should be accessible via: http://localhost:3000

for the backend:
```bash
cd backend
bundle install --gemfile
$env:EDITOR = "code --wait"
rails credentials:edit
rails server -p 3001
```
the backend should be accessible via: http://localhost:3001

after making any working changes to the backend, run:
```bash
cd backend
fly deploy
```
the real ones know where the backend api calls are made, so i won't say