import { ref, watch } from "vue";
import { defineStore } from 'pinia';
import { AccountType, type Account } from "@/types/account";

export const useAccountsStore = defineStore('accounts', () => {
  const storedAcc = localStorage.getItem('accounts')
  const accounts = ref<Account[]>(storedAcc ? JSON.parse(storedAcc) : [])

  watch(accounts, (newVal) => {
    localStorage.setItem('accounts', JSON.stringify(newVal))
  }, {deep: true})

  function createAccount(): void {
    const newAccount: Account = {
			id: Date.now(),
			mark: [],
			type: AccountType.LOCAL,
      login: '',
			password: null,
		}
    accounts.value.push(newAccount);
  }

  function deleteAccount(id: number): void {
    accounts.value = accounts.value.filter(account => account.id !== id)
  }

  function updateAccount(id: number, updateFields: Partial<Account>): void {
    const account = accounts.value.find(acc => acc.id === id)
    
    if(!account) {
      console.warn(`Ошибка: аккаунта с таким id: ${id} нету`);
      return
    }

    
    Object.assign(account, updateFields)
  }

  return {
		accounts,
		createAccount,
		deleteAccount,
		updateAccount,
	}
})