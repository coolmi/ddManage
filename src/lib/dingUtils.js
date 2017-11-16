let dd = window.dd;

export function setRight(config, cb, fcb) {
  const {control} = config;
  dd.ready(function () {
    dd.biz.navigation.setRight(config);
    if (control) {
      onSuccess: cb
      onFail: fcb
    }
  });
}

export function setTitle(title) {
  dd.ready(function () {
    dd.biz.navigation.setTitle({
      title: title
    })
  });
}
