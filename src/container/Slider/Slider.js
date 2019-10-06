import React, { Component } from "react";
import makeCarousel from "react-reveal/makeCarousel";
import Slide from "react-reveal/Slide";

import initialState from "../../store/data";
import "./Slider.css";
// import { LeftArrow, RightArrow } from "../../components/Arrows/Arrows";

const CarouselUI = ({ children }) => (
  <div className="slider-wrapper">{children}</div>
);
const Carousel = makeCarousel(CarouselUI);

const slides = [].concat(initialState.slides);
export default class Slider extends Component {
  state = {
    ...initialState,
    slides
  };

  // anotherSlide = e => {
  //   if (e.currentTarget.dataset.direction === "next") {
  //     this.setState(prevState => ({
  //       currentIndex: prevState.currentIndex + 1
  //     }));
  //   } else {
  //     this.setState(prevState => ({
  //       currentIndex: prevState.currentIndex - 1
  //     }));
  //   }
  // };

  // onMouseEnter = () => {
  //   this.progressBarAnimation.restart();
  //   this.progressBarAnimation.pause();
  //   clearInterval(this.state.interval);
  // };

  // animateProgressBar = () => {
  //   this.progressBarAnimation = anime({
  //     targets: this.progressBar,
  //     width: window.innerWidth,
  //     easing: "linear",
  //     duration: this.props.interval || 5000
  //   });
  // };

  // onMouseLeave = () => {
  //   this.progressBarAnimation.play();
  //   this.setState({
  //     interval: setInterval(() => {
  //       this.progressBarAnimation.restart();
  //       this.next();
  //       this.progressBarAnimation.play();
  //     }, this.props.interval || 5000)
  //   });
  // };

  render() {
    const { slides } = this.state;
    console.log(this.props);
    return (
      <Carousel defaultWait={1000}>
        {slides.map((item, index) => (
          <Slide key={index} right>
            <div className="slide-container">
              <div
                className="slide"
                style={{
                  background: `url(${item.image}) 50% 30%/cover no-repeat`
                }}
              >
                <div className="inner">
                  <h1>{item.title}</h1>
                  <p>{item.description}</p>
                </div>
              </div>
            </div>
          </Slide>
        ))}
      </Carousel>
      // <div className="slider">
      //   <div
      //     className="slider-wrapper"
      //     // ref={node => (this.container = node)}
      //   >
      //     {this.state.currentIndex}
      //     {this.state.slides.map((slide, index) => {
      //       return <Slide key={index} image={slide.image} />;
      //     })}
      //   </div>

      //   <LeftArrow goToPrevSlide={this.anotherSlide} />
      //   <RightArrow goToNextSlide={this.anotherSlide} />
      // </div>
    );
  }
}
