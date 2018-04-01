<template>
  <div class="chat-layout">
    <div class="chat-name">
      {{userChatTo.nickname}}
      <span class="icon-person link-like" @click="showInfo">
        <Icon type="person"></Icon>
      </span>
      <span class="icon-close link-like" @click="removeChat">
        <Icon type="close-round"></Icon>
      </span>
    </div>
    <div class="chat-content" id="chatContent">
      <slot name="chat-content"></slot>
    </div>
    <div class="emojis" id="emojis" v-show="isShoweMojis">
      <ul>
        <li v-for="(item, index) of emojis"
            :key="index"
            @click="insertText(item)">{{item}}</li>
      </ul>
    </div>
    <div class="chat-text">
      <div class="other-fun">
        <!-- <Button size="small" @click="showEmojis" id="emojis-btn">表情</Button> -->
        <i class="fun-emojis" @click="showEmojis" id="emojis-btn">
          <Icon type="happy-outline"></Icon>
        </i>
        <Upload action="/api/message/uploadImg"
              :data="{'from':user._id, 'to':userChatTo._id, 'type':userChatTo.type}"
              :show-upload-list="false"
              :on-success="uploadSuccess">
          <i class="fun-emojis">
            <Icon type="ios-upload-outline"></Icon>
          </i>
        </Upload>
      </div>
      <textarea name="" id="text" v-model="message" @keyup.ctrl.enter="onSubmit"></textarea>    
      <!-- <Button type="success" size="small" class="send-btn" @click="onSubmit()">发送</Button> -->
    </div>
    <div class="show-group-info" :class="{ 'group-info-show': groupInfoShow }">
      <span class="icon-cancel link-like" @click="closeGroupModal">
        <Icon type="close"></Icon>
      </span>
      <div class="group-info">
        <div class="img-wrap">
          <img src="../assets/imgs/avatar.jpg" alt="">
        </div>
        <div class="user-info">
          <p>nickname:</p>
          <p>nickname:</p>
          <p>creatAt:</p>
          <p>introduce:</p>
        </div>
        <div class="user-info">
          <p>{{groupChatTo.nickname}}</p>
          <p>{{groupChatTo.username}}</p>
          <p>{{groupChatTo.creatAt}}</p>
          <p>{{groupChatTo.introduce}}</p>
        </div>
      </div>
      <div class="group-member">
        <p>members:</p>
        <div class="member-list">
          <div class="member-item" v-for="member in groupChatTo.members" :key="member._id">
            <div class="img-div" @click="showMemberInfo(member)">
              <img src="../assets/imgs/avatar.jpg" alt="">      
            </div>
            <span>{{member.nickname}}</span>
          </div>
          <new-member-card @click="newMember"></new-member-card>
        </div>
      </div>
    </div>
    <show-info-modal :modalShow="infoModalShow"
                     @closeModal="closeModal"
                     :userInfo="userInfo"></show-info-modal>
  </div>
</template>

<script>
import { cloneDeep } from 'lodash'
import { mapState } from 'vuex'
import newMemberCard from './new-member-card'
import showInfoModal from './show-info-modal'

