#!/usr/bin/env bash
set -euo pipefail

repo_root="$(cd "$(dirname "$0")/.." && pwd)"
source_dir="$repo_root/course-pack/student-pack"
build_dir="$repo_root/.pages-build"

rm -rf "$build_dir"
mkdir -p "$build_dir"

rsync -a "$source_dir/" "$build_dir/"
cp "$repo_root/_config.yml" "$build_dir/_config.yml"

find "$build_dir" -type f -name '*.md' -exec perl -0pi -e 's/\A(?!---\n)/---\nlayout: default\n---\n\n/' {} +
