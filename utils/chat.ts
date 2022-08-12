import type { ChatUserstate } from "tmi.js";

export type TwitchChatMessage = {
  user: ChatUserstate;
  body: string;
  html: string;
};

export interface EmoteOptions {
  format?: "static" | "animated" | "default";
  themeMode: "light" | "dark";
  scale: "1.0" | "2.0" | "3.0";
}

/**
 * Return the image element for the provided emote id and options
 *
 * @param id Emote ID
 * @param options  Emote Options
 * @returns Emote image HTML
 */
const idToImage = (id: string, options?: EmoteOptions) => {
  return `<img src ='https://static-cdn.jtvnw.net/emoticons/v2/${id}/${
    options?.format || "default"
  }/${options?.themeMode || "light"}/${
    options?.scale || "1.0"
  }' class='twitch-emote'/>`;
};

function sanitizeString(str: string) {
  str = str.replace(/[^a-z0-9áéíóúñü \.,_-]/gim, "");
  return str.trim();
}

/**
 *
 * Converts tmi message + emotes into HTML with emojis embedded
 *
 * @param message Message to parse
 * @param user tmi chat user state
 * @returns
 */
export function getMessageHTML(message: string, user: ChatUserstate) {
  const { emotes } = user;
  if (!emotes) return message;

  // iterate of emotes to access ids and positions
  const stringReplacements = Object.entries(emotes).map(([id, positions]) => {
    // use only the first position to find out the emote key word
    const position = positions[0];
    const [start, end] = position.split("-");
    const stringToReplace = message.substring(
      parseInt(start, 10),
      parseInt(end, 10) + 1
    );

    return {
      stringToReplace: stringToReplace,
      replacement: idToImage(id),
    };
  });

  // Sanitize ahead of time
  let clean = sanitizeString(message);

  // generate HTML and replace all emote keywords with image elements
  const messageHTML = stringReplacements.reduce(
    (acc, { stringToReplace, replacement }) => {
      // obs browser doesn't seam to know about replaceAll
      return acc.split(stringToReplace).join(replacement);
    },
    clean
  );

  return messageHTML;
}
