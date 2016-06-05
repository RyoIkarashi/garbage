<!DOCTYPE html>
<html lang="en">
<!--



     ___           ___           ___           ___           ___           ___           ___
    /  /\         /  /\         /  /\         /  /\         /  /\         /  /\         /  /\
   /  /:/_       /  /::\       /  /::\       /  /::\       /  /::\       /  /:/_       /  /:/_
  /  /:/ /\     /  /:/\:\     /  /:/\:\     /  /:/\:\     /  /:/\:\     /  /:/ /\     /  /:/ /\
 /  /:/_/::\   /  /:/~/::\   /  /:/~/:/    /  /:/~/::\   /  /:/~/::\   /  /:/_/::\   /  /:/ /:/_
/__/:/__\/\:\ /__/:/ /:/\:\ /__/:/ /:/___ /__/:/ /:/\:| /__/:/ /:/\:\ /__/:/__\/\:\ /__/:/ /:/ /\
\  \:\ /~~/:/ \  \:\/:/__\/ \  \:\/:::::/ \  \:\/:/~/:/ \  \:\/:/__\/ \  \:\ /~~/:/ \  \:\/:/ /:/
 \  \:\  /:/   \  \::/       \  \::/~~~~   \  \::/ /:/   \  \::/       \  \:\  /:/   \  \::/ /:/
  \  \:\/:/     \  \:\        \  \:\        \  \:\/:/     \  \:\        \  \:\/:/     \  \:\/:/
   \  \::/       \  \:\        \  \:\        \  \::/       \  \:\        \  \::/       \  \::/
    \__\/         \__\/         \__\/         \__\/         \__\/         \__\/         \__\/




-------------------------------------------------------------------------------------
| Author      | Ryo Ikarashi                                                        |
| Twitter     | https://twitter.com/ryo_ikarashi                                    |
| Github      | https://github.com/RyoIkarashi                                      |
| Description | A real garbage collection "in my life" built with React and Redux   |
-------------------------------------------------------------------------------------
-->
<head prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# article: http://ogp.me/ns/article#">
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="This website is just filled with lots of bright memories in my life even if they seem to be trivial and worthless to you :)">

  <meta property="og:title" content="Garbage -A real garbage collection in my life-" />
  <meta property="og:type" content="article" />
  <meta property="og:url" content="http://garbage.ryoikarashi.com" />
  <meta property="og:image" content="http://garbage.ryoikarashi.com/assets/og-image.png" />
  <meta property="og:site_name" content="Garbage" />
  <meta property="og:description" content="This website is just filled with lots of bright memories in my life even if they seem to be trivial and worthless to you :)" />

  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Garbage -A real garbage collection-">
  <meta name="twitter:creator" content="@ryo_ikarashi">
  <meta name="twitter:description" content="This website is just filled with lots of bright memories in my life even if they seem to be trivial and worthless to you :)">
  <meta name="twitter:url" content="http://garbage.ryoikarashi.com">
  <meta name="twitter:image" content="http://garbage.ryoikarashi.com/assets/og-image.png">
  <meta property="fb:app_id" content="1586852461591160" />
  <meta property="fb:admins" content="100002542111748">
  <meta property="article:publisher" content="https://www.facebook.com/ryo.ikarashi.5" />


  <!-- Favicon -->
  <link rel="shortcut icon" href=""/>
  <!-- Normalize CSS -->
  <link rel="stylesheet" href="http://cdnjs.cloudflare.com/ajax/libs/normalize/3.0.1/normalize.min.css">
  <!-- Twitter Bootstrap -->
  <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css">
  <!-- Fontawesome -->
  <link href="http://maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet">
  <!-- Styles.css -->
  <link href="/assets/styles.css" rel="stylesheet">

</head>

<body class="container-fluid container">

  <div id="root"></div>

  <!-- Google Analytics -->
  <script>
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

    ga('create', 'UA-54659896-7', 'auto');
    ga('send', 'pageview');
  </script>

  <script>
    window.fbAsyncInit = function() {
      FB.init({
        appId      : '1586852461591160',
        xfbml      : true,
        version    : 'v2.3'
      });
    };

    (function(d, s, id){
       var js, fjs = d.getElementsByTagName(s)[0];
       if (d.getElementById(id)) {return;}
       js = d.createElement(s); js.id = id;
       js.src = "//connect.facebook.net/en_US/sdk.js";
       fjs.parentNode.insertBefore(js, fjs);
     }(document, 'script', 'facebook-jssdk'));
  </script>

  <!-- Main Script -->
  <script type="text/javascript" src="/assets/bundle.js"></script>

</body>

</html>
