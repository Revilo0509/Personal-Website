module.exports = {
  apps: [
    {
      name: "frontend",
      cwd: "./frontend",
      script: "node",
      args: "build/index.js"
    },
    {
      name: "backend",
      cwd: "./backend",
      script: "npm",
      args: "start"
    }
  ]
};
