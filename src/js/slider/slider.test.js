import Slider from "./slider";

import { fireEvent } from "@testing-library/dom";

describe("Slider test suite", () => {
  let slider;
  let container;
  let wrapper;
  let sliderBtnPrev;
  let sliderBtnNext;

  function createElement(parent, tagName, ...className) {
    const element = document.createElement(tagName);
    if (className) {
      element.classList.add(...className);
    }
    if (parent) {
      parent.append(element);
    } else {
      document.body.append(element);
    }
    return element;
  }

  beforeEach(() => {
    jest.useFakeTimers();
    // eslint-disable-next-line no-undef
    jest.spyOn(global, "setTimeout");
    // eslint-disable-next-line no-undef
    jest.spyOn(global, "clearTimeout");

    container = document.createElement("div");
    container.classList.add("slider");
    wrapper = createElement(container, "ul", "slider__wrapper");
    sliderBtnPrev = createElement(container, "a", "slider__btn", "slider__btn--prev");
    sliderBtnNext = createElement(container, "a", "slider__btn", "slider__btn--next");

    slider = new Slider(container);

    slider.addSlide("test.jpg");
    slider.addSlide("test.jpg");
    slider.addSlide("test.jpg");
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("should be defined", () => {
    expect(slider).toBeDefined();
  });

  it("should create initial markup", () => {
    expect(container.querySelector(".slider__wrapper")).not.toBeNull();
    expect(container.querySelector(".slider__btn--prev")).not.toBeNull();
    expect(container.querySelector(".slider__btn--next")).not.toBeNull();
  });

  it("should add slide", () => {
    slider.addSlide("test.jpg");
    expect(wrapper.children.length).toBe(4);
    slider.addSlide("test.jpg");
    expect(wrapper.children.length).toBe(5);
  });

  it("initial style.transform should be empty", () => {
    expect(wrapper.style.transform).toBe("");
  });

  it("should set active slide back and forth", () => {
    sliderBtnNext.click();
    // slide 2
    expect(wrapper.style.transform).toBe("translateX(-100%)");

    sliderBtnNext.click();
    // slide 3
    expect(wrapper.style.transform).toBe("translateX(-200%)");

    sliderBtnNext.click();
    // slide 1
    expect(wrapper.style.transform).toBe("translateX(-0%)");

    sliderBtnPrev.click();
    // slide 3
    expect(wrapper.style.transform).toBe("translateX(-200%)");
  });

  it("should set active slide when add more slides", () => {
    slider.addSlide("test.jpg");
    expect(wrapper.children.length).toBe(4);
    slider.addSlide("test.jpg");
    expect(wrapper.children.length).toBe(5);

    sliderBtnPrev.click();
    // slide 5
    expect(wrapper.style.transform).toBe("translateX(-400%)");

    sliderBtnPrev.click();
    // slide 4
    expect(wrapper.style.transform).toBe("translateX(-300%)");
    sliderBtnPrev.click();
    sliderBtnPrev.click();
    sliderBtnPrev.click();
    // slide 1
    expect(wrapper.style.transform).toBe("translateX(-0%)");

    // slide 5
    sliderBtnPrev.click();
    expect(wrapper.style.transform).toBe("translateX(-400%)");
  });

  it("should set timer", () => {
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 5000);
  });

  it("should change slide by timer", () => {
    expect(slider.activeSlideNum).toBe(0);
    jest.advanceTimersToNextTimer(1);
    expect(slider.activeSlideNum).toBe(1);
    jest.advanceTimersToNextTimer(2);
    expect(slider.activeSlideNum).toBe(0);
  });

  it("should pause timer on mouseover", async () => {
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 5000);

    expect(clearTimeout).toHaveBeenCalledTimes(1);
    expect(clearTimeout).toHaveBeenLastCalledWith(null);

    // hover mouse over container
    fireEvent.mouseOver(wrapper, {
      duration: 4000,
      repeat: 1,
    });
    expect(clearTimeout).toHaveBeenCalledTimes(2);
    expect(container.classList.contains("animation-paused")).toBe(true);
  }, 10000);

  it("should continue timer on mouseout", async () => {
    // hover mouse over container
    fireEvent.mouseOver(wrapper, {
      duration: 4000,
      repeat: 1,
    });
    // remove mouse
    fireEvent.mouseOut(wrapper, {
      duration: 1500,
      repeat: 1,
    });
    expect(setTimeout).toHaveBeenCalledTimes(2);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 5000);
    expect(container.classList.contains("animation-paused")).toBe(false);
  });
});