export default {
  data () {
    return {
      message: '',
      userInfo: {},
      // groupChatTo: {},
      infoModalShow: false,
      groupInfoShow: false,
      isShoweMojis: false,
      emojis: ['😂', '🙏', '😄', '😏', '😇', '😅', '😌', '😘', '😍', '🤓', '😜', '😎', '😊', '😳', '🙄', '😱', '😒', '😔', '😷', '👿', '🤗', '😩', '😤', '😣', '😰', '😴', '😬', '😭', '👻', '👍', '✌️', '👉', '👀', '🐶', '🐷', '😹', '⚡️', '🔥', '🌈', '🍏', '⚽️', '❤️', '🇨🇳'],
      imgPath: ''
    }
  },
  props: ['userChatTo'],
  computed: {
    ...mapState(['user', 'userMessage', 'groupMessage', 'theGroup']),
    groupChatTo () {
      return this.theGroup
    }
  },
  watch: {
    // userMessage () {
    //   const container = document.getElementById("chatContent")
    //   container.scrollTop = container.scrollHeight
    // },
    // groupMessage () {
    //   const container = document.getElementById("chatContent")
    //   container.scrollTop = container.scrollHeight
    // }
  },
  created () {
    this.$nextTick(() => {
      const container = document.getElementById('chatContent')
      container.scrollTop = container.scrollHeight
    })
  },
  mounted () {
    this.$nextTick(() => {
      const emojis = document.getElementById('emojis')
      const emojisbtn = document.getElementById('emojis-btn')
      document.addEventListener('click', (e) => {
        if (!emojis.contains(e.target) && !emojisbtn.contains(e.target)) {
          this.isShoweMojis = false
        }
      })
    })
  },
  methods: {
    showInfo () {
      // this.$store.dispatch('showInfo', this.userChatTo)
      // .then((result) => {
      //   this.userInfo = result
      //   this.modalShow = true
      // }, msg => this.$Message.warning(msg))
      if (this.userChatTo.type === 'group') {
        this.$store.dispatch('getGroupInfo', this.userChatTo._id)
        .then((result) => {
          // this.groupChatTo = cloneDeep(result)
          this.groupInfoShow = true
        }, msg => this.$Message.warning(msg))
      } else {
        // this.userInfo = this.userChatTo
        this.userInfo = cloneDeep(this.userChatTo)
        this.infoModalShow = true
      }
    },
    showMemberInfo (member) {
      this.userInfo = cloneDeep(member)
      this.infoModalShow = true
    },
    closeGroupModal () {
      this.groupInfoShow = false
    },
    removeChat () {
      this.$store.dispatch('removeChat', this.userChatTo)
      .then(() => this.$Message.success('关闭会话成功'), msg => this.$Message.warning(msg))
    },
    closeModal () {
      this.infoModalShow = false
    },
    onSubmit () {
      if (this.message !== '') {
        this.$store.dispatch('sendMessage', {
          chatTo: this.userChatTo._id,
          content: this.message,
          type: this.userChatTo.type
        })
        .then(() => {
          this.message = ''
          const text = document.getElementById('text')
          text.value = ''
        }, msg => this.$Message.warning(msg))
      } else {
        this.$Message.warning('发送内容不能为空')
      }
    },
    showEmojis () {
      this.isShoweMojis = true
    },
    insertText (item) {
      this.isShoweMojis = false
      this.message = this.message + item
    },
    uploadSuccess (res, file) {
      this.$store.commit('sendMessage', res.result)
      this.message = ''
    }
  },
  components: {
    newMemberCard,
    showInfoModal
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.chat-layout {
  width: 577px;
  height: 499px;
  position: relative;
  overflow: hidden;
}
.chat-layout .chat-name {
  width: 100%;
  height: 50px;
  border-bottom: 1px solid rgb(185, 182, 182);
  margin-bottom: 10px;
  text-align: left;
  padding: 14px 15px;
  font-size: 16px;
  position: relative;
}
.chat-layout .icon-person {
  position: absolute;
  right: 55px;
}
.chat-layout .icon-close {
  position: absolute;
  right: 25px;
}
.chat-layout .chat-content {
  padding: 10px 10px;
  height: 307px;
  overflow-y: scroll;
}

.chat-layout .emojis {
  position: absolute;
  bottom: 130px;
  border: 1px solid black;
}
.chat-layout .emojis ul {
  display: flex;
  flex-wrap: wrap;
  width: 350px;
}
.chat-layout .emojis ul li {
  padding: 2px 3px;
  font-size: 2em;
  cursor: pointer;
}

.chat-layout .chat-text {
  border-top: 1px solid rgb(185, 182, 182);
  width: 100%;
  height: 130px;
  position: absolute;
  left: 0;
  bottom: 0;
  overflow: hidden;
  text-align: left;
}
.chat-layout .chat-text .other-fun {
  display: flex;
  border-bottom: 1px solid rgb(185, 182, 182);
}
.chat-layout .chat-text .other-fun .fun-emojis {
  cursor: pointer;
  padding: 0 5px 0 10px;
  font-size: 1.2em;
}
.chat-layout .chat-text .other-fun botton {
  height: 10px;
}

.chat-layout .chat-text textarea {
  width: 587px;
  height: 74px;
  resize: none;
  border: 0;
  outline: none;
  padding: 5px 15px 5px 5px;
}
.chat-layout .chat-text .send-btn {
  margin-right: 5px;
}
.show-group-info {
  width:240px;
  height: 450px;
  padding: 20px;
  border: 1px solid #eee;
  position: absolute;
  right: -240px;
  top: 50px;
  background-color: #eee;
  overflow: hidden;
  transition: right 1s;
  -moz-transition: right 1s; /* Firefox 4 */
  -webkit-transition: right 1s; /* Safari 和 Chrome */
  -o-transition: right 1s; /* Opera */
}
.show-group-info .icon-cancel {
  position: absolute;
  right: 10px;
}
.show-group-info .group-info {
  display: flex;
}
.show-group-info .group-info .user-info {
  text-align: left;
  margin: 0 10px;
}
.show-group-info .img-wrap {
  width: 50px;
  height: 50px;
  /* overflow: hidden; */
  border-radius: 10px;
}
.show-group-info .img-wrap img {
  width: 50px;
  height: 50px;
}
.show-group-info .group-member {
  text-align: left;
}
.show-group-info .group-member .member-list {
  margin-top: 10px;
  margin-left: 10px;
}
.show-group-info .group-member .member-list .member-item {
  display: inline-block;
  width: 35px;
  margin-right: 10px;
  margin-bottom: 10px;
  text-align: center;
}
.show-group-info .group-member .img-div {
  width: 35px;
  height: 35px;
  overflow: hidden;
  border-radius: 10px;
  margin-right: 8px;
  margin-bottom: 5px;
  cursor: pointer;
}
.show-group-info .group-member .img-div img {
  width: 35px;
  height: 35px;
}
.chat-layout .group-info-show {
  right: 0;
}
</style>
