import React, { Fragment } from "react";
import Countdown from "react-countdown";

const CountdownComponent = () => {
  const Completionist = () => <span>You are good to go!</span>;

  const renderer = ({ days, hours, minutes, seconds, milliseconds, completed }) => {
    if (completed) {
      // Render a completed state
      return <Completionist />;
    } else {
      // Render a countdown
      return (
        <div className="timer-box">
            <div className="timer">
              <div className="timer-p" id="demo">
              {hours < 10 ? `0${hours}`: hours}  : {minutes < 10 ? `0${minutes}`: minutes}  :   {seconds < 10 ? `0${seconds}`: seconds}  :  {String( milliseconds).slice(0,1)}
                {/* <span>
                  {days}
                  <span className="padding-l">:</span>
                  <span className="timer-cal">일</span>
                </span> */}
                {/* <span>
                  {hours < 10 ? `0${hours}`: hours} 
                  <span className="padding-l">:</span>
             
                </span>
                <span>
                {minutes < 10 ? `0${minutes}`: minutes} 
                  <span className="padding-l">:</span>
                
                </span>
                <span>
                  
                  {seconds < 10 ? `0${seconds}`: seconds} 
                
                </span>
                <span>
                  {String( milliseconds).slice(0,1)}

                 
              
                </span> */}
              </div>
            </div>
        </div>
      );
    }
  };

  var d = new Date();
  var year = d.getFullYear();
  var month = d.getMonth();
  var day = d.getDate();
  var coundown = new Date(year, month, day + 10).getTime();

  return (
    <Fragment>
      <Countdown date={coundown} renderer={renderer}  intervalDelay={0}
    precision={1}/>
    </Fragment>
  );
};

export default CountdownComponent;
