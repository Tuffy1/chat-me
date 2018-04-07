const fs = require('fs')
const express = require('express')
const router = express.Router()
// const jwt = require('jwt-simple')
const formidable = require('formidable')
const Auth = require('../models/auth')
const Group = require('../models/group')
const User = require('../models/user')
const UserMessage = require('../models/message')
const GroupMessage = require('../models/group-message')

// const serializeCookie = require('../util/serializeCookie')
const isLogin = require('../util/isLogin')

// const parseCookie = require('../util/parseCookie')
// const socket = io.connect('http://localhost:8080')
// const secret = 'Joyee'

router.post('/sendMessage', (req, res) => {
  isLogin(req, res, (payload) => {
    let msg
    const groupId = req.body.chatTo
    if (req.body.type === 'group') {
      let group = {}
      msg = new GroupMessage({
        from: payload.userId,
        to: req.body.chatTo,
        content: req.body.content
      })
      Group.findOne({_id: groupId}, (err, doc) => {
        if (err) {
          console.log(err)
        } else {
          if (doc.members.some(member => (member._id.toString() === payload.userId.toString()) && member.relat)) {
            msg.save((err) => {
              if (err) {
                res.send({code: 700, msg: '存入数据库出错：' + err, success: false})
              } else {
                group = {
                  _id: doc._id.toString(),
                  avatar: doc.avatar,
                  nickname: doc.nickname,
                  username: doc.username,
                  introduce: doc.introduce,
                  creatAt: doc.creatAt,
                  type: 'group'
                }
                let groupString = JSON.stringify(group)
                group = JSON.parse(groupString)
                doc.members.forEach(member => {
                  if (member._id.toString() !== payload.userId.toString() && member.relat) {
                    User.update({_id: member}, {'$addToSet': {'chatNow': group}}, (err, doc) => {
                      if (err) {
                        console.log(err)
                      }
                    })
                  }
                })
                const form = {
                  msg: msg,
                  group: group
                }
                global.io.to(groupId.toString()).emit('GROUP_MESSAGE', form)
                res.send({code: 200, result: msg, success: true})
              }
            })
          } else {
            res.send({code: 200, msg: '您不在此群聊中', success: false})
          }
        }
      })
    } else {
      msg = new UserMessage({
        from: payload.userId,
        to: req.body.chatTo,
        content: req.body.content
      })
      User.findOne({_id: payload.userId}, (err, doc) => {
        let user = {}
        user._id = doc._id
        user.avatar = doc.avatar
        user.nickname = doc.nickname
        user.username = doc.username
        user.introduce = doc.introduce
        user.creatAt = doc.creatAt
        user.type = 'user'
        let userString = JSON.stringify(user)
        user = JSON.parse(userString)
        if (err) {
          console.log(err)
        } else {
          if (doc.friends.some(friend => (friend._id.toString() === req.body.chatTo.toString()) && friend.relat)) {
            User.findOne({_id: req.body.chatTo}, (err, doc) => {
              if (err) {
                console.log(err)
              } else {
                if (doc.friends.some(friend => (friend._id.toString() === payload.userId.toString() && friend.relat))) {
                  msg.save((err) => {
                    if (err) {
                      res.send({code: 700, msg: '存入数据库出错：' + err, success: false})
                    } else {
                      Auth.findOne({user: req.body.chatTo}, (err, doc) => {
                        if (err) {
                          res.send({code: 700, msg: '查询出错：' + err})
                        } else if (doc) {
                          const clients = doc.clients
                          console.log(typeof user._id)
                          User.update({_id: req.body.chatTo}, {'$addToSet': {'chatNow': user}}, (err, doc) => {
                            if (err) {
                              console.log(err)
                            } else {
                              const form = {
                                msg: msg,
                                user: user
                              }
                              for (const client of clients) {
                                global.io.to(client).emit('USER_MESSAGE', form)
                              }
                              res.send({code: 200, result: msg, success: true})
                            }
                          })
                        } else if (!doc) {
                          // 用户当前不在线
                          res.send({code: 200, result: msg, success: true})
                        }
                      })
                    }
                  })
                } else {
                  res.send({code: 200, msg: '您不是对方好友', success: false})
                }
              }
            })
          } else {
            res.send({code: 200, msg: '对方不是您好友', success: false})
          }
        }
      })
    }
  })
})
//       Auth.findOne({user: req.body.chatTo}, (err, doc) => {
//         if (err) {
//           res.send({code: 700, msg: '查询出错：' + err})
//         } else if (doc) {
//           const clients = doc.clients
//           let user = {}
//           User.findOne({_id: payload.userId}, (err, doc) => {
//             if (err) {
//               console.log(err)
//             } else {
//               user._id = doc._id
//               user.avatar = doc.avatar
//               user.nickname = doc.nickname
//               user.username = doc.username
//               user.introduce = doc.introduce
//               user.creatAt = doc.creatAt
//               user.type = 'user'
//               User.update({_id: req.body.chatTo}, {'$addToSet': {'chatNow': user}}, (err, doc) => {
//                 if (err) {
//                   console.log(err)
//                 } else {
//                   const form = {
//                     msg: msg,
//                     user: user
//                   }
//                   for (const client of clients) {
//                     global.io.to(client).emit('USER_MESSAGE', form)
//                   }
//                   res.send({code: 200, result: msg, success: true})
//                 }
//               })
//             }
//           })
//         } else if (!doc) {
//           // 用户当前不在线
//           res.send({code: 200, result: msg, success: true})
//         }
//       })
//     }
//   }
//     }
//     msg.save((err) => {
//       if (err) {
//         res.send({code: 700, msg: '存入数据库出错：' + err, success: false})
//       } else {
//         if (req.body.type === 'group') {
//           let group = {}
//           Group.findOne({_id: groupId}, (err, doc) => {
//             if (err) {
//               console.log(err)
//             } else {
//               group = {
//                 _id: doc._id.toString(),
//                 avatar: doc.avatar,
//                 nickname: doc.nickname,
//                 username: doc.username,
//                 introduce: doc.introduce,
//                 creatAt: doc.creatAt,
//                 type: 'group'
//               }
//               doc.members.forEach(member => {
//                 if (member._id.toString() !== payload.userId.toString()) {
//                   User.update({_id: member}, {'$addToSet': {'chatNow': group}}, (err, doc) => {
//                     if (err) {
//                       console.log(err)
//                     }
//                   })
//                 }
//               })
//               const form = {
//                 msg: msg,
//                 group: group
//               }
//               global.io.to(groupId.toString()).emit('GROUP_MESSAGE', form)
//               res.send({code: 200, result: msg, success: true})
//             }
//           })
//         } else {
//           Auth.findOne({user: req.body.chatTo}, (err, doc) => {
//             if (err) {
//               res.send({code: 700, msg: '查询出错：' + err})
//             } else if (doc) {
//               const clients = doc.clients
//               let user = {}
//               User.findOne({_id: payload.userId}, (err, doc) => {
//                 if (err) {
//                   console.log(err)
//                 } else {
//                   user._id = doc._id
//                   user.avatar = doc.avatar
//                   user.nickname = doc.nickname
//                   user.username = doc.username
//                   user.introduce = doc.introduce
//                   user.creatAt = doc.creatAt
//                   user.type = 'user'
//                   User.update({_id: req.body.chatTo}, {'$addToSet': {'chatNow': user}}, (err, doc) => {
//                     if (err) {
//                       console.log(err)
//                     } else {
//                       const form = {
//                         msg: msg,
//                         user: user
//                       }
//                       for (const client of clients) {
//                         global.io.to(client).emit('USER_MESSAGE', form)
//                       }
//                       res.send({code: 200, result: msg, success: true})
//                     }
//                   })
//                 }
//               })
//             } else if (!doc) {
//               // 用户当前不在线
//               res.send({code: 200, result: msg, success: true})
//             }
//           })
//         }
//       }
//     })
//   })
// })

