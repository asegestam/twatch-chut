<template>
  <div
    class="bg-slate-700 w-full h-screen overflow-y-scroll text-lg text-white p-4"
    id="chat"
  >
    <div v-for="message in messageStore.messages">
      <Message :message="message" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMessageStore } from "~~/stores/messageStore";
import { getMessageHTML } from "~~/utils/chat";

const MAX_RENDERED_MESSAGES = 2000;
const messageStore = useMessageStore();
const route = useRoute();
const client = await useStartChat(route.params.channel as string);

useHead(() => {
  return {
    title: route.params.channel,
  };
});

onUnmounted(() => {
  client.disconnect();
  client.removeAllListeners();
});

watchEffect(() => {
  setInterval(() => {
    if (messageStore.bufferedMessages.length === 0) return;

    messageStore.addBufferedMessagesToMessages();
  }, 750);
});

messageStore.$subscribe((mutation, state) => {
  if (state.messages.length > MAX_RENDERED_MESSAGES) {
    messageStore.halveMessages();
  }
});

client.on("message", (channel, userstate, message) => {
  messageStore.addBufferedMessage({
    user: userstate,
    body: message,
    html: getMessageHTML(message, userstate),
  });
});
</script>
