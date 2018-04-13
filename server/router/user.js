const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = require('../models/user')
const Group = require('../models/group')
const Auth = require('../models/auth')
const Task = require('../models/task')
const isLogin = require('../util/isLogin')
const bcrypt = require('bcrypt')
const saltRounds = 10

router.post('/register', (req, res) => {
  bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
    if (err) {
      console.log(err)
    } else {
      const theUser = new User({
        nickname: req.body.nickname,
        username: req.body.username,
        password: hash,
        email: req.body.email,
        introduce: ''
      })
      theUser.save((err) => {
        if (err) {
          res.send({code: 200, msg: err, success: false})
        } else {
          res.send({code: 200, result: '注册成功', success: true})
        }
      })
    }
  })
})

router.get('/info', (req, res) => {
  isLogin(req, res, (payload) => {
    User.findById({'_id': payload.userId}, (err, doc) => {
      if (err) {
        res.send({code: 700, msg: '查询出错：' + err, success: false})
      } else {
        res.send({code: 200, result: doc, success: true})
      }
    })
  })
})

router.post('/userSearch', (req, res) => {
  const query = {
    username: req.body.query
  }
  User.find(query, (err, doc) => {
    console.log(doc)
    let user = {}
    let userList = []
    if (doc) {
      doc.forEach((USER) => {
        user = {
          _id: USER._id,
          nickname: USER.nickname,
          username: USER.username,
          avatar: USER.avatar,
          introduce: USER.introduce,
          creatAt: USER.creatAt
        }
        userList.push(user)
      })
    }
    if (err) {
      res.send({code: 700, msg: '查询出错：' + err, success: false})
    } else {
      res.send({code: 200, result: userList, success: true})
    }
  })
})

router.get('/getChatNow', (req, res) => {
  isLogin(req, res, (payload) => {
    User.findById({'_id': payload.userId}, (err, doc) => {
      if (err) {
        console.log(err)
        res.send({code: 700, msg: '查询出错：' + err, success: false})
      } else {
        res.send({code: 200, result: doc.chatNow, success: true})
      }
    })
  })
})

router.post('/addChatNow', (req, res) => {
  let chatNow = {
    _id: req.body.user._id,
    avatar: req.body.user.avatar,
    nickname: req.body.user.nickname,
    username: req.body.user.username,
    introduce: req.body.user.introduce,
    creatAt: req.body.user.creatAt,
    type: req.body.user.type
  }
  isLogin(req, res, (payload) => {
    User.update({'_id': payload.userId}, {'$addToSet': {'chatNow': chatNow}}, (err, doc) => {
      if (err) {
        console.log(err)
        res.send({code: 700, msg: '查询出错：' + err, success: false})
      } else {
        res.send({code: 200, result: doc, success: true})
      }
    })
    // res.send({code: 404, msg: '无此数据'})
  })
})

router.post('/removeChat', (req, res) => {
  isLogin(req, res, (payload) => {
    User.update({'_id': payload.userId}, {'$pull': {'chatNow': {'username': req.body.user.username}}}, (err, doc) => {
      if (err) {
        console.log(err)
        res.send({code: 700, msg: '查询出错：' + err, success: false})
      } else {
        res.send({code: 200, result: doc, success: true})
      }
    })
  })
})

router.get('/getFriends', (req, res) => {
  isLogin(req, res, (payload) => {
    User.findById({'_id': payload.userId}, (err, doc) => {
      if (err) {
        console.log(err)
        res.send({code: 700, msg: '查询出错：' + err, success: false})
      } else {
        res.send({code: 200, result: doc.friends, success: true})
      }
    })
  })
})

