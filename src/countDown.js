import React, { Component, createRef, forwardRef } from "react";
import DatePicker, {
  CalendarContainer,
  registerLocale,
} from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import calendarBtn from "./img/calendar-icon.png";
import es from "date-fns/locale/es";
registerLocale("es", es);

let currentDate = "";
export default class CountDown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: "03/15/2022",
      datePicker: false,
      event: "Nuestro viaje a Tailandia",
      inputEvent: false,
      daysLeft: "",
      hoursLeft: "",
      minutesLeft: "",
      secondsLeft: "",
    };
    this.eventInput = createRef();
  }
  componentDidMount() {
    if (localStorage.getItem("event")) {
      this.setState({
        event: localStorage.getItem("event"),
      });
    }
    if (localStorage.getItem("date")) {
      this.setState({
        date: localStorage.getItem("date"),
      });
    }
    this.countDown();
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  addCero(time) {
    return time < 10 ? `0${time}` : time;
  }

  getDateValue = (date) => {
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    var dateStr = month + "/" + day + "/" + year;
    this.setState({ date: dateStr, datePicker: false });
    this.setLocalStorage("date", dateStr);
    if (this.eventInput.current.value !== "") {
      this.setState({ event: this.eventInput.current.value });
      this.setLocalStorage("event", this.eventInput.current.value);
    }
  };

  setLocalStorage = (key, value) => {
    localStorage.setItem(key, value);
  };

  countDown = () => {
    var totalSecs = "";
    var intervalId = setInterval(() => {
      if (!this.state.datePicker) {
        const eventDate = new Date(this.state.date);
        currentDate = new Date();
        if (eventDate > currentDate) {
          totalSecs = (eventDate - currentDate) / 1000;
          this.setState((prevState) => {
            return {
              daysLeft: Math.floor(totalSecs / 60 / 60 / 24),
              hoursLeft: Math.floor(totalSecs / 60 / 60) % 24,
              minutesLeft: Math.floor(totalSecs / 60) % 60,
              secondsLeft: Math.floor(totalSecs) % 60,
            };
          });
        } else {
          clearInterval(intervalId);
          this.setState((prevState) => {
            return {
              daysLeft: 0,
              hoursLeft: 0,
              minutesLeft: 0,
              secondsLeft: 0,
            };
          });
        }
      } else {
        clearInterval(intervalId);
      }
    }, 1000);
  };

  render() {
    const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
      <img
        src={calendarBtn}
        alt="Cambiar evento y fecha"
        className="calendarBtn"
        onClick={onClick}
        ref={ref}
      />
    ));
    const MyContainer = ({ className, children }) => {
      return (
        <div>
          <CalendarContainer className={className}>
            <div className="calendarContainer">
              <input
                type="text"
                placeholder="Cambiar titulo del evento aquí"
                ref={this.eventInput}
                className="eventInput"
                maxLength="40"
              ></input>
            </div>
            <div style={{ position: "relative" }}>{children}</div>
          </CalendarContainer>
        </div>
      );
    };
    return (
      <>
        <div className="datePicker">
          <DatePicker
            dateFormat="dd/MM/yyyy"
            selected={new Date(this.state.date)}
            onChange={this.getDateValue}
            customInput={<ExampleCustomInput />}
            calendarContainer={MyContainer}
            locale="es"
            onCalendarOpen={() => this.setState({ datePicker: true })}
            onCalendarClose={() => {
              this.setState({ datePicker: false }, () => {
                this.countDown();
              });
            }}
          />
        </div>

        <div className="countdownContainer">
          <div className="title">
            <h1 className="titleLbl">{this.state.event}</h1>
          </div>
          <div className="counterContainer">
            <div className="counter daysCount">
              <p className="bigTxt" id="days">
                {this.addCero(this.state.daysLeft)}
              </p>
              <span>días</span>
            </div>
            <div className="counter hoursCount">
              <p className="bigTxt" id="hours">
                {this.addCero(this.state.hoursLeft)}
              </p>
              <span>horas</span>
            </div>
            <div className="counter minutesCount">
              <p className="bigTxt" id="minutes">
                {this.addCero(this.state.minutesLeft)}
              </p>
              <span>minutos</span>
            </div>
            <div className="counter secondsCount">
              <p className="bigTxt" id="seconds">
                {this.addCero(this.state.secondsLeft)}
              </p>
              <span>segundos</span>
            </div>
          </div>
        </div>
      </>
    );
  }
}
