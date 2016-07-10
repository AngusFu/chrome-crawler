
echo "输入提交信息"

read name

git add -A && git commit -m "$name" && git push