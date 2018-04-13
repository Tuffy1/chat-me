<template>
  <div class="sticky-note-card">
    <Card class="card">
      <div class="img-wrap">
        <i class="icon link-like" @click="newNote">
          <Icon type="plus" size="200px"></Icon>
        </i>
      </div>
    </Card>
    <Modal v-model="modalShow" title="新建便签" @on-cancel="cancel">
       <Form ref="newNoteForm" :model="newNoteForm" :rules="ruleValidate" class="form" label-position="left">
        <FormItem prop="title" label="标题" :label-width="80">
          <Input type="text" v-model="newNoteForm.title" placeholder="请输入标题"></Input>
        </FormItem>
        <FormItem prop="startTime" label="开始时间" :label-width="80">
          <DatePicker type="date"
                      placeholder="选择开始时间"
                      v-model="newNoteForm.startTime"
                      class="date"
                      ></DatePicker>
        </FormItem>
        <FormItem prop="endTime" label="截止时间" :label-width="80">
          <DatePicker type="date"
                      placeholder="选择截止时间"
                      v-model="newNoteForm.endTime"
                      class="date"
                      ></DatePicker>
        </FormItem>
        <FormItem prop="content" label="内容" :label-width="80">
          <Input type="text" v-model="newNoteForm.content" placeholder="请输入内容"></Input>
        </FormItem>
     </Form>
     <div slot="footer">
       <Button @click="onSubmit">确定</Button>
     </div>
    </Modal>
  </div>
</template>

<script>
import moment from 'moment'
import { mapState } from 'vuex'

export default {
  data () {
    return {
      modalShow: false,
      newNoteForm: {
        title: '',
        startTime: '',
        endTime: '',
        content: ''
      },
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
  props: ['user'],
  computed: {
    ...mapState(['theGroup'])
  },
  methods: {
    newNote () {
      this.$emit('closeModal')
      this.modalShow = true
    },
    cancel () {
      this.modalShow = false
    },
    onSubmit () {
      this.newNoteForm.startTime = moment(this.newNoteForm.startTime).format('YYYY.MM.DD')
      this.newNoteForm.endTime = moment(this.newNoteForm.endTime).format('YYYY.MM.DD')
      this.$refs.newNoteForm.validate((valid) => {
        if (valid) {
          this.$store.dispatch('newGroupTask', {
            groupId: this.theGroup._id,
            task: this.newNoteForm
          })
          .then(() => {
            this.$Message.success('添加成功')
            this.cancel()
            this.$emit('showModal')
          }, (msg) => this.$Message.warning(msg))
        } else {
          this.$Message.warning('表单错误')
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card {
  width: 150px;
  height: 200px;
  margin: 10px;
}
.card .img-wrap {
  width: 100%;
  height: 160px;
}
.form {
  padding-top: 30px;
  padding-right: 20px;
  position: relative;
}
.form .date {
  width: 100%;
}
.form .submit-btn {
  position: absolute;
  right: 20px;
  bottom: -50px;
}
</style>
