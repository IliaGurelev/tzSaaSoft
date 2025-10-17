<template>
  <div class="table">
    <div class="header">
      <p class="header__caption">Метки</p>
      <p class="header__caption">Тип записи</p>
      <p class="header__caption">Логин</p>
      <p class="header__caption">Пароль</p>
    </div>
    <div class="content">
      <AccountFields 
        v-for="account in props.accounts"
        @delete="handlerDelete" 
        @update="handlerUpdate"
        :account="account"
        :key="account.id"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import AccountFields from '@/components/AccountFields.vue';
import type { Account } from '@/types/account';

const props = defineProps<{
  accounts: Account[]
}>();

const emit = defineEmits<{
  (e: "delete", id: number): void,
  (e: "update", id: number, updateFields: Partial<Account> ): void,
}>()

function handlerDelete(id: number): void {
  emit("delete", id);
}

function handlerUpdate(id: number, field: keyof Account, value: Account[keyof Account]): void {
  emit("update", id, {[field]: value});
}
</script>

<style scoped>
.header {
  display: grid;
  grid-template-columns: 240px 180px repeat(2, 240px) 25px;
  gap: 16px;
  font-size: 16px;
  color: #636363;
}

.content {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
