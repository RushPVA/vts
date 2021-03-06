import React, {Component} from 'react';
import classNames from 'classnames';
import 'nanoscroller';
import {AppTopbar} from 'components/layout/header/AppTopbar';
import {AppInlineProfile} from 'components/layout/profile/AppInlineProfile';
import {AppFooter} from 'components/layout/footer/AppFooter';
import {AppMenu} from 'components/layout/menu/AppMenu';
import {AppRightPanel} from 'components/layout/rightpanel/AppRightPanel';
import 'primereact/resources/primereact.min.css';
import 'primereact/layout/js/ripple'
import 'primereact/theme/theme-indigo.css';
import 'primereact/layout/css/layout-indigo.css';
import 'nanoscroller/bin/css/nanoscroller.css';
import 'fullcalendar/dist/fullcalendar.css';
import './App.css';
import jQuery from 'jquery';


export class App extends Component {

  constructor() {
    super();
    this.state = {
      layoutMode: 'static',
      profileMode: 'top',
      layoutCompact: true,
      overlayMenuActive: false,
      staticMenuDesktopInactive: false,
      staticMenuMobileActive: false,
      rotateMenuButton: false,
      topbarMenuActive: false,
      activeTopbarItem: null,
      darkMenu: false,
      rightPanelActive: false,
      menuActive: false
    };

    this.onDocumentClick = this.onDocumentClick.bind(this);
    this.onMenuClick = this.onMenuClick.bind(this);
    this.onMenuButtonClick = this.onMenuButtonClick.bind(this);
    this.onTopbarMenuButtonClick = this.onTopbarMenuButtonClick.bind(this);
    this.onTopbarItemClick = this.onTopbarItemClick.bind(this);
    this.onMenuItemClick = this.onMenuItemClick.bind(this);
    this.onRootMenuItemClick = this.onRootMenuItemClick.bind(this);
    this.onRightPanelButtonClick = this.onRightPanelButtonClick.bind(this);
    this.onRightPanelClick = this.onRightPanelClick.bind(this);
    this.createMenu();
  }

  onMenuClick(event) {
    this.menuClick = true;

    if (!this.isHorizontal()) {
      setTimeout(() => {
        jQuery(this.layoutMenuScroller).nanoScroller();
      }, 500);
    }
  }

  onMenuButtonClick(event) {
    this.menuClick = true;
    this.setState(({
      rotateMenuButton: !this.state.rotateMenuButton,
      topbarMenuActive: false
    }));

    if (this.state.layoutMode === 'overlay') {
      this.setState({
        overlayMenuActive: !this.state.overlayMenuActive
      });
    }
    else {
      if (this.isDesktop())
        this.setState({staticMenuDesktopInactive: !this.state.staticMenuDesktopInactive});
      else
        this.setState({staticMenuMobileActive: !this.state.staticMenuMobileActive});
    }

    event.preventDefault();
  }

  onTopbarMenuButtonClick(event) {
    this.topbarItemClick = true;
    this.setState({topbarMenuActive: !this.state.topbarMenuActive});
    this.hideOverlayMenu();
    event.preventDefault();
  }

  onTopbarItemClick(event) {
    this.topbarItemClick = true;

    if (this.state.activeTopbarItem === event.item)
      this.setState({activeTopbarItem: null});
    else
      this.setState({activeTopbarItem: event.item});

    event.originalEvent.preventDefault();
  }

  onMenuItemClick(event) {
    if (!event.item.items) {
      this.hideOverlayMenu();
    }
  }

  onRootMenuItemClick(event) {
    this.setState({
      menuActive: !this.state.menuActive
    });

    event.originalEvent.preventDefault();
  }

  onRightPanelButtonClick(event) {
    this.rightPanelClick = true;
    this.setState({
      rightPanelActive: !this.state.rightPanelActive
    });
    event.preventDefault();
  }

  onRightPanelClick(event) {
    this.rightPanelClick = true;
  }

  onDocumentClick(event) {
    if (!this.topbarItemClick) {
      this.setState({
        activeTopbarItem: null,
        topbarMenuActive: false
      });
    }

    if (!this.menuClick) {
      if (this.isHorizontal() || this.isSlim()) {
        this.setState({
          menuActive: false
        })
      }

      this.hideOverlayMenu();
    }

    if (!this.rightPanelClick) {
      this.setState({
        rightPanelActive: false
      })
    }

    this.topbarItemClick = false;
    this.menuClick = false;
    this.rightPanelClick = false;
  }

