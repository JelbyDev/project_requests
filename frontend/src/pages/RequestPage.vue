<script setup lang="ts">
import { toRefs } from 'vue';
import { useRequestSingleStore } from '@/stores/requestSingle';
import RequestSection from '@/components/RequestSection.vue';

const { request } = toRefs(useRequestSingleStore());
</script>

<template>
  <ui-page-title v-if="request">{{ request.name }}</ui-page-title>
  <RequestSection></RequestSection>
</template>
