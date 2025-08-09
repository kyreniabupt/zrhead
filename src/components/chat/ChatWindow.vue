
<template>
  <div class="chat-container">
    <div class="chat-window" ref="chatWindowRef">
      <ChatMessage
        v-for="(msg, idx) in messages"
        :key="idx"
        :role="msg.role"
        :text="msg.text"
      />
      <div ref="bottomRef"></div>
    </div>
    <ChatInput :loading="loading" @send="sendQuestion" />
  </div>
</template>

<script>
import ChatMessage from './ChatMessage.vue'
import ChatInput from './ChatInput.vue'

export default {
  components: { ChatMessage, ChatInput },
  data() {
    return {
      messages: [],    // 聊天记录
      loading: false,
    }
  },
  methods: {
    scrollToBottom() {
      this.$nextTick(() => {
        const bottom = this.$refs.bottomRef
        if (bottom && bottom.scrollIntoView) {
          bottom.scrollIntoView({ behavior: 'smooth' })
        }
      })
    },

    async sendQuestion(question) {
      this.messages.push({ role: 'user', text: question })
      this.loading = true
      this.messages.push({ role: 'ai', text: '' })

      try {
        const response = await fetch('http://localhost:8000/api/rag/ask/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ question }),
        })

        if (!response.ok) throw new Error('网络错误')

        const reader = response.body.getReader()
        const decoder = new TextDecoder('utf-8')
        let done = false
        let buffer = ''

        while (!done) {
          const { value, done: doneReading } = await reader.read()
          done = doneReading
          if (value) {
            buffer += decoder.decode(value, { stream: true })

            // 逐字显示
            while (buffer.length > 0) {
              const char = buffer[0]
              buffer = buffer.slice(1)
              this.messages[this.messages.length - 1].text += char
              this.scrollToBottom()

              // 控制每个字的间隔，比如20ms
              await new Promise(resolve => setTimeout(resolve, 20))
            }
          }
        }
      } catch (err) {
        this.messages[this.messages.length - 1].text = '出错了：' + err.message
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
/* 样式保持你之前的样式 */
.chat-container {
  max-width: 700px;
  height: 90vh;
  margin: 40px auto;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  background: white;
  overflow: hidden;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

.chat-window {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  background: linear-gradient(120deg, #f5f8ff, #dce6ff);
}

/* 美化滚动条 (Webkit) */
.chat-window::-webkit-scrollbar {
  width: 7px;
}

.chat-window::-webkit-scrollbar-thumb {
  background-color: #a0b9ff;
  border-radius: 10px;
}

.chat-window::-webkit-scrollbar-track {
  background: transparent;
}
</style>
