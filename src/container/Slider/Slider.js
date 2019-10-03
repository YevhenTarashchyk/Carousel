import React, { Component } from "react";
// import anime from "animejs";

import initialState from "../../store/data";
import "./Slider.css";
import { LeftArrow, RightArrow } from "../../components/Arrows/Arrows";

import Slide from "../../components/Slide/Slide";

const slides = [].concat(initialState.slides);
export default class Slider extends Component {
  state = {
    ...initialState,
    slides
  };

  anotherSlide = e => {
    if (e.currentTarget.dataset.direction === "next") {
      this.setState(prevState => ({
        currentIndex: prevState.currentIndex + 1
      }));
    } else {
      this.setState(prevState => ({
        currentIndex: prevState.currentIndex - 1
      }));
    }
  };
  // slideWidth = () => {
  //   return this.container.clientWidth;
  // };

  // calculatePrev = (current, length) => {
  //   if (current - 1 >= 0 && current < length) {
  //     return current - 1;
  //   }
  //   if (current - 1 === -1) {
  //     return length - 1;
  //   }
  // };

  // goToPrevSlide = () => {
  //   if (
  //     this.state.currentIndex - 1 >= 0 &&
  //     this.state.currentIndex < this.state.slides.length
  //   ) {
  //     // console.log(this.state.currentIndex);
  //     this.setState(prevState => ({
  //       currentIndex: prevState.currentIndex - 1,
  //       translateValue: prevState.translateValue + this.slideWidth()
  //     }));
  //   } else if (this.state.currentIndex - 1 === -1) {
  //     // console.log(this.state.currentIndex);
  //     this.setState(prevState => ({
  //       currentIndex: this.state.slides.length - 1,
  //       translateValue:
  //         prevState.translateValue -
  //         this.slideWidth() * (this.state.slides.length - 1)
  //     }));
  //   }
  // };

  // goToNextSlide = () => {
  //   if (this.state.currentIndex === this.state.slides.length - 1) {
  //     return this.setState({
  //       currentIndex: 0,
  //       translateValue: 0
  //     });
  //   }

  //   this.setState(prevState => ({
  //     currentIndex: prevState.currentIndex + 1,
  //     translateValue: prevState.translateValue + -this.slideWidth()
  //   }));
  // };

  // prev = () => {
  //   const { duration } = this.props;
  //   const { currentSlide, isAnimated, slides } = this.state;

  //   if (!isAnimated) {
  //     anime({
  //       targets: this.container,
  //       scrollLeft: this.container.scrollLeft - window.innerWidth,
  //       duration: duration || 600,
  //       easing: "easeInOutQuad",
  //       begin: () => {
  //         this.setState({
  //           isAnimated: true
  //         });
  //       },
  //       complete: () => {
  //         this.setState({
  //           currentSlide: this.calculatePrev(currentSlide, slides.length),
  //           isAnimated: false
  //         });
  //       }
  //     });
  //   }
  // };

  // next = () => {
  //   const { duration } = this.props;
  //   const { isAnimated, slides } = this.state;

  //   if (!isAnimated) {
  //     anime({
  //       targets: this.container,
  //       scrollLeft: this.container.scrollLeft + window.innerWidth,
  //       duration: duration || 600,
  //       easing: "easeInOutQuad",
  //       begin: () => {
  //         this.setState({
  //           isAnimated: true
  //         });
  //       },
  //       complete: () => {
  //         this.setState(prevState => ({
  //           currentSlide: (prevState.currentSlide + 1) % slides.length,
  //           isAnimated: false
  //         }));
  //       }
  //     });
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
    return (
      <div className="slider">
        <div
          className="slider-wrapper"
          // ref={node => (this.container = node)}
        >
          {this.state.currentIndex}
          {this.state.slides.map((slide, index) => {
            return <Slide key={index} image={slide.image} />;
          })}
        </div>

        <LeftArrow goToPrevSlide={this.anotherSlide} />
        <RightArrow goToNextSlide={this.anotherSlide} />
      </div>
    );
  }
}
