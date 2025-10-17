<template>
  <el-input 
    v-model="inputValue" 
    :maxlength="maxLength"
    :class="{'input-error': !isValid && isTouched && !isFocused}"
    @change="onChange"
    @focus="onFocus"
    @blur="onBlur" 
  />
</template>

<script setup lang="ts">
import {ref, computed} from 'vue';

const props = defineProps<{
  modelValue: string | null;
  required?: boolean;
  maxLength?: number;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | null): void;
}>();

const inputValue = ref<string>(props.modelValue ?? '');
const isTouched = ref<boolean>(false)
const isFocused = ref<boolean>(false)

const isValid = computed(() => {
  if(!isTouched.value) return true
  if(props.required && !inputValue.value.trim()) return false
  if(props.maxLength && inputValue.value.length >= props.maxLength) return false
  return true
})

function onChange(): void {
  emit('update:modelValue', isValid.value ? inputValue.value : null)
}

function onFocus(): void {
  isTouched.value = true
  isFocused.value = true
}

function onBlur(): void {
  isFocused.value = false
  onChange()
}
</script>

<style scoped>
.input-error :deep(.el-input__wrapper) {
  box-shadow: 0 0 0 1px red;
}
</style>