// PM2 process manager config
// Keeps the app running and restarts it automatically after crashes or reboots.
//
// Setup (one-time):
//   npm install -g pm2
//   npm run build
//   pm2 start ecosystem.config.js
//   pm2 save
//   pm2 startup   ← run the command it prints, then you're done

module.exports = {
  apps: [
    {
      name: "c2c-platform",
      script: "node_modules/.bin/next",
      args: "start",
      cwd: __dirname,
      instances: 1,
      autorestart: true,
      watch: false,
      max_restarts: 10,
      restart_delay: 3000,
      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },
    },
  ],
};
