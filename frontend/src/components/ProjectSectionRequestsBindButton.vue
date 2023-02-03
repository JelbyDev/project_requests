<script setup lang="ts">
import { ref, toRefs } from 'vue';
import { useProjectSingleStore } from '@/stores/projectSingle';

const props = defineProps<{
  requestId: number;
}>();

const { requestId } = toRefs(props);

const isLoadingRequest = ref(false);
const { bindRequestToProject } = useProjectSingleStore();
function onBind() {
  isLoadingRequest.value = true;
  bindRequestToProject(requestId.value).finally(() => {
    isLoadingRequest.value = false;
  });
}
</script>

<template>
  <v-btn
    variant="outlined"
    color="info"
    :loading="isLoadingRequest"
    @click.prevent="onBind"
  >
    <slot></slot>
  </v-btn>
</template>
