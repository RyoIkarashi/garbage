var Reflux = require('Reflux');
var Actions = require('./Actions');

var $ = require('jquery');
var _ = require('underscore');

require('date-utils');

module.exports = Reflux.createStore({

  listenables: [Actions],

// Initializing data
// getInitialState will be called right after this method.
  init() {
    this.list = {
      posts: [],
      tags: [],
      active: false,
      loading: false,
      currentTag: '',
      currentPage: 1,
      isFiltered: false,
      currentInput: '',
      currentFilteredDate: {}
    };
    this._fetchInitialData();
  },

// Methods involved in each action
  onFilterByTag(tag) {
    var self = this;

    // Assign new value to each state
    this.list.isFiltered = true;
    this.list.currentTag = tag;
    this.list.currentPage = 1;
    this.list.loading = false;

    this._backToTop();

    var data = {'filter[category_name]': 'garbage', 'filter[tag]': tag};
    $.getJSON('/?json_route=/posts', data).done(function(result){
      self.newPosts(result);
      self.updateList();
    });
  },

  onFilterByDate(date) {

    var self = this;

    var year = date.substr(0, 4);
    var month = date.substr(5, 2);
    var day = date.substr(8, 2);

    // Assign new value to each state
    this.list.isFiltered = true;
    this.list.currentTag = '';
    this.list.currentPage = 1;
    this.list.loading = false;
    this.list.currentInput = '';
    this.list.currentFilteredDate = {
      'filter[date_query][year]': year,
      'filter[date_query][month]': month,
      'filter[date_query][day]': day
    };

    this._backToTop();

    var data = {
      'filter[category_name]': 'garbage',
      'filter[posts_per_page]': 10,
      'filter[date_query][year]': year,
      'filter[date_query][month]': month,
      'filter[date_query][day]': day
    };

    $.getJSON('/?json_route=/posts', data).done(function(result){
      self.list.loading = !result.length;
      self.newPosts(result);
      self.updateList();
    });
  },

  onShowAll() {
    var self = this;

    // Assign new value to each state
    this.list.isFiltered = false;
    this.list.currentTag = '';
    this.list.currentPage = 1;
    this.list.loading = false;
    this.list.currentInput = '';
    this.list.currentFilteredDate = {};

    this._backToTop();

    var data = {'filter[category_name]': 'garbage'};
    $.getJSON('/?json_route=/posts', data).done(function(result) {
      self.newPosts(result);
      self.updateList();
    });
  },

  onShowMorePosts() {

    var self = this;

    // Assign new value to each state
    this.list.currentPage++;
    this.list.loading = true;

    var data = {
      'filter[category_name]': 'garbage',
      'filter[posts_per_page]': 10,
      'page': this.list.currentPage
    };
    if(this.list.isFiltered) { $.extend(data, {'filter[tag]': this.list.currentTag}); }
    if(this.list.currentInput != '') { $.extend(data, {'filter[s]': this.list.currentInput}); }
    if(Object.keys(this.list.currentFilteredDate).length) { $.extend(data, this.list.currentFilteredDate); }

    return $.getJSON('/?json_route=/posts', data).done(function(result) {
      self.list.loading = !result.length;
      self.list.posts = self.list.posts.concat(result);
      self.newPosts(self.list.posts);
      self.updateList();
    });
  },

  onSearchPosts(input) {
    var self = this;

    // Assign new value to each state
    this.list.isFiltered = false;
    this.list.currentTag = '';
    this.list.currentPage = 1;
    this.list.loading = false;
    this.list.currentFilteredDate = {};

    this.list.currentInput = input;

    this._backToTop();

    var data = {
      'filter[category_name]': 'garbage',
      'filter[posts_per_page]': 10,
      'filter[s]': input
    };
    $.getJSON('/?json_route=/posts', data).done(function(result) {
      self.list.loading = !result.length;
      self.newPosts(result);
      self.updateList();
    });
  },

  onSwitchActive() {
    this.list.active = this.list.active ? false : true;
    this.updateList();
    this.list.active ? $('body').addClass('nav-open') : $('body').removeClass('nav-open');
  },

// Utilities
  _fetchInitialData() {
    var self = this;
    var data = {'filter[category_name]': 'garbage'};
    var getInitialPosts = $.getJSON('/?json_route=/posts', data).done(function(result) {
      self.newPosts(result);
      self.newTags(self._getTags(result));
    });
    var getAllTags = this._getAllTags();
    $.when(getInitialPosts, getAllTags).done(function(){
      self.updateList();
    });
  },

  _getAllTags() {
    var self = this;
    var data = {
      'filter[category_name]': 'garbage',
      'filter[posts_per_page]': -1
    };
    $.getJSON('/?json_route=/posts', data).done(function(result) {
      self.newTags(self._getTags(result));
    });
  },

  _getTags(posts) {
    var tags = [];
    _.some(posts, function(obj, i) {
      var tagsOfEachPost = [];
      tagsOfEachPost = obj.terms.post_tag;
      if(tagsOfEachPost != undefined) {
        tagsOfEachPost.forEach(function(value) {
          tags.push(value.name);
        });
      }
    });
    tags = $.unique(tags).sort();
    return tags;
  },

  _backToTop() {
    $("html,body").animate({scrollTop:0},"slow");
  },


// Assign new value into the each state
  newPosts(posts) {
    this.list.posts = posts;
  },

  newTags(tags) {
    this.list.tags = tags;
  },

// Update list
  updateList() {
    this.trigger(this.list);
  },

  // Define initial state
  // This method will be called right after init() gets called
  getInitialState() {
    return this.list;
  }

});
