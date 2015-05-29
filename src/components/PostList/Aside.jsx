var React = require('react/addons');
var cx = React.addons.classSet;
var Reflux = require('reflux');

var Actions = require('../Actions');

var $ = require('jquery');
var _ = require('underscore');

var Tags = [];

module.exports = React.createClass({

  getPostsFilteredByTag(e) {
    e.preventDefault();
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

  componentDidMount() {
    $('.filter-item').on('click', this._onClick);
  },

  render() {

    var self = this;
    var currentTag = this.props.list.currentTag;
    var isCurrentTag = false;
    var isFiltered = this.props.list.isFiltered;
    var isSearched = this.props.list.isSearched;

    var tags = this.props.list.tags.map(function(tag) {
      isCurrentTag = currentTag === tag ? true : false;
      return (
        <li key={tag} className="filter-item mg-btm-xs">
          <button onClick={self.getPostsFilteredByTag} disabled={isFiltered && isCurrentTag} className={cx({'current': isFiltered && isCurrentTag,'filter-item__btn': true, 'btn__filter': true})}>{tag}</button>
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
                <button onClick={this.getAllPosts} disabled={!isFiltered && !isSearched} className={cx({"current": !isFiltered && !isSearched, "filter-item__btn": true,  "btn__default": true})} id="org-filter-all">All</button>
              </li>
              {tags}
            </ul>
          </nav>
        </aside>
    );
  }
});
