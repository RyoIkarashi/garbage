#!/usr/local/bin/zsh

set -e

PLUGINS=(
  acf-to-rest-api
  acf-content-analysis-for-yoast-seo
  advanced-custom-fields-oembed-field
  attachment-importer
  display-widgets
  jetpack
  post-thumbnail-editor
  pubsubhubbub
  search-everything
  simple-page-ordering
  rest-api
  wordpress-seo
  jetpack-markdown
)

: "Vagrant up" && {
  vagrant up
}

: "Run a container" && {
  vagrant ssh -c "wocker run --name ${2}";
}

: "Start a specified container" && {
  if [[ ($1 = "--name") && ($2) ]]
    then vagrant ssh -c "wocker start ${2}";
  else
    echo "Specify a container with --name option";
    exit 1;
  fi
}

: "Installing plugins" && {
  vagrant ssh -c "wocker wp plugin install ${PLUGINS[*]}"
}

: "Activating all plugins" && {
  vagrant ssh -c "wocker wp plugin activate --all"
}

: "Rewriting structure" && {
  vagrant ssh -c "wocker wp rewrite structure '/%postname%/'"
}
