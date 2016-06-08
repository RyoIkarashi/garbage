import { Component } from 'react';
// import Header from './Header';
// import Aside from './Aside';
// import Footer from './Footer';

export default class App extends Component {
  render() {
    return (
      <div>
        {/* <Header /> */}
        {/* <Aside {...this.props} /> */}
        <main>
          {this.props.children}
        </main>
        {/* <Footer /> */}
      </div>
    );
  }
}