  hideOverlayMenu() {
    this.setState({
      rotateMenuButton: false,
      overlayMenuActive: false,
      staticMenuMobileActive: false
    })
  }

  componentDidMount() {
    jQuery(this.layoutMenuScroller).nanoScroller({flash: true});
  }

  isTablet() {
    let width = window.innerWidth;
    return width <= 1024 && width > 640;
  }

  isDesktop() {
    return window.innerWidth > 1024;
  }

  isMobile() {
    return window.innerWidth <= 640;
  }

  isOverlay() {
    return this.state.layoutMode === 'overlay';
  }

  isHorizontal() {
    return this.state.layoutMode === 'horizontal';
  }

  isSlim() {
    return this.state.layoutMode === 'slim';
  }

  changeTheme(theme) {
    this.changeStyleSheetUrl('layout-css', theme, 'layout');
    this.changeStyleSheetUrl('theme-css', theme, 'theme');
  }

  changeStyleSheetUrl(id, value, prefix) {
    let element = document.getElementById(id);
    let urlTokens = element.getAttribute('href').split('/');
    urlTokens[urlTokens.length - 1] = prefix + '-' + value + '.css';
    let newURL = urlTokens.join('/');
    element.setAttribute('href', newURL);
  }

  createMenu() {
    this.menu = [
      {
        label: 'Main', icon: 'home', routerLink:  "/employee"
      },
      {
        label: 'Menu Item', icon: 'restaurant', routerLink:  "/one-page"
      },
      {
        label: 'One More Menu Item', icon: 'input', routerLink:  "/one-more-page"
      }
    ];
  }

  render() {
    let layoutClassName = classNames('layout-wrapper', {'layout-compact': this.state.layoutCompact});
    let layoutContainerClassName = classNames('layout-container', {
      'menu-layout-static': this.state.layoutMode !== 'overlay',
      'menu-layout-overlay': this.state.layoutMode === 'overlay',
      'layout-menu-overlay-active': this.state.overlayMenuActive,
      'menu-layout-slim': this.state.layoutMode === 'slim',
      'menu-layout-horizontal': this.state.layoutMode === 'horizontal',
      'layout-menu-static-inactive': this.state.staticMenuDesktopInactive,
      'layout-menu-static-active': this.state.staticMenuMobileActive
    });
    let menuClassName = classNames('layout-menu', {'layout-menu-dark': this.state.darkMenu});

    return <div className={layoutClassName} onClick={this.onDocumentClick}>
      <div ref={(el) => this.layoutContainer = el} className={layoutContainerClassName}>
        <AppTopbar profileMode={this.state.profileMode} horizontal={this.props.horizontal}
                   topbarMenuActive={this.state.topbarMenuActive} activeTopbarItem={this.state.activeTopbarItem}
                   onMenuButtonClick={this.onMenuButtonClick} onTopbarMenuButtonClick={this.onTopbarMenuButtonClick}
                   onTopbarItemClick={this.onTopbarItemClick} onRightPanelButtonClick={this.onRightPanelButtonClick}/>

        <div className={menuClassName} onClick={this.onMenuClick}>
          <div ref={(el) => this.layoutMenuScroller = el} className="nano">
            <div className="nano-content menu-scroll-content">
              {(this.state.profileMode === 'inline' && this.state.layoutMode !== 'horizontal') && <AppInlineProfile/>}
              <AppMenu model={this.menu} onMenuItemClick={this.onMenuItemClick}
                       onRootMenuItemClick={this.onRootMenuItemClick}
                       layoutMode={this.state.layoutMode} active={this.state.menuActive} currentPath={this.props.location.pathname}/>
            </div>
          </div>
        </div>

        <div className="layout-main">
          {this.props.children}

          <AppFooter/>
        </div>

        <AppRightPanel expanded={this.state.rightPanelActive} onContentClick={this.onRightPanelClick}/>

        <div className="layout-mask"></div>
      </div>
    </div>;
  }
}

export default App;
