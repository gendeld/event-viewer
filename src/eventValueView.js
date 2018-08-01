import React, { Component } from 'react';
import './eventValueView.css';

// Event value, highlights the search value in the event
class EventValueView extends Component {
  // Split string by search value, ("Electricity", "ect") => ["El","ect","ricity"]
  splitValue(eventValue, searchValue) {
    let regEx = new RegExp(searchValue,'i');
     // Splits the string at every point the search value appears, case insensitive
    let strArr = eventValue.split(regEx);
    /* Adds back the searchValue that was cut out,
      ends one iteration early so as not to add an extra instance of searchValue */
    for(let i=0; i<(strArr.length-1); i++) {
      /* If there is an instance of searchValue in the begining or end of the string, it will be "",
        replace it with searchValue */
      if(strArr[i]==="") {
        strArr[i]=searchValue;
      }
      else {
        // Add searchValue after item in position i
        strArr.splice(i+1,0,searchValue);
        i++;
      }
    }
    // See line 14
    if(strArr[strArr.length-1]==="") {
      strArr.pop();
    }
    // Replace letters to match original casing that might have changed to searchValue casing
    let position = 0;
    for(let j=0; j<strArr.length; j++) {
      let newPosition = position + strArr[j].length;
      strArr[j] = eventValue.slice(position,newPosition);
      position = newPosition;
    }
    return strArr;
  }

  render() {
    const { eventValue, searchValue, className } = this.props;

    return (
      <div className={className}>
        {
          this.splitValue(eventValue, searchValue).map((eventStr) => {
            return (
              <span className={(eventStr.toLocaleLowerCase()===searchValue.toLocaleLowerCase()) ? "highlight" : ""}>
                {eventStr}
              </span>
            );
          })
        }
      </div>
    );
  }
}

export default EventValueView;
