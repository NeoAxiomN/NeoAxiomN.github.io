#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

if [[ "$(uname -s)" == "Darwin" ]]; then
  if [[ -d "/opt/homebrew/opt/ruby/bin" ]]; then
    export PATH="/opt/homebrew/opt/ruby/bin:$PATH"
  elif [[ -d "/usr/local/opt/ruby/bin" ]]; then
    export PATH="/usr/local/opt/ruby/bin:$PATH"
  fi
fi

cd "$ROOT_DIR"

bundle config set --local path "vendor/bundle"
bundle install
export RUBYOPT="-r$ROOT_DIR/scripts/ruby_compat.rb${RUBYOPT:+ $RUBYOPT}"

if [[ $# -eq 0 ]]; then
  exec bundle exec jekyll serve -l -H localhost
else
  exec bundle exec jekyll "$@"
fi
