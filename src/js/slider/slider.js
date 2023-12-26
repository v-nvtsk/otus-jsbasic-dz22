import "./slider.scss";
import Timer from "./timer";

export default function Slider(container, interval, loop = true) {
  const wrapper = container.querySelector(".slider__wrapper");
  const sliderBtnPrev = container.querySelector(".slider__btn--prev");
  const sliderBtnNext = container.querySelector(".slider__btn--next");

  const timer = new Timer(interval);

  const sliderCallbacks = {
    onBtnPrevClick() {
      this.slides[this.activeSlideNum].classList.remove("slide--active");
      if (loop) {
        this.activeSlideNum = this.activeSlideNum === 0 ? this.slidesCount - 1 : this.activeSlideNum - 1;
      } else {
        this.activeSlideNum = this.activeSlideNum === 0 ? this.activeSlideNum : this.activeSlideNum - 1;
      }
      this.setActiveSlide(this.activeSlideNum);
    },
    onBtnNextClick() {
      this.slides[this.activeSlideNum].classList.remove("slide--active");
      if (loop) {
        this.activeSlideNum = this.activeSlideNum === this.slidesCount - 1 ? 0 : this.activeSlideNum + 1;
      } else {
        this.activeSlideNum =
          this.activeSlideNum === this.slidesCount - 1 ? this.activeSlideNum : this.activeSlideNum + 1;
      }
      this.setActiveSlide(this.activeSlideNum);
    },
  };

  sliderBtnPrev.addEventListener("click", sliderCallbacks.onBtnPrevClick.bind(this));
  sliderBtnNext.addEventListener("click", sliderCallbacks.onBtnNextClick.bind(this));

  this.activeSlideNum = 0;
  this.slides = container.querySelectorAll(".slider__slide");
  this.slidesCount = this.slides.length;

  this.addSlide = (slideImgPath) => {
    const li = document.createElement("li");
    li.classList.add("slider__slide", "slide");
    const img = document.createElement("img");
    img.classList.add("slide__image");
    img.src = slideImgPath;
    li.append(img);
    wrapper.append(li);
    this.slides = container.querySelectorAll(".slider__slide");
    this.slidesCount += 1;
  };

  this.setActiveSlide = () => {
    this.slides[this.activeSlideNum].classList.add("slide--active");
    wrapper.style.transform = `translateX(-${this.activeSlideNum * 100}%)`;
    timer.reset();
  };

  timer.init(sliderCallbacks.onBtnNextClick.bind(this));
  container.addEventListener("mouseover", () => {
    container.classList.add("animation-paused");
    timer.pause();
  });
  container.addEventListener("mouseout", () => {
    container.classList.remove("animation-paused");
    timer.continue();
  });

  return this;
}
