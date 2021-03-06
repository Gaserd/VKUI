import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from '../../lib/classNames';

function calcStrokeDashOffset (value, radius) {
  const progress = value / 100;
  return 2 * Math.PI * radius * (1 - progress);
}

export default class PullToRefreshSpinner extends PureComponent {
  constructor (props) {
    super(props);

    const { size, strokeWidth } = this.props;

    const radius = 0.5 * size - 0.5 * strokeWidth;
    const dasharray = 2 * Math.PI * radius;
    const circleCenter = 0.5 * size;

    this.state = { radius, dasharray, circleCenter };
  }

  static propTypes = {
    size: PropTypes.number,
    strokeWidth: PropTypes.number,
    on: PropTypes.bool,
    progress: PropTypes.number,
    style: PropTypes.object
  };

  static defaultProps = {
    size: 24,
    strokeWidth: 2.5,
    on: true,
    progress: null
  };

  render () {
    const { on, progress, size, strokeWidth, style } = this.props;
    const { radius, dasharray, circleCenter } = this.state;

    const dashoffset = calcStrokeDashOffset(on ? 80 : progress, radius);

    return (
      <div
        className={classNames('PullToRefresh__spinner', {
          'PullToRefresh__spinner--on': on
        })}
        style={style}
      >
        <svg
          className="PullToRefresh__spinner-self"
          style={{
            width: size,
            height: size
          }}
          viewBox={`0 0 ${size} ${size}`}
          xmlns="http://www.w3.org/2000/svg"
        >
          <g
            style={{
              width: size,
              height: size,
              transformOrigin: `${circleCenter}px ${circleCenter}px`
            }}
          >
            <circle
              className="PullToRefresh__spinner-path"
              fill="none"
              strokeDasharray={dasharray}
              strokeDashoffset={dashoffset}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              cx={circleCenter}
              cy={circleCenter}
              r={radius}
            />
          </g>
        </svg>
      </div>
    );
  }
}
