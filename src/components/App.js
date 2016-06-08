import { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
// import Aside from './Aside';

export default class App extends Component {
  render() {
    return (
      <div>
        <Header />
        {/* <Aside {...this.props} /> */}
        <main>
          {this.props.children}
        </main>

        <Footer />
      </div>
    );
  }
}
