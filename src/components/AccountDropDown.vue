<template>
  <el-dropdown ref="dropdown" trigger="contextmenu">
    <el-button @click="showClick" class="btn">
      {{ curentOption }}
      <el-icon class="el-icon--right"><arrow-down /></el-icon>
    </el-button>
    <template #dropdown>
      <el-dropdown-menu class="menu">
        <el-dropdown-item 
          v-for="([key, value]) in Object.entries(AccountType)" 
          :key="key"
          @click="setOption(value as AccountType)"
          class="item"
          >
            {{ value }}
          </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { DropdownInstance } from 'element-plus'
import { AccountType } from '@/types/account';
import { ArrowDown } from '@element-plus/icons-vue'

const props = defineProps<{
  type: AccountType
}>();

const emit = defineEmits<{
  (e: "updateType", type: AccountType): void
}>();

const dropdown = ref<DropdownInstance>();

const curentOption = ref<AccountType>(props.type);

function showClick() {
  if (!dropdown.value) return
  dropdown.value.handleOpen()
};

function setOption(type: AccountType): void {
  curentOption.value = type
  emit("updateType", type);
};
</script>

<style scoped>
.btn, :deep(li.item) {
  font-size: 18px;
  color: #000;
}

.btn > :deep(span) {
  display: flex;
  align-items: center;
  width: 100%;
}

.btn {
  width: 100%;  
  justify-content: flex-start;
  padding: 10px;
}

.el-icon--right {
  margin-left: auto;
}

.item {
  width: 100%;
}
</style>