router.post('/newFriend', (req, res) => {
  isLogin(req, res, (payload) => {
    User.find({'_id': req.body.user.to._id}, (err, doc) => {
      if (err) {
        console.log(err)
      } else if (doc) {
        User.update({'_id': req.body.user.to._id}, {'$pull': {'friends': {'_id': req.body.user.from._id}}}, (err, doc) => {
          if (err) {
            console.log(err)
          } else {
            User.update({'_id': req.body.user.to._id}, {'$addToSet': {'friends': req.body.user.from}}, (err, doc) => {
              if (err) {
                console.log(err)
                res.send({code: 700, msg: '查询出错：' + err, success: false})
              } else {
                Auth.findOne({user: req.body.user.to._id}, (err, doc) => {
                  if (err) {
                    res.send({code: 700, msg: '查询出错：' + err})
                  } else if (doc) {
                    const clients = doc.clients
                    for (const client of clients) {
                      global.io.to(client).emit('NEW_FRIEND', req.body.user.from)
                    }
                    res.send({code: 200, result: '等待对方验证', success: true})
                  }
                })
              }
            })
          }
        })
      } else if (!doc) {
        User.update({'_id': req.body.user.to._id}, {'$addToSet': {'friends': req.body.user.from}}, (err, doc) => {
          if (err) {
            console.log(err)
            res.send({code: 700, msg: '查询出错：' + err, success: false})
          } else {
            Auth.findOne({user: req.body.user.to._id}, (err, doc) => {
              if (err) {
                res.send({code: 700, msg: '查询出错：' + err})
              } else if (doc) {
                const clients = doc.clients
                for (const client of clients) {
                  global.io.to(client).emit('NEW_FRIEND', req.body.user.from)
                }
                res.send({code: 200, result: '等待对方验证', success: true})
              }
            })
          }
        })
      }
    })
    // User.update({'_id': req.body.user.to._id}, {'$addToSet': {'friends': req.body.user.from}}, (err, doc) => {
    //   if (err) {
    //     console.log(err)
    //     res.send({code: 700, msg: '查询出错：' + err, success: false})
    //   } else {
    //     Auth.findOne({user: req.body.user.to._id}, (err, doc) => {
    //       if (err) {
    //         res.send({code: 700, msg: '查询出错：' + err})
    //       } else if (doc) {
    //         const clients = doc.clients
    //         for (const client of clients) {
    //           global.io.to(client).emit('NEW_FRIEND', req.body.user.from)
    //         }
    //         res.send({code: 200, result: '等待对方验证', success: true})
    //       }
    //     })
    //   }
    // })
  })
})

router.post('/friendConfirm', (req, res) => {
  isLogin(req, res, (payload) => {
    User.update({'_id': req.body.user.from._id, 'friends._id': req.body.user.to._id}, {'$set': {'friends.$.relat': true}}, (err, doc) => {
      if (err) {
        console.log(err)
      }
    })
    User.update({'_id': req.body.user.to._id}, {'$addToSet': {'friends': req.body.user.from}}, (err, doc) => {
      if (err) {
        console.log(err)
        res.send({code: 700, msg: '查询出错：' + err, success: false})
      } else {
        Auth.findOne({user: req.body.user.to._id}, (err, doc) => {
          if (err) {
            res.send({code: 700, msg: '查询出错：' + err})
          } else if (doc) {
            const clients = doc.clients
            for (const client of clients) {
              global.io.to(client).emit('NEW_FRIEND', req.body.user.from)
            }
            res.send({code: 200, result: '成功添加', success: true})
          }
        })
      }
    })
  })
})

router.post('/deleteFriend', (req, res) => {
  isLogin(req, res, (payload) => {
    User.update({'_id': payload.userId}, {'$pull': {'friends': {'_id': req.body.user._id}}}, (err, doc) => {
      if (err) {
        console.log(err)
        res.send({code: 700, msg: '查询出错：' + err, success: false})
      } else {
        User.update({'_id': payload.userId}, {'$pull': {'chatNow': {'_id': req.body.user._id}}}, (err, doc) => {
          if (err) {
            console.log(err)
            res.send({code: 700, msg: '查询出错：' + err, success: false})
          } else {
            res.send({code: 200, result: doc, success: true})
          }
        })
      }
    })
  })
})

router.get('/getGroups', (req, res) => {
  isLogin(req, res, (payload) => {
    User.findById({'_id': payload.userId}, (err, doc) => {
      if (err) {
        console.log(err)
        res.send({code: 700, msg: '查询出错：' + err, success: false})
      } else {
        res.send({code: 200, result: doc.groups, success: true})
      }
    })
  })
})

router.post('/newGroup', (req, res) => {
  isLogin(req, res, (payload) => {
    const theGroup = new Group(req.body.group)
    theGroup.save((err, doc) => {
      const newGroup = doc
      if (err) {
        console.log(err)
        res.send({code: 700, msg: '保存出错：' + err, success: false})
      } else {
        const userGroup = {
          _id: theGroup._id.toString(),
          nickname: theGroup.nickname,
          username: theGroup.username,
          avatar: theGroup.avatar,
          introduce: theGroup.introduce,
          creatAt: theGroup.creatAt
        }
        req.body.group.members.forEach(member => {
          User.update({'_id': member._id}, {'$addToSet': {'groups': userGroup}}, (err, doc) => {
            if (err) {
              console.log(err)
              // res.send({code: 700, msg: '查询出错：' + err, success: false})
            }
          })
        })
        res.send({code: 200, result: newGroup, success: true})
      }
    })
  })
})

