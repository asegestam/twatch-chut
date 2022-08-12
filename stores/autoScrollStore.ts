import { defineStore } from "pinia";
import { useScroll } from "@vueuse/core";

export const useAutoScrollStore = defineStore("autoScrollStore", {
  state: () => {
    const { isScrolling, arrivedState, directions } = useScroll(
      document.getElementById("chat")
    );
    const { top: toTop } = toRefs(directions);

    return {
      autoScroll: true,
      isScrolling: isScrolling,
      toTop: toTop,
      arrivedState: arrivedState,
    };
  },
  actions: {},
});
