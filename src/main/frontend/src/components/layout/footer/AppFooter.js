import React, {Component} from 'react';

export class AppFooter extends Component {

  render() {
    return <div className="footer">
      <div className="card clearfix">
        <span className="footer-text-left"><a style={{color: '#3F51B5'}} href="https://www.helmes.com">www.helmes.com</a></span>
        <span className="footer-text-right"><span className="ui-icon ui-icon-copyright"></span>  <span>All Rights Reserved</span></span>
      </div>
    </div>
  }
}
