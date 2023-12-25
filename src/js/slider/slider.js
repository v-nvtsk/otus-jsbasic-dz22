import "./slider.scss";

export default function Slider(slider) {
  const wrapper = slider.querySelector(".slider__wrapper");
  const sliderBtnPrev = slider.querySelector(".slider__btn--prev");
  const sliderBtnNext = slider.querySelector(".slider__btn--next");

  const callbacks = {
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

  sliderBtnPrev.addEventListener("click", callbacks.onBtnPrevClick.bind(this));
  sliderBtnNext.addEventListener("click", callbacks.onBtnNextClick.bind(this));

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
  };

  return this;
}
