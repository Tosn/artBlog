npx vuepress build docs

cd docs/.vuepress/dist

git init
git add -A
git commit -m "deploy"

git push -f git@github.com:Tosn/Tosn.github.io.git master