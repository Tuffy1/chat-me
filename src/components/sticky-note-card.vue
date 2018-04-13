<template>
  <div class="sticky-note-card">
    <Card class="card">
      <p class="title">{{task.title}}</p>
      <i class="link-like edit-note" @click="editNote">
        <Icon type="edit" :size="5"></Icon>
      </i>
      <span><i class="icon"><Icon type="calendar" :size="5"></Icon></i>{{task.startTime}}-{{task.endTime}}</span>
      <span class="creator"><i class="icon"><Icon type="ios-person" :size="7"></Icon></i>{{task.creator.nickname}}</span>
      <div class="content-cantain">
        <div class="content">
          {{task.content}}
        </div>
      </div>
    </Card>
    <edit-note-modal :modalShow="editModalShow"
                     :task="task"
                     @closeModal="closeModal"
                     @showModal="showModal"></edit-note-modal>
  </div>
</template>



<script>
import editNoteModal from './edit-note-modal'

export default {
  data () {
    return {
      editModalShow: false
    }
  },
  props: ['task'],
  computed: {
  },
  watch: {
  },
  created () {
  },
  methods: {
    editNote () {
      this.$emit('closeModal')
      this.editModalShow = true
    },
    closeModal () {
      this.editModalShow = false
    },
    showModal () {
      this.$emit('showModal')
    }
  },
  components: {
    editNoteModal
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card {
  width: 150px;
  height: 200px;
  margin: 10px;
  position: relative;
}
.card .title {
  width: 100px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.card .edit-note {
  position: absolute;
  right: 12px;
  top: 12px;
}
.card .ivu-icon {
  margin-right: 5px;
  width: 8px;
  height: 8px;
}
.card span {
  font-size: 60%;
  display: inline-block;
  width: 120px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  margin-bottom: 0px;
}
.card .creator {
  position: relative;
  top: -5px;
}
.card .content {
  width: 124px;
  height: 100px;
  padding-right: 8px; 
  overflow: hidden;
  overflow-y: scroll;
  word-wrap: break-word;
  position: absolute;
  left: 0;
  font-size: 70%;
}
.card .content-cantain {
  /* width: 112px; */
  height: 100px;
  position: relative;
  overflow: hidden;
}
</style>
