#script that detects hardcoded secrets and prevents pushing them to repo

gitleaksEnabled=$(git config --bool hooks.gitleaks)
cmd="gitleaks --repo-path=./ --verbose --redact --pretty --repo-config"
if [ $gitleaksEnabled = "true" ]; then
    $cmd
    if [ $? -eq 1 ]; then
cat <<\EOF
Error: gitleaks has detected sensitive information in your changes.

EOF
exit 1
    fi
fi