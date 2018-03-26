export default function textTransfer (message) {
  if (message) {
    let messageTransfer = ''
    messageTransfer = message.replace(/\n/g, '@').replace(/\r/g, '_#')
    messageTransfer = messageTransfer.replace(/_#_@/g, '<br/>')
    messageTransfer = messageTransfer.replace(/_@/g, '<br/>')
    messageTransfer = messageTransfer.replace(/\s/g, '&nbsp;')
    return messageTransfer
  }
  return message
}
