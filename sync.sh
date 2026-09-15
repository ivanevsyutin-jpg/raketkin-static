#!/bin/bash
# Зеркало скриптов raketkin.shop -> GitHub (jsDelivr fallback). Запускать после правки /var/www/cards/raketkin*.js; дневной вызов из snapshot_new_repos.sh
cd /root/raketkin-static || exit 0
cp /var/www/cards/raketkin.js /var/www/cards/raketkin-head.js .
git add -A
git diff --cached --quiet && exit 0
git -c user.name=raketkin-bot -c user.email=bot@raketkin.shop commit -qm "sync $(date -u +%F_%H:%M)" && git push -q origin main
for f in raketkin.js raketkin-head.js; do curl -s "https://purge.jsdelivr.net/gh/ivanevsyutin-jpg/raketkin-static@main/$f" >/dev/null; done
