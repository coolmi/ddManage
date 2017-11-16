export function setFlowContent(forms) {
  let html = '';
  for (let item of forms) {
    if (item.title) {
      html += `<divider>${item.title}</divider>`
      html += `<divider>${item.pageid}</divider>`
    }
  }
  return html
}

export default {
  setFlowContent
}
