<template>
  <div :id="message.user.id">
    <span class="font-bold" :style="{ color: message.user.color ?? '#000000' }">
      {{ message.user["display-name"] + ": " }}
    </span>
    <span v-html="message.html" class="break-words" />
  </div>
</template>

<script setup lang="ts">
import type { TwitchChatMessage } from "utils/chat";
import { PropType } from "vue";
import { useAutoScrollStore } from "~~/stores/autoScrollStore";

const scroll = useAutoScrollStore();

const props = defineProps({
  message: {
    type: Object as PropType<TwitchChatMessage>,
    default: () => ({}),
  },
});

onMounted(
  () =>
    scroll.autoScroll &&
    document.getElementById(props.message.user.id)?.scrollIntoView()
);
</script>
