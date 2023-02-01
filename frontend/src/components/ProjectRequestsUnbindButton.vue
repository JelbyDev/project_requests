<script setup lang="ts">
import { ref, toRefs } from 'vue';
import { useProjectSingleStore } from '@/stores/projectSingle';

const props = defineProps<{
  requestId: number;
}>();

const { requestId } = toRefs(props);

const isLoadingRequest = ref(false);
const { unbindRequestToProject } = useProjectSingleStore();
function onUnbind() {
  isLoadingRequest.value = true;
  unbindRequestToProject(requestId.value).finally(() => {
    isLoadingRequest.value = false;
  });
}
</script>

<template>
  <v-btn
    variant="outlined"
    color="info"
    :loading="isLoadingRequest"
    @click.prevent="onUnbind"
  >
    <slot></slot>
  </v-btn>
</template>

<style scoped></style>
