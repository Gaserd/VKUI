
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Tappable from '../Tappable/Tappable';
import PopoutWrapper from '../PopoutWrapper/PopoutWrapper';
import getClassName from '../../helpers/getClassName';
import classNames from '../../lib/classNames';

const baseClassNames = getClassName('Alert');

export default class Alert extends Component {
  static propTypes = {
    style: PropTypes.object,
    className: PropTypes.string,
    children: PropTypes.node,
    actionsLayout: PropTypes.oneOf(['vertical', 'horizontal']),
    actions: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string,
      action: PropTypes.func,
      /**
       * iOS only
       */
      style: PropTypes.oneOf(['cancel', 'destructive', 'default'])
    })),
    onClose: PropTypes.func
  };

  static defaultProps = {
    actionsLayout: 'horizontal',
    actions: []
  };

  onItemClick = item => () => {
    item.autoclose && this.props.onClose();
    item.action && item.action();
  };

  render () {
    const { actions, actionsLayout, children, className, style, ...restProps } = this.props;

    return (
      <PopoutWrapper className={className} style={style}>
        <div {...restProps} className={classNames(baseClassNames, {
          'Alert--v': actionsLayout === 'vertical',
          'Alert--h': actionsLayout === 'horizontal'
        })}>
          <div className="Alert__content">{children}</div>
          <footer className="Alert__footer">
            {actions.map((button, i) => (
              <Tappable
                component="button"
                className={classNames('Alert__btn', { [`Alert__btn--${button.style}`]: button.style })}
                onClick={this.onItemClick(button)}
                key={`alert-action-${i}`}
              >
                <span dangerouslySetInnerHTML={{ __html: button.title }} />
              </Tappable>
            ))}
          </footer>
        </div>
      </PopoutWrapper>
    );
  }
}
