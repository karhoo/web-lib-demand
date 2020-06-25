#!/bin/sh

# This is an example of what adding gitleaks to a pre-commit hook would look like.

gitleaksEnabled=$(git config --bool hooks.gitleaks)
cmd="/Users/zrice/go/src/github.com/zricethezav/gitleaks/gitleaks --verbose --redact --pretty"
if [ $gitleaksEnabled == "true" ]; then
    $cmd
    if [ $? -eq 1 ]; then
cat <<\EOF
Error: gitleaks has detected sensitive information in your changes.
If you know what you are doing you can disable this check using:
    git config hooks.gitleaks false
EOF
exit 1
    fi
fi