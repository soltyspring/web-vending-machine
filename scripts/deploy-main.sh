#!/usr/bin/env bash
set -euo pipefail

APP_DIR="${APP_DIR:-/home/ubuntu/web-vending-machine}"
APP_USER="${APP_USER:-ubuntu}"
BRANCH="${BRANCH:-main}"
API_SERVICE="${API_SERVICE:-web-vending-api}"

run_as_app_user() {
  runuser -u "$APP_USER" -- bash -lc "$1"
}

git_cmd() {
  runuser -u "$APP_USER" -- git -C "$APP_DIR" -c safe.directory="$APP_DIR" "$@"
}

git_cmd fetch origin "$BRANCH"

current_commit="$(git_cmd rev-parse HEAD)"
remote_commit="$(git_cmd rev-parse "origin/$BRANCH")"

if [ "$current_commit" = "$remote_commit" ] && [ "${FORCE_DEPLOY:-0}" != "1" ]; then
  echo "No deploy needed. $BRANCH is already at $remote_commit."
  exit 0
fi

git_cmd checkout "$BRANCH"
git_cmd reset --hard "origin/$BRANCH"

if [ ! -d "$APP_DIR/backend/.venv" ]; then
  run_as_app_user "cd '$APP_DIR/backend' && python3 -m venv .venv"
fi

run_as_app_user "cd '$APP_DIR/backend' && .venv/bin/pip install -r requirements.txt"
run_as_app_user "cd '$APP_DIR/frontend' && npm install && npm run build"

systemctl restart "$API_SERVICE"
systemctl reload nginx

echo "Deployed $BRANCH at $remote_commit."
