<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{ isVisible: boolean }>();
const emits = defineEmits<{ (e: 'close', isVisibleDialog: boolean): void }>();

const isVisibleDialog = computed<boolean>({
  get() {
    return props.isVisible;
  },
  set() {
    emits('close', false);
  },
});
</script>

<template>
  <div>
    <v-dialog v-model="isVisibleDialog" max-width="620" min-width="320">
      <v-sheet class="w-100 px-10 py-7 align-self-center">
        <div class="text-h5 mb-3 text-center w-100">
          <slot name="header"></slot>
        </div>
        <div class="w-100">
          <slot name="body"></slot>
        </div>
      </v-sheet>
    </v-dialog>
  </div>
</template>
