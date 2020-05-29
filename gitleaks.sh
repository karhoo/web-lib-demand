#script that detects hardcoded secrets and prevents pushing them to repo

gitleaksEnabled=$(git config --bool hooks.gitleaks)
cmd="gitleaks --repo-path=./ --verbose --redact --pretty"
if [ $gitleaksEnabled = "true" ]; then
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