router.post('/uploadImg', (req, res) => {
  isLogin(req, res, (payload) => {
    const form = new formidable.IncomingForm()
    form.encoding = 'utf-8'
    // form.uploadDir = path.resolve('localhost:8080/', 'public/uploadFiles/')
    form.keepExtensions = true
    form.maxFieldsSize = 2 * 1024 * 1024 /* 限制图片大小最大为2M */
    let fileType
    let imgPath
    form.parse(req, (err, fields, files) => {
      if (err) { return console.log(err) }
      switch (files.file.type) {
        case 'image/jpeg':
          fileType = 'jpeg'
          break
        case 'image/png':
          fileType = 'png'
          break
        case 'image/jpg':
          fileType = 'jpg'
          break
      }
      if (fileType === undefined) {
        res.send('uploadIcon img type err')
      }
      let chatTo = fields.to
      let userType = fields.type
      let filename = files.file.name
      let uploadDir = 'public/'
      let avatarName = Date.now() + '_' + filename
      fs.renameSync(files.file.path, uploadDir + avatarName)
      imgPath = 'http://localhost:8088/' + avatarName
      // res.send({code: 200, success: true, result: imgPath})
      let msg
      if (userType === 'group') {
        let group = {}
        msg = new GroupMessage({
          from: payload.userId,
          to: chatTo,
          content: imgPath,
          type: 'image'
        })
        Group.findOne({_id: chatTo}, (err, doc) => {
          if (err) {
            console.log(err)
          } else {
            if (doc.members.some(member => (member._id.toString() === payload.userId.toString()) && member.relat)) {
              msg.save((err) => {
                if (err) {
                  res.send({code: 700, msg: '存入数据库出错：' + err, success: false})
                } else {
                  group = {
                    _id: doc._id.toString(),
                    avatar: doc.avatar,
                    nickname: doc.nickname,
                    username: doc.username,
                    introduce: doc.introduce,
                    creatAt: doc.creatAt,
                    type: 'group'
                  }
                  doc.members.forEach(member => {
                    if (member._id.toString() !== payload.userId.toString() && member.relat) {
                      User.update({_id: member}, {'$addToSet': {'chatNow': group}}, (err, doc) => {
                        if (err) {
                          console.log(err)
                        }
                      })
                    }
                  })
                  const form = {
                    msg: msg,
                    group: group
                  }
                  global.io.to(chatTo.toString()).emit('GROUP_MESSAGE', form)
                  res.send({code: 200, result: msg, success: true})
                }
              })
            } else {
              res.send({code: 200, msg: '您不在此群聊中', success: false})
            }
          }
        })
      } else {
        msg = new UserMessage({
          from: payload.userId,
          to: chatTo,
          content: imgPath,
          type: 'image'
        })
        User.findOne({_id: payload.userId}, (err, doc) => {
          let user = {}
          user._id = doc._id
          user.avatar = doc.avatar
          user.nickname = doc.nickname
          user.username = doc.username
          user.introduce = doc.introduce
          user.creatAt = doc.creatAt
          user.type = 'user'
          if (err) {
            console.log(err)
          } else {
            if (doc.friends.some(friend => (friend._id.toString() === chatTo.toString()) && friend.relat)) {
              User.findOne({_id: chatTo}, (err, doc) => {
                if (err) {
                  console.log(err)
                } else {
                  if (doc.friends.some(friend => (friend._id.toString() === payload.userId.toString() && friend.relat))) {
                    msg.save((err) => {
                      if (err) {
                        res.send({code: 700, msg: '存入数据库出错：' + err, success: false})
                      } else {
                        Auth.findOne({user: chatTo}, (err, doc) => {
                          if (err) {
                            res.send({code: 700, msg: '查询出错：' + err})
                          } else if (doc) {
                            const clients = doc.clients
                            User.update({_id: chatTo}, {'$addToSet': {'chatNow': user}}, (err, doc) => {
                              if (err) {
                                console.log(err)
                              } else {
                                const form = {
                                  msg: msg,
                                  user: user
                                }
                                for (const client of clients) {
                                  global.io.to(client).emit('USER_MESSAGE', form)
                                }
                                res.send({code: 200, result: msg, success: true})
                              }
                            })
                          } else if (!doc) {
                            // 用户当前不在线
                            res.send({code: 200, result: msg, success: true})
                          }
                        })
                      }
                    })
                  } else {
                    res.send({code: 200, msg: '您不是对方好友', success: false})
                  }
                }
              })
            } else {
              res.send({code: 200, msg: '对方不是您好友', success: false})
            }
          }
        })
      }
      // let msg
      // if (req.body.type === 'group') {
      //   msg = new GroupMessage({
      //     from: payload.userId,
      //     to: chatTo,
      //     content: imgPath,
      //     type: 'image'
      //   })
      // } else {
        // msg = new UserMessage({
        //   from: payload.userId,
        //   to: chatTo,
        //   content: imgPath,
        //   type: 'image'
        // })
      // }
      // msg.save((err) => {
      //   if (err) {
      //     res.send({code: 700, msg: '存入数据库出错：' + err, success: false})
      //   } else {
      //     if (userType === 'group') {
      //       let group = {}
      //       Group.findOne({_id: chatTo}, (err, doc) => {
      //         if (err) {
      //           console.log(err)
      //         } else {
      //           group._id = doc._id
      //           group.avatar = doc.avatar
      //           group.nickname = doc.nickname
      //           group.username = doc.username
      //           group.introduce = doc.introduce
      //           group.creatAt = doc.creatAt
      //           group.type = 'group'
      //           // console.log(`doc: ${doc}`)
      //           doc.members.forEach(member => {
      //             if (member.toString() !== payload.userId.toString()) {
      //               User.update({_id: member}, {'$addToSet': {'chatNow': group}}, (err, doc) => {
      //                 if (err) {
      //                   console.log(err)
      //                 }
      //               })
      //             }
      //           })
      //           const form = {
      //             msg: msg,
      //             group: group
      //           }
      //           global.io.to(chatTo.toString()).emit('GROUP_MESSAGE', form)
      //           res.send({code: 200, result: msg, success: true})
      //         }
      //       })
      //     } else {
      //       Auth.findOne({user: chatTo}, (err, doc) => {
      //         if (err) {
      //           res.send({code: 700, msg: '查询出错：' + err})
      //         } else if (doc) {
      //           const clients = doc.clients
      //           let user = {}
      //           User.findOne({_id: payload.userId}, (err, doc) => {
      //             if (err) {
      //               console.log(err)
      //             } else {
      //               user._id = doc._id
      //               user.avatar = doc.avatar
      //               user.nickname = doc.nickname
      //               user.username = doc.username
      //               user.introduce = doc.introduce
      //               user.creatAt = doc.creatAt
      //               user.type = 'user'
      //               User.update({_id: chatTo}, {'$addToSet': {'chatNow': user}}, (err, doc) => {
      //                 if (err) {
      //                   console.log(err)
      //                 } else {
      //                   const form = {
      //                     msg: msg,
      //                     user: user
      //                   }
      //                   for (const client of clients) {
      //                     global.io.to(client).emit('USER_MESSAGE', form)
      //                   }
      //                   res.send({code: 200, result: msg, success: true})
      //                 }
      //               })
      //             }
      //           })
      //         } else if (!doc) {
      //           // 用户当前不在线
      //           res.send({code: 200, result: msg, success: true})
      //         }
      //       })
      //     }
      //   }
      // })
    })
  })
})

router.get('/getUserMessage', (req, res) => {
  isLogin(req, res, (payload) => {
    UserMessage.find({$or: [{from: payload.userId}, {to: payload.userId}]}, (err, doc) => {
      if (err) {
        res.send({code: 700, msg: '查询数据库出错：' + err, success: false})
      } else if (!doc) {
        res.send({code: 200, result: '暂无聊天记录', success: true})
      } else if (doc) {
        res.send({code: 200, result: doc, success: true})
      } else {
        res.send({code: 3, msg: '未知错误', success: false})
      }
    })
  })
})

router.get('/getGroupMessage', (req, res) => {
  isLogin(req, res, (payload) => {
    GroupMessage.find({to: req.query.groupId}, (err, doc) => {
      if (err) {
        res.send({code: 700, msg: '查询数据库出错：' + err, success: false})
      } else if (!doc) {
        res.send({code: 200, result: '暂无聊天记录', success: true})
      } else if (doc) {
        res.send({code: 200, result: doc, success: true})
      } else {
        res.send({code: 3, msg: '未知错误', success: false})
      }
    })
  })
})

module.exports = router