router.post('/deleteGroup', (req, res) => {
  isLogin(req, res, (payload) => {
    User.update({'_id': payload.userId}, {'$pull': {'groups': {'_id': mongoose.mongo.ObjectId(req.body.group._id)}}}, (err, doc) => {
      if (err) {
        console.log(err)
        res.send({code: 700, msg: '查询出错：' + err, success: false})
      } else {
        User.update({'_id': payload.userId}, {'$pull': {'chatNow': {'_id': req.body.group._id}}}, (err, doc) => {
          if (err) {
            console.log(err)
            res.send({code: 700, msg: '查询出错：' + err, success: false})
          } else {
            res.send({code: 200, result: doc, success: true})
          }
        })
      }
    })
  })
})

router.post('/newGroupMember', (req, res) => {
  let groupAddMembers = false
  let membersAddGroup = false
  req.body.newMembers.forEach((member, index) => {
    Group.findOne({'_id': req.body.group._id}, (err, doc) => {
      if (err) {
        console.log(err)
      } else if (doc) {
        Group.update({'_id': req.body.group._id, 'members._id': member._id}, {$set: {'members.$.relat': true, 'members.$.role': 3}}, (err, doc) => {
          if (err) {
            console.log(err)
          } else {
            if (index === req.body.newMembers.length) {
              groupAddMembers = true
            }
          }
        })
      } else {
        Group.update({'_id': req.body.group._id}, {'$addToSet': {'members': member}}, (err, doc) => {
          if (err) {
            console.log(err)
          } else {
            if (index === req.body.newMembers.length) {
              groupAddMembers = true
            }
          }
        })
      }
    })
    User.update({'_id': member._id}, {'$addToSet': {'groups': req.body.group}}, (err, doc) => {
      if (err) {
        console.log(err)
      } else {
        if (index === req.body.newMembers.length) {
          membersAddGroup = true
        }
      }
    })
    if (groupAddMembers && membersAddGroup) {
      res.send({code: 200, result: '添加成功', success: true})
    }
  })
})

router.post('/deleteGroupMember', (req, res) => {
  isLogin(req, res, (payload) => {
    const groupId = req.body.groupId
    const memberId = req.body.memberId
    const userId = payload.userId
    let theGroup = {}
    let roleInGroup
    Group.findOne({'_id': mongoose.mongo.ObjectId(groupId)}, (err, doc) => {
      if (err) {
        console.log(err)
      } else {
        theGroup = doc
        for (let i = 0; i < theGroup.members.length; i++) {
          if (theGroup.members[i]._id === userId) {
            roleInGroup = theGroup.members[i].role
            break
          }
        }
        for (let i = 0; i < theGroup.members.length; i++) {
          if (theGroup.members[i]._id === memberId) {
            theGroup.members[i].relat = false
            break
          }
        }
        if ((roleInGroup === 1 && memberId !== userId) || (roleInGroup !== 1 && memberId === userId)) {
          Group.update({'_id': groupId}, {$set: {'members': theGroup.members}}, (err, doc) => {
            if (err) {
              console.log(err)
            } else {
              User.update({'_id': mongoose.mongo.ObjectId(memberId)}, {'$pull': {'groups': {'_id': groupId}}}, (err, doc) => {
                if (err) {
                  console.log(err)
                } else {
                  User.update({'_id': mongoose.mongo.ObjectId(memberId)}, {'$pull': {'chatNow': {'_id': groupId}}}, (err, doc) => {
                    if (err) {
                      console.log(err)
                    } else {
                      res.send({code: 200, result: '移出成功', success: true})
                    }
                  })
                }
              })
            }
          })
        } else {
          res.send({code: 200, result: '无权限', success: false})
        }
      }
    })
  })
})

router.post('/changeMemberRole', (req, res) => {
  isLogin(req, res, (payload) => {
    let groupId = req.body.groupId
    let memberId = req.body.memberId
    let newRole = req.body.newRole
    Group.findOne({'_id': mongoose.mongo.ObjectId(groupId)}, (err, doc) => {
      if (err) {
        console.log(err)
      } else if (!doc) {
        res.send({code: 200, msg: '团队不存在', success: false})
      } else {
        if (doc.members.some(member => (member._id === payload.userId && member.role === 1))) {
          Group.update({'_id': mongoose.mongo.ObjectId(groupId), 'members._id': memberId}, {$set: {'members.$.role': newRole}}, (err, doc) => {
            if (err) {
              console.log(err)
            } else {
              res.send({code: 200, result: '修改成功', success: true})
            }
          })
        } else {
          res.send({code: 200, msg: '无权进行此操作', success: false})
        }
      }
    })
  })
})

