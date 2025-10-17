<template>
  <div class="wrap">
    <h1>Учетные записи</h1>
    <el-button @click="createHandler" class="btn">
      <Plus class="btn__icon" />
    </el-button>
  </div>
</template>

<script setup lang="ts">
import { Plus } from '@element-plus/icons-vue';

const emit = defineEmits<{
  (e: "create"): void;
}>();

function createHandler(): void {
  emit("create");
}

</script>

<style scoped>
.wrap {
  display: flex;
  align-items: center;
  gap: 16px;
}

.btn {
  width: 48px;
  height: 48px;
}

.btn__icon {
  width: 18px;
  height: 18px;
}
</style>