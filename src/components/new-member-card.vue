<template>
  <div class="new-member" @click="newMember">
    <div class="img-wrap">
      <i class="icon">
        <Icon type="plus" size="30px"></Icon>
      </i>
    </div>
    <new-member-modal :modalShow="newMemberModalShow"
                     @closeModal="closeModal"
                     ></new-member-modal>
  </div>
</template>

<script>
import newMemberModal from './new-member-modal'

export default {
  data () {
    return {
      newMemberModalShow: false
    }
  },
  methods: {
    newMember () {
      this.newMemberModalShow = true
    },
    closeModal () {
      this.newMemberModalShow = false
    }
  },
  components: {
    newMemberModal
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.new-member {
  width: 34px;
  height: 34px;
  display: inline-block;
  border: 1px dotted rgb(185, 182, 182);
  cursor: pointer;
  margin-bottom: 18px;
}
.new-member .img-wrap {
  width: 100%;
  height: 100%;
  position: relative;
}
.new-member .img-wrap .icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
