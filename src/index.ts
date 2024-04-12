import express from "express";
import { LoadBalancer } from "./load-balancer";

const app = express();
app.use(express.json());

app.get("/", async (req, res) => {
  LoadBalancer.stopped = false;
  try {
    console.info(`healthyServers`, LoadBalancer.healthyServers);

    const healthyServer =
      LoadBalancer.healthyServers?.[
        LoadBalancer.occurence++ % LoadBalancer.healthyServers.length
      ];
    if (healthyServer) {
      res.redirect(healthyServer);
    }
  } catch (error) {
    console.error(error);
    return res.send("Hello from Load Balancer, no servers are up");
  }
});

app.get("/stop", (req, res) => {
  LoadBalancer.stopped = true;
  res.send("Stopped health check");
});

app.listen(81, () => {
  console.log(
    "Load balancer is running on port 81 and will redirect if possible"
  );
  LoadBalancer.healthCheck();
});
