<template>
  <div :class="['chat-message', role]" >
    <strong>{{ role === 'user' ? '你' : 'AI' }}:</strong>
    <span>{{ text }}</span>
  </div>
</template>

<script>
export default {
  name: "ChatMessage",
  props: {
    role: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
/* 同之前给你的样式 */
.chat-message {
  max-width: 70%;
  margin-bottom: 12px;
  padding: 12px 16px;
  border-radius: 20px;
  line-height: 1.5;
  white-space: pre-wrap;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  position: relative;
}

.chat-message.user {
  background-color: #409eff;
  color: white;
  margin-left: auto;
  border-bottom-right-radius: 4px;
}

.chat-message.user::after {
  content: "";
  position: absolute;
  bottom: 0;
  right: -8px;
  width: 0;
  height: 0;
  border-top: 12px solid #409eff;
  border-left: 8px solid transparent;
}

.chat-message.ai {
  background-color: #f0f0f0;
  color: #333;
  margin-right: auto;
  border-bottom-left-radius: 4px;
}

.chat-message.ai::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: -8px;
  width: 0;
  height: 0;
  border-top: 12px solid #f0f0f0;
  border-right: 8px solid transparent;
}
</style>
