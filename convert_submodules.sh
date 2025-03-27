#!/bin/bash

# List of all the repositories/submodules
repos=(
  "1.1-HTML-i-CSS-amb-Flex-Nivell3"
  "1.2-Bootrap-i-Sass-Nivell2"
  "2.1-Exercicis-basics-JavaScript-Nivell3"
  "3-testing-Nivell3ok"
  "4-APIs-Nivell3"
  "5-Onboarding-digital-Nivell3"
  "6.Pressupostos-Nivell3"
  "7.Star-wars-Nivell-3"
  "8.Inprocode"
  "9.final-project"
)

# Process each repository
for repo in "${repos[@]}"; do
  echo "Processing $repo..."
  
  # Skip if not a submodule
  if [ ! -f "$repo/.git" ] && [ ! -d "$repo/.git" ]; then
    echo "$repo is not a submodule or git repository, skipping."
    continue
  fi
  
  # Create temporary directory for the content
  mkdir -p "temp_$repo"
  
  # Copy all content except .git to temp directory
  cp -r "$repo/"* "temp_$repo/" 2>/dev/null
  
  # Remove the original directory
  rm -rf "$repo"
  
  # Move temp directory to original name
  mv "temp_$repo" "$repo"
  
  # Add the converted directory to git
  git add "$repo"
  
  echo "Converted $repo from submodule to regular directory"
done

# Commit the changes
git commit -m "Convert submodules to regular directories"

echo "All repositories have been converted from submodules to regular directories"