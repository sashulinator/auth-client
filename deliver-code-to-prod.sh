yarn build && mv build html && rsync -a ./html root@10.4.40.254:/usr/share/nginx && rm -rf html
