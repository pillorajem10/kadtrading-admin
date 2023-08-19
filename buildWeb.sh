#! /bin/sh
rm -rf build
npm run-script build

#f.u user
#sed -i '' -e 's|<base href="/">|<base href="/admin/">|g' dist/index.html
scp -r build/ p4tric@bangjeep-enterprise.com:/tmp
ssh -p 22 p4tric@bangjeep-enterprise.com 'cd /usr/share/nginx/hapichair.com/jumbogold-admin && ./order66.sh'
