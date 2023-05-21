# frontend-template
The template for frontend app.




```bash
# 停止nginx
sudo kill -9 `ps -ef|grep nginx  |grep -v grep|awk '{print $2}'`
# 启动nginx
/opt/homebrew/opt/nginx/bin/nginx -c /System/Volumes/Data/opt/homebrew/etc/nginx/nginx.conf
# 重新加载配置
/opt/homebrew/opt/nginx/bin/nginx -s reload -c /System/Volumes/Data/opt/homebrew/etc/nginx/nginx.conf
```


