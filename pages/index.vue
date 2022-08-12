<template>
  <div class="flex justify-center bg-slate-800 h-screen">
    <div>
      <input
        v-model="channel"
        type="text"
        placeholder="Enter channel"
        class="p-4 mt-10 rounded-md h-50"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onKeyStroke } from "@vueuse/core";

onKeyStroke("Enter", (e) => {
  e.preventDefault();

  if (channel.value == "") {
    return;
  }

  navigateTo(`/${channel.value}`);
});

const channel = ref("");
</script>
