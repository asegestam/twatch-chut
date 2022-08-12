import { defineStore } from "pinia";
import { TwitchChatMessage } from "~~/utils/chat";

export const useMessageStore = defineStore("messageStore", {
  state: () => ({
    messages: [] as TwitchChatMessage[],
    bufferedMessages: [] as TwitchChatMessage[],
  }),
  getters: {
    lastestMessage: (state) => state.messages[state.messages.length - 1],
  },
  actions: {
    addMessage(message: TwitchChatMessage | TwitchChatMessage[]) {
      this.messages.push(message);
    },
    addBufferedMessage(message: TwitchChatMessage) {
      this.bufferedMessages.push(message);
    },
    addBufferedMessagesToMessages() {
      this.messages.push(...this.bufferedMessages);
      this.bufferedMessages = [];
    },
    clearMessages() {
      this.messages = [];
    },
    reduceMessages(amount: number) {
      this.messages.splice(0, amount);
    },
    halveMessages() {
      this.reduceMessages(this.messages.length / 2);
    },
  },
});
