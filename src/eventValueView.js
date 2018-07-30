import React, { Component } from 'react';
import './eventValueView.css';

class EventValueView extends Component {
  splitValue(eventValue, searchValue) {
    let regEx = new RegExp(searchValue,'i');
    let strArr = eventValue.split(regEx);
    for(let i=0; i<(strArr.length-1); i++) {
      if(strArr[i]==="") {
        strArr[i]=searchValue;
      }
      else {
        strArr.splice(i+1,0,searchValue);
        i++;
      }
    }
    if(strArr[strArr.length-1]==="") {
      strArr.pop();
    }
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
