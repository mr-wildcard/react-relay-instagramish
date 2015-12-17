import React from 'react';
import CSSModules from 'react-css-modules';
import styles from 'styles/App.css';

class AppComponent extends React.Component {

    render() {
        return (
            <div styleName="root">
                {this.props.children}
            </div>
        );
    }
}

AppComponent.defaultProps = {};

export default CSSModules(AppComponent, styles);
