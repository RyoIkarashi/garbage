var React = require('react');
var Route = require('react-router');
var Reflux = require('reflux');
var Actions = require('./Actions');

var $ = require('jquery');
var _ = require('underscore');
var MasonryMixin = require('react-masonry-mixin');
var masonryOptions = { transitionDuration: 300 };

module.exports = React.createClass({

  mixins: [MasonryMixin('masonryContainer', masonryOptions)],

  trimDate(post_date) {
    return post_date.substr(0, post_date.indexOf('T')).replace(/-/g, '.');
  },

  getPostsFilteredByTag(e) {
    e.preventDefault();
    Actions.filterByTag($(e.target).text());
  },

  getPostsFilteredByDate(e) {
    e.preventDefault();
    var date = $(e.target).text();
    Actions.filterByDate(date);
  },

  switchActive() {
    Actions.switchActive();
  },

  adjustOverlay() {
    $overlay = $('.overlay');
    $header  = $('.header');
    oh = $overlay.outerHeight();
    hh = $header.outerHeight();
    wh = $(window).height() - hh;
    if(oh < wh) { $overlay.height(wh);}
  },

  _onScroll() {

    if (!this.props.list.loading && this.props.list.posts.length > 0) {

      var win = $(window).height();
      var doc = $(document.body).outerHeight();
      var bottom = doc - win - $(window).scrollTop();
      if (bottom < 350) {
        Actions.showMorePosts();
      }
    }
  },

  componentDidMount() {
    $('.overlay', this.getDOMNode()).on('click', this.switchActive);
  },

  componentWillReceiveProps() {
    $(window).off('scroll', this._onScroll);
    $(window).on('scroll', this._onScroll);
  },

  componentWillUnmount() {
  },

  componentDidUpdate() {
  },

  render() {

    var self = this;

    var articles = this.props.list.posts.map(function(post) {
      return(
          <article key={post.guid} className="quote-item mg-top-md pd-md">
            <h2 className="quote-item__title">{post.acf.title}</h2>
            {
              post.acf.photo != '' && post.acf.photo_caption != '' || post.acf.photo_caption != '' && post.acf.photo == ''
              ? <figure className="quote-item__figure">
                  <img className="quote-item__img" src={post.acf.photo}/>
                  <figcaption className="quote-item__imgcaption"><span>{post.acf.photo_caption}</span></figcaption>
                </figure>
              : ''
            }
            {
              post.acf.memo != ''
              ? <p className="quote-item__memo">{post.acf.memo}</p>
              : ''
            }
            {
              post.acf.quote_content != '' || post.acf.quote_author != ''
              ? <blockquote className="quote-item__blockquote mg-top-sm">
                  <p className="quote-item__content"><em>{post.acf.quote_content}</em></p>
                  <footer className="quote-item__info pd-top-n-btm-sm">
                    <cite>
                      <span className="quote-item__name">{post.acf.quote_author}</span>
                    </cite>
                    {
                      post.acf.quote_link_url != '' || post.acf.quote_link_title
                      ? <p><a href={post.acf.quote_link_url} className="quote-item__link">{post.acf.quote_link_title}</a></p>
                      : ''
                    }
                  </footer>
                </blockquote>
              : ''
            }
            {
              post.acf.iframe != ''
              ? <div dangerouslySetInnerHTML={{__html: post.acf.iframe}} className="quote-item__iframe"></div>
              : ''
            }
            <time className="quote-item__date col-md-11 col-sm-11 col-xs-11"><a onClick={self.getPostsFilteredByDate} className="date-filter-btn" href="">{self.trimDate(post.date)}</a></time>
            {post.terms.post_tag.map(function(tag) {
              return(
                <button key={tag.name} onClick={self.getPostsFilteredByTag} className="quote-item__tag">{tag.name}</button>
              );
            })}
          </article>
      );
    });

    return(
        <main className="content-main pd-xs clearfix" role="main">
          <div ref="masonryContainer" className="quotes-gallery clearfix">{articles}</div>
          <div className="overlay"></div>
        </main>
    );
  }
});
