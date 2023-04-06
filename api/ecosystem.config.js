module.exports = {
  apps: [
    {
      name: 'Athena',
      script: 'dist/main.js',
      instances: 'max',
      env: {
        NODE_ENV: 'production',
      },
      autorestart: true,
      max_memory_restart: '1G',
      watch: false,
    },
  ],
};
