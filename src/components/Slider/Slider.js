import React, { Component } from "react";
import anime from "animejs";

import initialState from "../../store/data";
import "./Slider.scss";

const slides = [].concat(initialState.slides);
export default class Slider extends Component {
  state = {
    ...initialState,
    slides
  };
  componentDidMount() {
    this.container.querySelector("img").addEventListener("load", e => {
      this.container.style.height = e.target.clientHeight + "px";
      this.container.scrollLeft = this.currentSlide.offsetLeft;
    });
    this.container.style.width = window.clientWidth * 3 + "px";
    this.animateProgressBar();
    this.onMouseLeave();
  }

  componentDidUpdate(nextState) {
    if (nextState.currentSlide !== this.state.currentSlide) {
      this.container.scrollLeft = this.currentSlide.offsetLeft;
    }
  }

  calculatePrev = (current, length) => {
    if (current - 1 >= 0 && current < length) {
      return current - 1;
    }
    if (current - 1 === -1) {
      return length - 1;
    }
  };

  prev = () => {
    const { duration } = this.props;
    const { currentSlide, isAnimated, slides } = this.state;

    if (!isAnimated) {
      anime({
        targets: this.container,
        scrollLeft: this.container.scrollLeft - window.innerWidth,
        duration: duration || 600,
        easing: "easeInOutQuad",
        begin: () => {
          this.setState({
            isAnimated: true
          });
        },
        complete: () => {
          this.setState({
            currentSlide: this.calculatePrev(currentSlide, slides.length),
            isAnimated: false
          });
        }
      });
    }
  };

  next = () => {
    const { duration } = this.props;
    const { isAnimated, slides } = this.state;

    if (!isAnimated) {
      anime({
        targets: this.container,
        scrollLeft: this.container.scrollLeft + window.innerWidth,
        duration: duration || 600,
        easing: "easeInOutQuad",
        begin: () => {
          this.setState({
            isAnimated: true
          });
        },
        complete: () => {
          this.setState(prevState => ({
            currentSlide: (prevState.currentSlide + 1) % slides.length,
            isAnimated: false
          }));
        }
      });
    }
  };
  onMouseEnter = () => {
    this.progressBarAnimation.restart();
    this.progressBarAnimation.pause();
    clearInterval(this.state.interval);
  };

  animateProgressBar = () => {
    this.progressBarAnimation = anime({
      targets: this.progressBar,
      width: window.innerWidth,
      easing: "linear",
      duration: this.props.interval || 5000
    });
  };

  onMouseLeave = () => {
    this.progressBarAnimation.play();
    this.setState({
      interval: setInterval(() => {
        this.progressBarAnimation.restart();
        this.next();
        this.progressBarAnimation.play();
      }, this.props.interval || 5000)
    });
  };

  render() {
    const { slides, currentSlide } = this.state;

    return (
      <div
        className="Slider"
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
      >
        <div
          className="slides__container"
          ref={node => (this.container = node)}
        >
          <div className="Slide" ref={node => (this.prevSlide = node)}>
            <img
              alt=""
              src={
                slides[this.calculatePrev(currentSlide, slides.length)].image
              }
            />
          </div>
          <div className="Slide" ref={node => (this.currentSlide = node)}>
            <img src={slides[currentSlide].image} alt="" />
          </div>
          <div className="Slide" ref={node => (this.nextSlide = node)}>
            <img
              src={slides[(currentSlide + 1) % slides.length].image}
              alt=""
            />
          </div>
        </div>
        <div className="progress-bar" ref={node => (this.progressBar = node)} />
        <div className="controls">
          <button onClick={this.prev}>prev</button>
          <button onClick={this.next}>next</button>
        </div>
      </div>
    );
  }
}
