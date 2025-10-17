<template>
  <div class="wrapper">
    <div class="panel">
      <AccountCreator @create="createAccount" />
      <Hint :hint="'Для указания нескольких меток для одной пары логин/пароль используйте разделитель ;'" />
      <AccountsTable 
        @delete="deleteAccount"  
        @update="updateAccount"
        :accounts="accountStore.accounts" 
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import AccountCreator from '@/components/AccountCreator.vue';
import AccountsTable from '@/components/AccountsTable.vue';
import Hint from '@/components/Hint.vue';
import { useAccountsStore } from '@/stores/accounts';
import type { Account } from '@/types/account';

const accountStore = useAccountsStore();

function createAccount(): void {
  accountStore.createAccount();
}

function deleteAccount(id: number): void {
  accountStore.deleteAccount(id);
}

function updateAccount(id: number, updateFields: Partial<Account>) {
  accountStore.updateAccount(id, updateFields)
}
</script>

<style scoped>
  .wrapper {
    margin: 0;
    display: flex;
    justify-content: center;
    background-color: #0077ff;
    min-height: 100vh;
  }

  .panel {
    width: max-content;
    background: #fff;
    padding: 16px;
    box-shadow: 0 0 230px #313131;
  }
</style>