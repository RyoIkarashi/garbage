var React = require('react/addons');

var Actions = require('./Actions');

var $ = require('jquery');

module.exports = React.createClass({

  _onClick(e) {
    e.preventDefault();
    Actions.switchActive();
  },

  autoHideStickyHeader() {
    var elSelector		= '.header',
        elClassHidden	= 'header--hidden',
        throttleTimeout	= 250,
        $element		= $( elSelector );

    if( !$element.length ) return true;

    var $window			= $( window ),
      wHeight			= 0,
      wScrollCurrent	= 0,
      wScrollBefore	= 0,
      wScrollDiff		= 0,
      $document		= $( document ),
      dHeight			= 0,

    throttle = function( delay, fn )
    {
      var last, deferTimer;
      return function()
      {
        var context = this, args = arguments, now = +new Date;
        if( last && now < last + delay )
        {
          clearTimeout( deferTimer );
          deferTimer = setTimeout( function(){ last = now; fn.apply( context, args ); }, delay );
        }
        else
        {
          last = now;
          fn.apply( context, args );
        }
      };
    };

    $window.on( 'scroll', throttle( throttleTimeout, function()
    {
      dHeight			= $document.height();
      wHeight			= $window.height();
      wScrollCurrent	= $window.scrollTop();
      wScrollDiff		= wScrollBefore - wScrollCurrent;

      if( wScrollCurrent <= 0 ) { // scrolled to the very top; element sticks to the top
        $element.removeClass( elClassHidden );
        $('aside').removeClass('aside--header-hidden');
      }
      else if( wScrollDiff > 0 && $element.hasClass( elClassHidden ) ) { // scrolled up; element slides in
        $element.removeClass( elClassHidden );
        $('aside').removeClass('aside--header-hidden');
      }
      else if( wScrollDiff < 0 ) // scrolled down
      {
        if( wScrollCurrent + wHeight >= dHeight && $element.hasClass( elClassHidden ) ) { // scrolled to the very bottom; element slides in
          $element.removeClass( elClassHidden );
          $('aside').removeClass('aside--header-hidden');
        }
        else { // scrolled down; element slides out
          $element.addClass( elClassHidden );
          $('aside').addClass('aside--header-hidden');
        }
      }

      wScrollBefore = wScrollCurrent;
    }));
  },

  componentDidMount() {
    $('#menu-toggle', this.getDOMNode()).on('click', this._onClick);
    this.autoHideStickyHeader();
  },

  render() {
    return (
      <header className="header clearfix" role="banner">
        <div className="header__inner">
          <a id="menu-toggle" href="">
            <span className="menu-toggle-line"></span>
            <span className="menu-toggle-line"></span>
            <span className="menu-toggle-line"></span>
          </a>
          <div href="" className="header__back-to-top hidden">△</div>
        </div>
      </header>
    );
  }
});