describe("Slider no-loop test suite", () => {
  let slider;
  let container;
  let wrapper;
  let sliderBtnPrev;
  let sliderBtnNext;

  function createElement(parent, tagName, ...className) {
    const element = document.createElement(tagName);
    if (className) {
      element.classList.add(...className);
    }
    if (parent) {
      parent.append(element);
    } else {
      document.body.append(element);
    }
    return element;
  }

  beforeEach(() => {
    jest.useFakeTimers();
    // eslint-disable-next-line no-undef
    jest.spyOn(global, "setTimeout");
    // eslint-disable-next-line no-undef
    jest.spyOn(global, "clearTimeout");

    container = document.createElement("div");
    container.classList.add("slider");
    wrapper = createElement(container, "ul", "slider__wrapper");
    sliderBtnPrev = createElement(container, "a", "slider__btn", "slider__btn--prev");
    sliderBtnNext = createElement(container, "a", "slider__btn", "slider__btn--next");

    slider = new Slider(container, 5000, false);

    slider.addSlide("test.jpg");
    slider.addSlide("test.jpg");
    slider.addSlide("test.jpg");
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("should be defined", () => {
    expect(slider).toBeDefined();
  });

  it("should create initial markup", () => {
    expect(container.querySelector(".slider__wrapper")).not.toBeNull();
    expect(container.querySelector(".slider__btn--prev")).not.toBeNull();
    expect(container.querySelector(".slider__btn--next")).not.toBeNull();
  });

  it("should add slide", () => {
    slider.addSlide("test.jpg");
    expect(wrapper.children.length).toBe(4);
    slider.addSlide("test.jpg");
    expect(wrapper.children.length).toBe(5);
  });

  it("initial style.transform should be empty", () => {
    expect(wrapper.style.transform).toBe("");
  });

  it("should set active slide without loop", () => {
    sliderBtnPrev.click();
    // still slide 1
    expect(wrapper.style.transform).toBe("translateX(-0%)");

    sliderBtnNext.click();
    // slide 2
    expect(wrapper.style.transform).toBe("translateX(-100%)");

    sliderBtnNext.click();
    // slide 3
    expect(wrapper.style.transform).toBe("translateX(-200%)");

    sliderBtnNext.click();
    // still slide 3
    expect(wrapper.style.transform).toBe("translateX(-200%)");
  });

  it("should set active slide when add more slides", () => {
    slider.addSlide("test.jpg");
    expect(wrapper.children.length).toBe(4);
    slider.addSlide("test.jpg");
    expect(wrapper.children.length).toBe(5);

    sliderBtnPrev.click();
    // still slide 1
    expect(wrapper.style.transform).toBe("translateX(-0%)");

    sliderBtnNext.click();
    sliderBtnNext.click();
    sliderBtnNext.click();
    sliderBtnNext.click();
    sliderBtnNext.click();
    // still slide 5
    expect(wrapper.style.transform).toBe("translateX(-400%)");
    sliderBtnPrev.click();
    sliderBtnPrev.click();
    sliderBtnPrev.click();
    sliderBtnPrev.click();
    // slide 1
    expect(wrapper.style.transform).toBe("translateX(-0%)");

    // still slide 1
    sliderBtnPrev.click();
    expect(wrapper.style.transform).toBe("translateX(-0%)");
  });

  it("should set timer", () => {
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 5000);
  });

  it("should change slide by timer", () => {
    expect(slider.activeSlideNum).toBe(0);
    jest.advanceTimersToNextTimer(1);
    expect(slider.activeSlideNum).toBe(1);
    jest.advanceTimersToNextTimer(2);
    expect(slider.activeSlideNum).toBe(2);
  });

  it("should pause timer on mouseover", async () => {
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 5000);

    expect(clearTimeout).toHaveBeenCalledTimes(1);
    expect(clearTimeout).toHaveBeenLastCalledWith(null);

    // hover mouse over container
    fireEvent.mouseOver(wrapper, {
      duration: 4000,
      repeat: 1,
    });
    expect(clearTimeout).toHaveBeenCalledTimes(2);
    expect(container.classList.contains("animation-paused")).toBe(true);
  }, 10000);

  it("should continue timer on mouseout", async () => {
    // hover mouse over container
    fireEvent.mouseOver(wrapper, {
      duration: 4000,
      repeat: 1,
    });
    // remove mouse
    fireEvent.mouseOut(wrapper, {
      duration: 1500,
      repeat: 1,
    });
    expect(setTimeout).toHaveBeenCalledTimes(2);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 5000);
    expect(container.classList.contains("animation-paused")).toBe(false);
  });

  it("should reset remain time after pause and slide change", () => {
    // setTimeout ran first time on init
    // setTimeout runs second time on click
    sliderBtnNext.click();
    // slide 2
    // hover mouse over container
    fireEvent.mouseOver(wrapper, {
      duration: 4000,
      repeat: 1,
    });
    // setTimeout runs third time on click
    sliderBtnPrev.click();
    // slide 1
    // remove mouse
    fireEvent.mouseOut(wrapper, {
      duration: 500,
      repeat: 1,
    });
    // mouseout is ignored if remainTime === null (timer was resetted)
    expect(setTimeout).toHaveBeenCalledTimes(3);
    expect(slider.activeSlideNum).toBe(0);
  });
});
