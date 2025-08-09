<template>
  <form @submit.prevent="onSubmit" class="input-area">
    <input
      v-model="inputValue"
      type="text"
      placeholder="请输入问题..."
      :disabled="loading"
      @keydown.enter.exact.prevent="onSubmit"
    />
    <button type="submit" :disabled="loading || !inputValue.trim()">发送</button>
  </form>
</template>

<script setup>
import { ref, watch, defineEmits } from 'vue'

const emits = defineEmits(['send'])
const loading = ref(false)
const inputValue = ref('')

watch(() => loading.value, (val) => {
  if (!val) inputValue.value = ''
})

function onSubmit() {
  if (!inputValue.value.trim() || loading.value) return
  emits('send', inputValue.value.trim())
}
</script>

<style scoped>
.input-area {
  display: flex;
  border-top: 1px solid #ddd;
  padding: 10px 15px;
  background-color: #fafafa;
}

input[type='text'] {
  flex: 1;
  padding: 12px 16px;
  border: 1.5px solid #ccc;
  border-radius: 25px;
  font-size: 16px;
  outline: none;
  transition: border-color 0.3s ease;
}

input[type='text']:focus {
  border-color: #409eff;
  box-shadow: 0 0 6px #a0cfff;
}

button {
  margin-left: 12px;
  border-radius: 25px;
  border: none;
  background: linear-gradient(45deg, #409eff, #66b1ff);
  color: white;
  font-weight: 600;
  font-size: 16px;
  padding: 0 25px;
  cursor: pointer;
  transition: background 0.3s ease;
}

button:hover:not(:disabled) {
  background: linear-gradient(45deg, #66b1ff, #409eff);
}

button:disabled {
  background-color: #a0cfff;
  cursor: not-allowed;
}
</style>
