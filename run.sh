#!/bin/sh
# bundle exec jekyll serve --port 8888  --livereload --incremental
# bundle exec jekyll serve --port 8888
export JEKYLL_ENV=production
bundle exec jekyll serve --host 0.0.0.0 --port=8888 
