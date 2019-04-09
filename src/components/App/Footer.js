import React, {Component} from 'react';

class Footer extends Component {
    componentDidMount() {

    }

    render() {
        return (
            <footer className="app-footer">
                <span>SIOC-App &copy; 2018 SIOC</span>
                <span className="ml-auto">Powered by <a href="/back">Idees</a></span>
            </footer>
        );
    }
}

export default Footer;
