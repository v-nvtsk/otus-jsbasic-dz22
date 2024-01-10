import Slider from "./slider/slider.js";

document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector("#slider");
  const slider = new Slider(container, { interval: 2000, loop: true });

  slider.addSlide("https://img1.fonwall.ru/o/xg/utro-plyazh-kamni.jpg");
  slider.addSlide(
    "https://vsegda-pomnim.com/uploads/posts/2022-04/1651052250_74-vsegda-pomnim-com-p-atlanticheskii-okean-foto-94.jpg",
  );
});
