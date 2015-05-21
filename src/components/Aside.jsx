var React = require('react/addons');
var cx = React.addons.classSet;
var Reflux = require('reflux');

var Actions = require('./Actions');

var $ = require('jquery');
var _ = require('underscore');

var Tags = [];

module.exports = React.createClass({

  getPostsFilteredByTag(e) {
    e.preventDefault();
    this.addCurrentTagClass(e);
    Actions.filterByTag($(e.target).text());
    Actions.switchActive();
  },

  getAllPosts(e) {
    e.preventDefault();
    Actions.showAll();
    Actions.switchActive();
  },

  _onKeyUp(e) {
    var isEntered = e.which === 13;
    var isEmpty = $(e.target).val().length === 0;
    isEntered && !isEmpty ? this.searchPosts() : '';
    isEntered && isEmpty ? (Actions.showAll(),Actions.switchActive()) : '';
  },

  searchPosts(e) {
    var input = $('.search__input', this.getDOMNode()).val();
    if(input === '') { return; }
    Actions.searchPosts(input);
    Actions.switchActive();
  },

  addCurrentTagClass(e) {
    $('.btn__filter').removeClass('current');
    $(e.target).addClass('current');
  },

  componentDidMount() {
    $('.filter-item').on('click', this._onClick);
  },

  render() {

    var self = this;
    var isFiltered = this.props.isFiltered;

    var tags = this.props.tags.map(function(tag) {
      return (
        <li key={tag} className="filter-item mg-btm-xs">
          <button onClick={self.getPostsFilteredByTag} className="filter-item__btn btn__filter">{tag}</button>
        </li>
      );
    });

    return(
        <aside className="aside clearfix">
          <nav className="filter-nav">
            <div className="filter-nav__search">
              <input onKeyUp={this._onKeyUp} className="search__input" type="search" placeholder="search..." />
              <button className="search__button fa fa-search" onClick={this.searchPosts}></button>
            </div>
            <ul className="filter-nav__list clearfix" id="quotes-filter">
              <li className="filter-item mg-btm-xs">
                <button onClick={this.getAllPosts} className={cx({"current": !isFiltered, "filter-item__btn": true,  "btn__default": true})} id="org-filter-all">All</button>
              </li>
              {tags}
            </ul>
          </nav>
        </aside>
    );
  }
});
