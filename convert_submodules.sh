#!/bin/bash

# First, remove any submodule references from Git's config
if [ -f ".gitmodules" ]; then
  git rm .gitmodules
fi

# Find and remove any submodule references in the Git index
git ls-files --stage | grep "^160000" | cut -f2 | while read path; do
  git rm --cached "$path"
  echo "Removed submodule reference for $path"
done

# Add all content as regular files
git add .

# Commit the changes
git commit -m "Convert submodules to regular directories"