<template>
  <div class="note-list">
    <Modal
        v-model="isShow"
        @on-cancel="cancel"
        width="560px"
        class="modal">
        <p slot="header">群便利贴</p>
        <div class="card">
          <div v-for="task in theGroup.tasks" :key="task._id">
            <sticky-note-card :task="task" @closeModal="cancel" @showModal="showModal"></sticky-note-card>
          </div>
          <new-sticky-note-card @closeModal="cancel" @showModal="showModal"></new-sticky-note-card>
        </div>
        <div slot="footer"></div>
    </Modal>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import stickyNoteCard from './sticky-note-card'
import newStickyNoteCard from './new-sticky-note-card'
export default {
  data () {
    return {
    }
  },
  props: ['modalShow'],
  watch: {
    $route () {
      this.init()
    }
  },
  created () {
    this.init()
  },
  computed: {
    ...mapState(['user', 'theGroup']),
    isShow: {
      get: function () {
        return this.modalShow
      },
      set: function () {
      }
    }
  },
  methods: {
    init () {
    },
    cancel () {
      this.$emit('closeModal')
    },
    showModal () {
      this.$emit('showModal')
    }
  },
  components: {
    stickyNoteCard,
    newStickyNoteCard
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card {
  display: flex;
  flex-wrap: wrap;
  height: 300px;
  overflow-y: scroll;
}
</style>
