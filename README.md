# [Garbage](http://garbage.ryoikarashi.com)

![garbage](https://raw.githubusercontent.com/RyoIkarashi/garbage/5fa28b398c555227287407630a690d74e1660e5e/logo.png "garbage")

Garbage is my personal website to keep track of daily memories.

Using Wordpress as a CMS and React for SPA.

# Installation

Before cloning the repo, you need to install [wocker](http://wckr.github.io/) to set up a Wordpress development environment.

(Wocker requires [Vagrant]() and [VirtualBox](), so if you haven't installed yet, just install them in advance.)

```bash
vagrant plugin install vagrant-hostsupdater
git clone https://github.com/wckr/wocker.git && cd wocker
mkdir -p dev/your-project-name && cd dev/your-project-name
vagrant up
```
Once the development environment is all set up, install npm modules and initialize Wordpress settings.

```bash
git clone https://github.com/RyoIkarashi/garbage.git
npm install
sh ./wp-initialize.sh
npm start
```

# ToDo
- [ ] pagination with scroll
- [ ] page transition animation
- [ ] add bot-theme for SEO

# Technologies
- [React](https://facebook.github.io/react/)
- [Redux](https://github.com/reactjs/redux)
	- [react-redux](https://github.com/reactjs/react-redux)
	- [redux-saga](https://github.com/yelouafi/redux-saga)
- Wordpress
	- [REST-API](http://v2.wp-api.org/)
	- [Wocker](http://wckr.github.io/)
- CSS
	- [ITCSS](https://www.xfive.co/blog/itcss-scalable-maintainable-css-architecture/)
	- [OOCSS](http://oocss.org/)
	- [SMACSS](https://smacss.com/)
	- [PostCSS](https://github.com/postcss/postcss)



