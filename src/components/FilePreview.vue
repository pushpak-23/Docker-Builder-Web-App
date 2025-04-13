<script setup>
import { computed } from "vue";
import Prism from "prismjs";
import "prismjs/themes/prism.css";

const props = defineProps({
  content: String,
  language: {
    type: String,
    default: "dockerfile",
  },
});

const highlighted = computed(() =>
  Prism.highlight(
    props.content,
    Prism.languages[props.language],
    props.language
  )
);
</script>

<template>
  <pre
    class="p-4 bg-gray-800 rounded-md text-sm"
  ><code class="language-dockerfile" v-html="highlighted" /></pre>
</template>
