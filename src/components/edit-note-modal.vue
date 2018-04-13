<template>
  <div class="new-user">
    <Modal v-model="modalShow"
           title="编辑便签"
           @on-cancel="cancel">
       <Form ref="noteForm" :model="noteForm" :rules="ruleValidate" class="form" label-position="left">
        <FormItem prop="title" label="标题" :label-width="80">
          <Input type="text" v-model="noteForm.title" placeholder="请输入标题"></Input>
        </FormItem>
        <FormItem prop="startTime" label="开始时间" :label-width="80">
          <DatePicker type="date" placeholder="选择开始时间" v-model="noteForm.startTime" class="date"></DatePicker>
        </FormItem>
        <FormItem prop="endTime" label="截止时间" :label-width="80">
          <DatePicker type="date" placeholder="选择截止时间" v-model="noteForm.endTime" class="date"></DatePicker>
        </FormItem>
        <FormItem prop="content" label="内容" :label-width="80">
          <Input type="text" v-model="noteForm.content" placeholder="请输入内容"></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="error" @click="onDelete">删除</Button>
        <Button type="primary" @click="onSubmit">确定</Button>
     </div>
    </Modal>
  </div>
</template>

<script>
import moment from 'moment'
import { mapState } from 'vuex'

import { cloneDeep } from 'lodash'
export default {
  data () {
    return {
      noteForm: {},
      ruleValidate: {
        title: [
          { required: true, message: 'The title cannot be empty', trigger: 'blur' }
        ],
        startTime: [
          { required: true, message: 'The startTime cannot be empty', trigger: 'blur' }
        ],
        endTime: [
          { required: true, message: 'The endTime cannot be empty', trigger: 'blur' }
        ],
        content: [
          { required: true, message: 'The content cannot be empty', trigger: 'blur' }
        ]
      }
    }
  },
  props: ['modalShow', 'task'],
  computed: {
    ...mapState(['theGroup'])
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.noteForm = cloneDeep(this.task)
    },
    onDelete () {
      this.$store.dispatch('removeGroupTask', {
        groupId: this.theGroup._id,
        taskId: this.noteForm._id
      })
      .then(() => {
        this.$Message.success('删除成功')
        this.cancel()
        this.$emit('showModal')
        this.$store.commit('removeGroupTask', this.noteForm._id)
      }, (msg) => this.$Message.warning(msg))
    },
    onSubmit () {
      this.noteForm.startTime = moment(this.noteForm.startTime).format('YYYY.MM.DD')
      this.noteForm.endTime = moment(this.noteForm.endTime).format('YYYY.MM.DD')
      this.$refs.noteForm.validate((valid) => {
        if (valid) {
          this.$store.dispatch('editGroupTask', {
            groupId: this.theGroup._id,
            task: this.noteForm
          })
          .then(() => {
            this.$Message.success('修改成功')
            this.cancel()
            this.$emit('showModal')
          }, (msg) => this.$Message.warning(msg))
        } else {
          this.$Message.warning('表单错误')
        }
      })
    },
    cancel () {
      this.$emit('closeModal')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