router.post('/newGroupTask', (req, res) => {
  isLogin(req, res, (payload) => {
    let groupId = req.body.groupId
    let task = req.body.task
    User.findOne({'_id': mongoose.mongo.ObjectId(payload.userId)}, (err, doc) => {
      if (err) {
        console.log(err)
      } else {
        const nickname = doc.nickname
        const creator = {
          _id: payload.userId,
          nickname: nickname
        }
        const theTask = new Task({
          title: task.title,
          creator: creator,
          startTime: task.startTime,
          endTime: task.endTime,
          content: task.content
        })
        theTask.save((err) => {
          if (err) {
            console.log(err)
          } else {
            const form = {
              _id: theTask._id.toString(),
              title: theTask.title,
              creator: theTask.creator,
              creatAt: theTask.creatAt,
              startTime: theTask.startTime,
              endTime: theTask.endTime,
              content: theTask.content
            }
            Group.update({'_id': mongoose.mongo.ObjectId(groupId)}, {$push: {tasks: form}}, (err, doc) => {
              if (err) {
                console.log(err)
              } else {
                res.send({code: 200, result: form, success: true})
              }
            })
          }
        })
      }
    })
  })
})

router.post('/editGroupTask', (req, res) => {
  let groupId = req.body.groupId
  let task = req.body.task
  Task.update({'_id': mongoose.mongo.ObjectId(task._id)}, {
    'title': task.title,
    'startTime': task.startTime,
    'endTime': task.endTime,
    'content': task.content}, (err, doc) => {
      if (err) {
        console.log(err)
      } else {
        Group.update({'_id': mongoose.mongo.ObjectId(groupId), 'tasks._id': task._id}, {
          'tasks.$.title': task.title,
          'tasks.$.startTime': task.startTime,
          'tasks.$.endTime': task.endTime,
          'tasks.$.content': task.content
        }, (err, doc) => {
          if (err) {
            console.log(err)
          } else {
            res.send({code: 200, result: task, success: true})
          }
        })
      }
    })
})

router.post('/removeGroupTask', (req, res) => {
  let groupId = req.body.groupId
  let taskId = req.body.taskId
  Group.update({'_id': mongoose.mongo.ObjectId(groupId)}, {'$pull': {'tasks': {'_id': taskId}}}, (err, doc) => {
    if (err) {
      console.log(err)
    } else {
      res.send({code: 200, result: taskId, success: true})
    }
  })
})

router.get('/groupInfo', (req, res) => {
  isLogin(req, res, (payload) => {
    Group.findById({'_id': req.query.groupId}, (err, doc) => {
      if (err) {
        res.send({code: 700, msg: '查询出错：' + err, success: false})
      } else {
        res.send({code: 200, result: doc, success: true})
      }
    })
  })
})

router.get('/showInfo', (req, res) => {
  isLogin(req, res, (payload) => {
    User.findOne({'username': req.query.username}, (err, doc) => {
      if (err) {
        res.send({code: 700, msg: '查询出错：' + err, success: false})
      } else {
        const result = {
          nickname: doc.nickname,
          username: doc.username,
          creatAt: doc.creatAt,
          introduce: doc.introduce
        }
        res.send({code: 200, result: result, success: true})
      }
    })
  })
})

router.post('/setUserInfo', (req, res) => {
  isLogin(req, res, (payload) => {
    User.update({'_id': payload.userId}, {'$set': {'nickname': req.body.nickname, 'email': req.body.email, 'introduce': req.body.introduce}}, (err, doc) => {
      if (err) {
        console.log(err)
        res.send({code: 700, msg: '查询出错：' + err, success: false})
      } else {
        res.send({code: 200, result: doc, success: true})
      }
    })
  })
})

router.post('/setUserPassword', (req, res) => {
  isLogin(req, res, (payload) => {
    User.findById({_id: payload.userId}, (err, doc) => {
      switch (true) {
        case !!err:
          console.log(err)
          break
        case !doc:
          res.send({code: 0, msg: '查询失败', success: false})
          break
        case doc.password !== req.body.oldPassword:
          res.send({code: 422, msg: '原密码输入错误', success: false})
          break
        case doc.password === req.body.oldPassword:
          User.update({_id: payload.userId}, {'$set': {'password': req.body.newPassword}}, (err, doc) => {
            if (err) {
              res.send({code: 700, msg: '更改出错：' + err, success: false})
            } else {
              res.send({code: 200, result: doc, success: true})
            }
          })
          break
        default:
          res.send({code: 3, msg: '未知错误', success: false})
      }
    })
  })
})

module.exports = router
