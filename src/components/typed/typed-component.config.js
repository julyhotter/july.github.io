export const params = {
  strings: {
    type: Array,
    default: function () {
      return ['Hello World']
    },
  },
  stringsElement: {
    type: String,
    default: null,
  },
  typeSpeed: {
    type: Number,
    default: 80,
  },
  startDelay: {
    type: Number,
    default: 0,
  },
  backSpeed: {
    type: Number,
    default: 30,
  },
  smartBackspace: {
    type: Boolean,
    default: true,
  },
  shuffle: {
    type: Boolean,
    default: false,
  },
  backDelay: {
    type: Number,
    default: 500,
  },
  fadeOut: {
    type: Boolean,
    default: false,
  },
  fadeOutClass: {
    type: String,
    default: 'typed-fade-out',
  },
  fadeOutDelay: {
    type: Number,
    default: 500,
  },
  loop: {
    type: Boolean,
    default: false,
  },
  loopCount: {
    type: Number,
    default: Infinity,
  },
  showCursor: {
    type: Boolean,
    default: true,
  },
  cursorChar: {
    type: String,
    default: '|',
  },
  autoInsertCss: {
    type: Boolean,

    default: true,
  },
  attr: {
    type: String,

    default: null,
  },
  bindInputFocusEvents: {
    type: Boolean,

    default: false,
  },
  contentType: {
    type: String,
    default: 'html',
  },
}
// 获取监听的对象信息
export const getEventHandlers = (context, typedConfig) => {
  typedConfig.onComplete = () => {
    context.emit('onComplete')
  }

  typedConfig.preStringTyped = () => {
    context.emit('preStringTyped')
  }

  typedConfig.onStringTyped = () => {
    context.emit('onStringTyped')
  }

  typedConfig.onLastStringBackspaced = () => {
    context.emit('onLastStringBackspaced')
  }

  typedConfig.onTypingPaused = () => {
    context.emit('onTypingPaused')
  }

  typedConfig.onTypingResumed = () => {
    context.emit('onTypingResumed')
  }

  typedConfig.onReset = () => {
    context.emit('onReset')
  }

  typedConfig.onStop = () => {
    context.emit('onStop')
  }

  typedConfig.onStart = () => {
    context.emit('onStart')
  }

  typedConfig.onDestroy = () => {
    context.emit('onDestroy')
  }

  return typedConfig
}
