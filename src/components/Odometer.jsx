import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default React.createClass({
  mixins: [PureRenderMixin],

  pad(n, width, z) {
    // http://stackoverflow.com/questions/10073699/pad-a-number-with-leading-zeros-in-javascript
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
  },


  getDisplayValue(value, minLength) {
    value = value ? value + '' : '???';
    const paddedValue = this.pad(value, minLength, '0');

    let displayValue = '';
    for (var i = paddedValue.length - 1; i >= 0; --i) {
      if (i % 4 === 0) {
        displayValue = ' ' + displayValue;
      } else {
        displayValue = paddedValue[i] + displayValue;
      }
    }

    return displayValue;
  },

  render() {
    console.log('ole');
    // const value = (this.props.value) ? this.props.value : '???';
    const value = this.getDisplayValue(this.props.value, this.props.minDigits);

    let elements = [];
    for (var i = 0, length = value.length; i < length; ++i) {
      if (value[i] === ' ') {
        elements.push(<span className='whitespace' key={i}></span>);
      } else {
        elements.push(<span className='digit' key={i}>{value[i]}</span>)
      }
    }

    return <div className="odometer__wrapper">
      {elements}
    </div>
  }
});