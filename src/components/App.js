import { Component } from 'react';
import Header from '../containers/Header';
import Footer from './Footer';

export default class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <main class="main">
          {this.props.children}
        </main>
        <Footer />
      </div>
    );
  }
}
