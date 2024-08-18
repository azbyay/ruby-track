after cloning the repo, run:

for the frontend:
```bash
cd frontend
npm install
npm run dev
```
the backend should be accessible via: http://localhost:3000

for the backend:
```bash
cd backend
docker build -t my_rails_app .
docker run -p 3001:3001 my_rails_app
```
the backend should be accessible via: http://localhost:3001