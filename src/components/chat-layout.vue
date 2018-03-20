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
    <div class="chat-text">
      <textarea name="" id="" v-model="message"></textarea>
      <Button type="success" size="small" class="send-btn" @click="onSubmit()">发送</Button>
    </div>
    <div class="show-group-info">
      <span class="icon-cancel link-like">
        <Icon type="close"></Icon>
      </span>
      <div class="group-info">
        <div class="img-wrap">
          <img src="../assets/imgs/avatar.jpg" alt="">
        </div>
        <div class="user-info">
          <p>nickname:</p>
          <p>nickname:</p>
          <p>introduce:</p>
          <p>creatAt:</p>
        </div>
        <div class="user-info">
          <p>{{userChatTo.nickname}}</p>
          <p>{{userChatTo.username}}</p>
          <p>{{userChatTo.introduce}}</p>
          <p>02.05</p>
        </div>
      </div>
      <div class="group-member">
        <p>members:</p>
        <div class="member-list">
          <div class="member-item">
            <div class="img-div">
              <img src="../assets/imgs/avatar.jpg" alt="">      
            </div>
            <span>tuffy</span>
          </div>
          <div class="member-item">
            <div class="img-div">
              <img src="../assets/imgs/avatar.jpg" alt="">      
            </div>
            <span>tuffy</span>
          </div>
          <div class="member-item">
            <div class="img-div">
              <img src="../assets/imgs/avatar.jpg" alt="">      
            </div>
            <span>tuffy</span>
          </div>
          <div class="member-item">
            <div class="img-div">
              <img src="../assets/imgs/avatar.jpg" alt="">      
            </div>
            <span>tuffy</span>
          </div>
          <div class="member-item">
            <div class="img-div">
              <img src="../assets/imgs/avatar.jpg" alt="">      
            </div>
            <span>tuffy</span>
          </div>
          <div class="member-item">
            <div class="img-div">
              <img src="../assets/imgs/avatar.jpg" alt="">      
            </div>
            <span>tuffy</span>
          </div>
        </div>
      </div>
    </div>
    <show-info-modal :modalShow="modalShow"
                     @closeModal="closeModal"
                     :userInfo="userInfo"></show-info-modal>
  </div>
</template>

<script>
import showInfoModal from './show-info-modal'

export default {
  data () {
    return {
      message: '',
      userInfo: {
        nickname: 'tuffy',
        username: 'tuffy',
        introduce: 'i am tuffy',
        type: 'group'
      },
      modalShow: false,
      userChatTo: {
        nickname: 'tuffy',
        username: 'tuffy',
        introduce: 'i am tuffy',
        type: 'group'
      }
    }
  },
  // props: ['userChatTo'],
  // watch: {
  //   userMessage () {
  //     this.$nextTick(() => {
  //       const container = document.getElementById("chatContent")
  //       container.scrollTop = container.scrollHeight
  //     })
  //   }
  // },
  // created() {
  //   this.$nextTick(() => {
  //     const container = document.getElementById("chatContent")
  //     container.scrollTop = container.scrollHeight
  //   })
  // },
  methods: {
    showInfo () {
      // this.$store.dispatch('showInfo', this.userChatTo)
      // .then((result) => {
      //   this.userInfo = result
      //   this.modalShow = true
      // }, msg => this.$Message.warning(msg))
      this.modalShow = true
    },
    removeChat () {
      this.$store.dispatch('removeChat', this.userChatTo)
      .then(() => this.$Message.success('关闭会话成功'), msg => this.$Message.warning(msg))
    },
    closeModal () {
      this.modalShow = false
    },
    onSubmit () {
      this.$store.dispatch('sendMessage', {
        chatTo: this.userChatTo._id,
        content: this.message,
        type: this.userChatTo.type
      })
      .then(() => {
        this.message = ''
      }, msg => this.$Message.warning(msg))
    }
  },
  components: {
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
  height: 327px;
  overflow-y: scroll;
}
.chat-layout .chat-text {
  border-top: 1px solid rgb(185, 182, 182);
  width: 100%;
  height: 110px;
  padding-top: 5px;
  position: absolute;
  left: 0;
  bottom: 0;
  overflow: hidden;
  text-align: left;
}
.chat-layout .chat-text textarea {
  width: 587px;
  height: 74px;
  resize: none;
  border: 0;
  outline: none;
  padding: 0 15px 5px 5px;
}
.chat-layout .chat-text .send-btn {
  margin-right: 5px;
}
.show-group-info {
  width: 240px;
  height: 450px;
  border: 1px solid #eee;
  position: absolute;
  right: 0;
  top: 50px;
  padding: 20px;
  background-color: #eee;
}
.show-group-info .icon-cancel {
  position: absolute;
  right: 10px;
}
.show-group-info .group-info {
  display: flex;
  margin-bottom: 20px;
}
.show-group-info .group-info .user-info {
  text-align: left;
  margin: 0 10px;
}
.show-group-info .img-wrap {
  width: 50px;
  height: 50px;
  overflow: hidden;
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
}
.show-group-info .group-member .img-div img {
  width: 35px;
  height: 35px;
}
</style>
