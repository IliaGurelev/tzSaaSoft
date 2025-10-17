<template>
  <div class="wrap">
    <QuestionFilled class="icon" />
    <p>{{ props.hint }}</p>
  </div>
</template>

<script setup lang="ts">
import { QuestionFilled } from '@element-plus/icons-vue';

const props = defineProps<{
  hint: string;
}>();
</script>

<style scoped>
.icon {
  width: 24px;
}

.wrap {
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: #eef4fa;
  padding-left: 8px;
}
</style>