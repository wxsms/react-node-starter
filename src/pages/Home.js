import React, {PureComponent} from 'react';

export default class Home extends PureComponent {
  constructor (props) {
    super(props);
    this.state = {
      user: window._user
    };
  }

  render () {
    return (
      <div className={'container'}>
        <div className={'row'}>
          <div className={'col-xs-12'}>
            <p>home</p>
          </div>
        </div>
      </div>
    );
  }
}