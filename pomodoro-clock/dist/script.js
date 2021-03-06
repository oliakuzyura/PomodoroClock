var interval;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sessionLength: 25,
      breakLength: 5,
      timer: 1500,
      started: false,
      timerLabel: 'Session' };

    this.handleStart = this.handleStart.bind(this);
    this.curTime = this.curTime.bind(this);
    this.reset = this.reset.bind(this);
    this.handleBreakIncrement = this.handleBreakIncrement.bind(this);
    this.handleBreakDecrement = this.handleBreakDecrement.bind(this);
    this.handleSessionIncrement = this.handleSessionIncrement.bind(this);
    this.handleSessionDecrement = this.handleSessionDecrement.bind(this);
    this.play = this.play.bind(this);
    this.decrementTimer = this.decrementTimer.bind(this);
    this.control = this.control.bind(this);

  }

  decrementTimer() {
    this.setState({
      timer: this.state.timer - 1 });

  }
  control() {
    if (this.state.timer <= 0) {
      this.play();
      setTimeout(() => {
        if (this.state.timerLabel == 'Session') {
          clearInterval(interval);
          this.setState({
            started: false });

          this.handleStart();
          this.setState({
            timerLabel: 'Break',
            timer: this.state.breakLength * 60 });

        } else
        {
          clearInterval(interval);
          this.setState({
            started: false });

          this.handleStart();
          this.setState({
            timerLabel: 'Session',
            timer: this.state.sessionLength * 60 });

        }
      }, 1000);


    }
  }
  handleStart() {

    if (!this.state.started) {
      interval = setInterval(() => {

        this.decrementTimer();
        this.control();

      }, 1000);

      this.setState({
        started: true });



    } else {
      clearInterval(interval);
      this.setState({
        started: false });

    }


  }

  curTime() {
    let minutes = Math.floor(this.state.timer / 60);
    let seconds = this.state.timer - minutes * 60;
    let regex = /^[0-9]$/;
    if (regex.test(minutes)) {
      minutes = '0' + minutes;
    }
    if (regex.test(seconds)) {
      seconds = '0' + seconds;
    }
    return minutes + ':' + seconds;
  }

  reset() {
    clearInterval(interval);
    let audio = document.getElementById('beep');
    audio.pause();
    audio.currentTime = 0;

    this.setState(
    {
      timer: 1500,
      started: false,
      sessionLength: 25,
      timerLabel: 'Session',
      breakLength: 5 });


  }

  handleBreakIncrement() {
    if (this.state.breakLength < 60)
    {
      if (this.state.timerLabel == 'Break') {

        this.setState({
          breakLength: this.state.breakLength + 1,
          timer: this.state.breakLength * 60 + 60 });


      } else {
        this.setState({
          breakLength: this.state.breakLength + 1 });

      }
    }
  }

  handleBreakDecrement() {
    if (this.state.timerLabel == 'Break') {
      if (this.state.breakLength > 1) {
        this.setState({
          breakLength: this.state.breakLength - 1,
          timer: this.state.breakLength * 60 - 60 });

      }
    } else {
      if (this.state.breakLength > 1) {
        this.setState({
          breakLength: this.state.breakLength - 1 });


      }
    }
  }

  handleSessionIncrement() {
    if (this.state.timerLabel == 'Session') {
      if (this.state.sessionLength < 60) {
        this.setState({
          sessionLength: this.state.sessionLength + 1,
          timer: this.state.sessionLength * 60 + 60 });

      }
    } else {
      if (this.state.sessionLength < 60) {
        this.setState({
          sessionLength: this.state.sessionLength + 1 });


      }
    }
  }

  handleSessionDecrement() {
    if (this.state.sessionLength > 1) {
      if (this.state.timerLabel == 'Session') {

        this.setState({

          sessionLength: this.state.sessionLength - 1,
          timer: this.state.sessionLength * 60 - 60 });

      } else {
        this.setState({

          sessionLength: this.state.sessionLength - 1 });

      }
    }

  }

  play() {

    let audio = document.getElementById('beep');
    audio.play();
  }

  render() {

    return (
      React.createElement("div", { class: "timer" },
      React.createElement("h1", null, "Pomodoro Clock"),
      React.createElement("div", { class: "timerChanger" },

      React.createElement("div", { id: "break-label" },
      React.createElement("h2", null, "Break Length"),
      React.createElement("div", { class: "up-down" },
      React.createElement("button", { id: "break-increment", onClick: this.state.started ? true : this.handleBreakIncrement },
      React.createElement("i", { class: "fas fa-arrow-up fa-2x" })),

      React.createElement("div", { id: "break-length" }, " ", this.state.breakLength),
      React.createElement("button", { id: "break-decrement", onClick: this.state.started ? true : this.handleBreakDecrement },
      React.createElement("i", { class: "fas fa-arrow-down fa-2x" })))),



      React.createElement("div", { id: "session-label" },
      React.createElement("h2", null, "Session Length"),
      React.createElement("div", { class: "up-down" },
      React.createElement("button", { id: "session-increment", onClick: this.state.started ? true : this.handleSessionIncrement },
      React.createElement("i", { class: "fas fa-arrow-up fa-2x" })),

      React.createElement("div", { id: "session-length" },
      this.state.sessionLength),

      React.createElement("button", { id: "session-decrement", onClick: this.state.started ? true : this.handleSessionDecrement },
      React.createElement("i", { class: "fas fa-arrow-down fa-2x" }))), " ")),



      React.createElement("div", { class: "wrapper" },
      React.createElement("div", { id: "timer-label" }, this.state.timerLabel),
      React.createElement("audio", { id: "beep", src: "https://actions.google.com/sounds/v1/cartoon/cartoon_cowbell.ogg" }),
      React.createElement("div", { id: "time-left" }, this.curTime())),

      React.createElement("div", { id: "buttons" },
      React.createElement("button", { id: "start_stop", onClick: this.handleStart }, React.createElement("i", { class: "fas fa-play fa-2x" }), React.createElement("i", { class: "fas fa-pause fa-2x" })),
      React.createElement("button", { id: "reset", onClick: this.reset }, React.createElement("i", { class: "fas fa-redo fa-2x" })))));



  }}


ReactDOM.render(React.createElement(App, null), document.getElementById('app'));