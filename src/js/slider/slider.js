import "./slider.scss";

const TIMEOUT = 5000;

function Timer(timeout) {
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
      this.start(this.remainTime);
    },
    reset() {
      this.remainTime = null;
      this.start(this.timeout);
    },
  };
}

export default function Slider(slider) {
  const wrapper = slider.querySelector(".slider__wrapper");
  const sliderBtnPrev = slider.querySelector(".slider__btn--prev");
  const sliderBtnNext = slider.querySelector(".slider__btn--next");

  const timer = new Timer(TIMEOUT);

  const sliderCallbacks = {
    onBtnPrevClick() {
      this.slides[this.activeSlideNum].classList.remove("slide--active");
      this.activeSlideNum = this.activeSlideNum === 0 ? this.slidesCount - 1 : this.activeSlideNum - 1;
      this.setActiveSlide(this.activeSlideNum);
    },
    onBtnNextClick() {
      this.slides[this.activeSlideNum].classList.remove("slide--active");
      this.activeSlideNum = this.activeSlideNum === this.slidesCount - 1 ? 0 : this.activeSlideNum + 1;
      this.setActiveSlide(this.activeSlideNum);
    },
  };

  sliderBtnPrev.addEventListener("click", sliderCallbacks.onBtnPrevClick.bind(this));
  sliderBtnNext.addEventListener("click", sliderCallbacks.onBtnNextClick.bind(this));

  this.activeSlideNum = 0;
  this.slides = slider.querySelectorAll(".slider__slide");
  this.slidesCount = this.slides.length;

  this.addSlide = (slideImgPath) => {
    const li = document.createElement("li");
    li.classList.add("slider__slide", "slide");
    const img = document.createElement("img");
    img.classList.add("slide__image");
    img.src = slideImgPath;
    li.append(img);
    wrapper.append(li);
    this.slides = slider.querySelectorAll(".slider__slide");
    this.slidesCount += 1;
  };

  this.setActiveSlide = () => {
    this.slides[this.activeSlideNum].classList.add("slide--active");
    wrapper.style.transform = `translateX(-${this.activeSlideNum * 100}%)`;
    timer.reset();
  };

  timer.init(sliderCallbacks.onBtnNextClick.bind(this));
  slider.addEventListener("mouseover", () => {
    slider.classList.add("animation-paused");
    timer.pause();
  });
  slider.addEventListener("mouseout", () => {
    slider.classList.remove("animation-paused");
    timer.continue();
  });

  return this;
}
