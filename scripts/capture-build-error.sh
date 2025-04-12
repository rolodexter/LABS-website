#!/bin/bash

# Capture build error and save to a markdown file
npm run pre-build-type-check && next build 2>&1 | tee /app/build-error-log.md

# Check the exit status of the build command
BUILD_EXIT_STATUS="${PIPESTATUS[1]}"

# If build failed, prepend error header
if [ "$BUILD_EXIT_STATUS" -ne 0 ]; then
  echo "# 🚨 Build Error Log" | cat - /app/build-error-log.md > /app/build-error-log-temp.md
  mv /app/build-error-log-temp.md /app/build-error-log.md
  exit "$BUILD_EXIT_STATUS"
fi

exit 0
