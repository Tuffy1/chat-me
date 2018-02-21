<template>
  <div class="new-group">
    <Modal
        v-model="modalShow"
        title="添加新联系人"
        @on-ok="submit"
        @on-cancel="cancel">
        <Select
                v-model="model13"
                filterable
                remote
                :remote-method="remoteMethod1"
                :loading="loading1">
                <Option v-for="(option, index) in options1" :value="option.value" :key="index">{{option.label}}</Option>
            </Select>
    </Modal>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  props: {
    modalShow: {
      type: Boolean,
      default: false
    }
  },
  computed: {
  },
  methods: {
    submit () {},
    cancel () {}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
