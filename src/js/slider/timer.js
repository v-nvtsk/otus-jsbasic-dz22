const TIMEOUT = 5000;

export default function Timer(timeout = TIMEOUT) {
  return {
    timerId: null,
    startTime: null,
    callback: null,
    timeout,
    remainTime: null,
    init(cb, time) {
      this.callback = cb;
      this.timeout = time || this.timeout;
      this.start(this.timeout);
    },
    start(time) {
      clearTimeout(this.timerId);
      this.startTime = Date.now();
      this.timerId = setTimeout(this.callback, time);
    },
    pause() {
      const pauseTime = Date.now();
      this.remainTime = this.remainTime || this.timeout - (pauseTime - this.startTime);
      clearTimeout(this.timerId);
      this.timerId = null;
    },
    continue() {
      if (this.remainTime === null) return;
      this.start(this.remainTime);
    },
    reset() {
      this.remainTime = null;
      this.start(this.timeout);
    },
  };
}
