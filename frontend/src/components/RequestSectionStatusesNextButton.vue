<script setup lang="ts">
import { ref, toRefs } from 'vue';
import { useRequestSingleStore } from '@/stores/requestSingle';

const props = defineProps<{
  requestId: number;
  nextStatusId: number;
}>();

const { requestId, nextStatusId } = toRefs(props);

const isLoadingStatus = ref(false);
const { setNextRequestStatus } = useRequestSingleStore();
function onPrev() {
  isLoadingStatus.value = true;
  setNextRequestStatus(requestId.value, nextStatusId.value).finally(() => {
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
