<template>
  <div class="account">
    <AccountInput 
      v-model="mark" 
      class="input"
      :required="false"
      :max-length="50"
      @update:modelValue="handlerUpdate('mark', $event)"
    />
    <DropDown :type="props.account.type" @update-type="val => handlerUpdate('type', val)" />
    <AccountInput 
      v-model="login" 
      class="input" 
      :class="{'input--two-column': isLDAP}" 
      :required="true"
      :max-length="100"
      @update:modelValue="handlerUpdate('login', $event)"
    />
    <AccountInput 
      v-if="!isLDAP" 
      v-model="password" 
      class="input"
      :required="true"
      :max-length="100"
      @change="handlerUpdate('password', password)"
      type="password" 
      show-password 
    />
    <button class="btn" @click="handlerDelete(props.account.id)">
      <Delete class="btn__icon" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { Delete } from '@element-plus/icons-vue';
import { AccountType, type Account } from '@/types/account';
import DropDown from '@/components/AccountDropDown.vue';
import AccountInput from '@/components/AccountInput.vue';
import { ref, computed, watch } from 'vue';
import { parsedMark, stringifyMark } from '@/utils/parser.ts';

const props = defineProps<{
  account: Account,
}>();

const emit = defineEmits<{
  (e: "delete", id: number): void,
  (e: "update", id: number, field: keyof Account, value: Account[keyof Account]): void
}>();

const mark = ref<string>(stringifyMark(props.account.mark));
const login = ref<string>(props.account.login);
const password = ref<string | null>(props.account.password);
const isLDAP = computed<boolean>(() => props.account.type === AccountType.LDAP);

function handlerDelete(id: number): void {
  emit("delete", id);
};

function handlerUpdate(field: keyof Account, value: Account[keyof Account]): void {

  if(field === 'mark' && typeof value === 'string') {
    const parsed = parsedMark(value)
    emit("update", props.account.id, field, parsed);
    return
  } 

  emit("update", props.account.id, field, value);
  return 
};

//Если тип аккаунта становиться LDAP то сбрасываем password 
watch(  
  () => props.account.type,
  (newVal) => {
    if(newVal === AccountType.LDAP) {
      password.value = "";
      handlerUpdate('password', null);
    }
  }
)
</script>

<style scoped>
.account {
  display: grid;
  grid-template-columns: 240px 180px repeat(2, 240px) 25px;
  gap: 16px;
}

.input :deep(input.el-input__inner) {
  font-size: 18px;
  color: #000;
}

.input--two-column {
  grid-column: span 2;
}

.btn {
  background: none;
  padding: 0;
  border: none;
  cursor: pointer;
}

.btn__icon {
  width: 100%;
}
</style>