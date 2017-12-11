import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import jQuery from 'jquery';
import weather1 from 'primereact/layout/images/dashboard/weather-icon-1.svg'
import weather2 from 'primereact/layout/images/dashboard/weather-icon-2.svg'
import weather3 from 'primereact/layout/images/dashboard/weather-icon-3.svg'
import weather4 from 'primereact/layout/images/dashboard/weather-icon-4.svg'

export class AppRightPanel extends Component {

  static defaultProps = {
    onContentClick: null,
    expanded: false
  }

  static propTypes = {
    onContentClick: PropTypes.func.isRequired,
    expanded: PropTypes.bool
  }

  componentDidMount() {
    jQuery(this.rightPanelMenuScroller).nanoScroller({flash: true});
  }

  componentWillUnmount() {
    jQuery(this.layoutMenuScroller).nanoScroller('destroy');
  }

  render() {
    let className = classNames('layout-rightpanel', {'layout-rightpanel-active': this.props.expanded});

    return <div className={className} onClick={this.props.onContentClick}>
      <div ref={(el) => this.rightPanelMenuScroller = el} className="nano">
        <div className="nano-content right-panel-scroll-content">
          <div className="layout-rightpanel-header">
            <div className="weather-day">Wednesday</div>
            <div className="weather-date">Jan 26</div>
          </div>

          <div className="layout-rightpanel-content">
            <h1>Weather</h1>
            <h2>San Francisco, USA</h2>

            <div className="weather-today">
              <span className="weather-today-value">21&#8451;</span>
              <img src={weather2} width="60" alt="weather2"/>
            </div>

            <ul className="weekly-weather">
              <li>
                Thursday
                <img src={weather1} alt="weather1"/>
                <span className="weekly-weather-value">24</span>
              </li>
              <li>
                Friday
                <img src={weather3} alt="weather3"/>
                <span className="weekly-weather-value">19</span>
              </li>
              <li>
                Saturday
                <img src={weather4} alt="weather4"/>
                <span className="weekly-weather-value">15</span>
              </li>
              <li>
                Sunday
                <img src={weather1} alt="weather1"/>
                <span className="weekly-weather-value">24</span>
              </li>
              <li>
                Monday
                <img src={weather2} alt="weather2"/>
                <span className="weekly-weather-value">21</span>
              </li>
              <li>
                Tuesday
                <img src={weather3} alt="weather3"/>
                <span className="weekly-weather-value">20</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  }
}
