<script setup lang="ts">
import { ref, toRefs } from 'vue';
import { useRequestSingleStore } from '@/stores/requestSingle';

const props = defineProps<{
  requestId: number;
  prevStatusId: number;
}>();

const { requestId, prevStatusId } = toRefs(props);

const isLoadingStatus = ref(false);
const { setPrevRequestStatus } = useRequestSingleStore();
function onPrev() {
  isLoadingStatus.value = true;
  setPrevRequestStatus(requestId.value, prevStatusId.value).finally(() => {
    isLoadingStatus.value = false;
  });
}
</script>

<template>
  <v-btn
    variant="outlined"
    color="info"
    :loading="isLoadingStatus"
    @click.prevent="onPrev"
  >
    <slot></slot>
  </v-btn>
</template>

<style scoped></style>
