export class LoadBalancer {
  public static stopped = false;
  public static healthyServers: string[] = [];
  public static occurence = 0;

  private static numberOfServers = 10;
  private static pollSeconds = 10;

  public static healthCheck = () =>
    setInterval(async () => {
      if (!this.stopped) await this.getUpServers();
    }, this.pollSeconds * 1000);

  public static getUpServers = async () => {
    this.healthyServers = [];
    for (let index = 0; index < this.numberOfServers; index++) {
      const url = `http://localhost:${3000 + index}`;

      try {
        const response = await fetch(url);
        if (response?.status === 200) this.healthyServers.push(url);
      } catch (error) {
        console.info(`There are no servers up at this url`, url);
      }
    }
  };
}
