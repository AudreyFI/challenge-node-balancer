import express from "express";

const app = express();
app.use(express.json());

let healthyServers: string[] = [];
const numberOfServers = 10;
const pollSeconds = 10;
let occurence = 0;
let stopped = false;

app.get("/", async (req, res) => {
  stopped = false;
  try {
    console.log(`healthyServers`, healthyServers);

    const healthyServer = healthyServers?.[occurence++ % healthyServers.length];
    if (healthyServer) {
      res.redirect(healthyServer);
    }
  } catch (error) {
    console.error(error);
    return res.send("Hello from Load Balancer, no servers are up");
  }
});

app.listen(81, () => {
  console.log(
    "Load balancer is running on port 81 and will redirect if possible"
  );
  healthCheck();
});

app.get("/stop", (req, res) => {
  stopped = true;
  res.send("Stopped health check");
});

const healthCheck = () =>
  setInterval(async () => {
    if (!stopped) await getUpServers();
  }, pollSeconds * 1000);

const getUpServers = async () => {
  healthyServers = [];
  for (let index = 0; index < numberOfServers; index++) {
    const url = `http://localhost:${3000 + index}`;

    try {
      const response = await fetch(url);
      if (response.body) healthyServers.push(url);
    } catch (error) {
      console.info(`There are no servers up at this url`, url);
    }
  }
};
