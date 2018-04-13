<template>
  <div class="chat-bubble" :class="isMe ? 'right' : 'left'">
    <div class="avatar-wrap">
      <img src="../assets/imgs/avatar.jpg" alt="avatar">
    </div>
    <div class="main-box">
    <div v-if="userOrGroup === 'group'"
         class="msg-name"
         :class="isMe ? 'msg-name-right' : 'msg-name-left'">{{msgName}}</div>
    <div class="talk-wrap" :class="userOrGroup === 'group' ? 'group': ''">
      <span class="is-important" v-if="isMe && message.isImportant">(特别关心)</span>
      <div class="talk-bubble" 
           :class="message.isImportant ? 'deep-color' : ''"
           v-if="message.type === 'text'"
           v-html="contentTransfer"></div>
      <div class="img-wrap" v-else>
        <img :src="message.content" alt="">
      </div>
      <span class="is-important" v-if="!isMe && message.isImportant">(特别关心)</span>
    </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import textTransfer from '../assets/js/text-transfer'

export default {
  computed: {
    ...mapState(['theGroup']),
    contentTransfer () {
      return textTransfer(this.message.content)
    },
    msgName () {
      let name = ''
      this.theGroup.members.forEach(member => {
        if (member._id === this.message.from.toString()) {
          name = member.nickname
        }
      })
      return name
    }
  },
  props: {
    isMe: {
      type: Boolean,
      required: true
    },
    message: {
      type: Object
    },
    userOrGroup: {
      type: String
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.chat-bubble {
  display: flex;
  margin-bottom: 12px;
}
.chat-bubble .avatar-wrap {
  width: 30px;
  height: 30px;
  margin: 0 12px;
}
.chat-bubble .avatar-wrap img {
  width: 30px;
  height: 30px;
}
.chat-bubble .talk-wrap {
  flex: 0 0 auto;
}
.chat-bubble .group {
  position: relative;
  top: -5px;
  
}
.chat-bubble .msg-name {
  text-align: left;
  position: relative;
  top: -5px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.chat-bubble .talk-wrap .talk-bubble {
  text-align: left;
  display: inline-block;
  background-color: antiquewhite;
  border-radius: 5px;
  font-size: 14px;
  max-width: 300px;
  word-wrap: break-word;
  position: relative;
  padding: 5px;
}
.left {
  justify-content: flex-start;
}
.right {
  justify-content: flex-end;
}
.left>.avatar-wrap {
  order: 0;
}
.left>.talk-wrap {
  order: 1;
}
.right>.avatar-wrap {
  order: 1;
}
.right>.talk-wrap {
  order: 0;
}
.chat-bubble .talk-wrap .talk-bubble::before {
  border: 6px solid transparent;
  content: " ";
  height: 0;
  width: 0;
  position: absolute;
  pointer-events: none;
  top: 6px;
}
.chat-bubble.right .talk-wrap .talk-bubble::before {
  border-left-color: antiquewhite;
  right: -12px;
}
.chat-bubble.left .talk-wrap .talk-bubble::before {
  border-right-color: antiquewhite;
  left: -12px;
}
.chat-bubble .msg-name-right {
  text-align: right;
}
.chat-bubble .msg-name-left {
  text-align: left;
}
.chat-bubble .talk-wrap .deep-color{
  background-color: #f5c380;
}
.chat-bubble.right .talk-wrap .deep-color::before {
  border-left-color: #f5c380;
}
.chat-bubble.left .talk-wrap .deep-color::before {
  border-right-color: #f5c380;
}
.img-wrap img {
  width: 120px;
  height: auto;
}
.is-important {
  color: #bbb1a3;
  margin: 0 10px;
}
</style>
