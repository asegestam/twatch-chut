export const useStartChat = async (channel: string) => {
  const tmi = await import("tmi.js");

  const client = new tmi.Client({
    channels: [`#${channel}`],
  });

  client.connect();

  return client;
};
