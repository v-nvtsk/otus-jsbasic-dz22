import Slider from "./slider";

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
});
