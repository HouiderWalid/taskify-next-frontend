## Start application in localhost

Generate the .env file
```bash
cp .env.example .env
```

Clone the backend repo and follow the instruction on how to set it up
```bash
git clone https://github.com/HouiderWalid/taskify-express-backend
```

Install dependencies
```bash
npm i
```

Start the application
```bash
npm run dev
```

## Start application in production

Generate the .env file
```bash
cp .env.example .env
```

Test the application
```bash
docker build . -f docker/Dockerfile --target test
```

Build the application
```bash
docker build . -t taskify-next -f docker/Dockerfile
```

Start the application
```bash
docker run -p 4500:4500 --name taskify-next-1 --env-file .env taskify-next:latest
```

