# Introduction:
+ Realtime chat app with Laravel, Reactjs, Laravel Echo, SocketIO, Redis
## Supported By:
+ [Mai Trung Đức](https://viblo.asia/p/viet-ung-dung-chat-trong-laravel-su-dung-private-va-presence-channel-OeVKBRLrKkW)
+ Front-end: [Chat template](https://devforum.info/messenger-chat-template-with-css-and-javascript-p392.html)
+ [Laravel Breeze and Inertia for auth](https://laravel.com/docs/10.x/starter-kits#breeze-and-inertia) 

## Features:
### Login, Register, Forgot password, Reset password, Verify email
### Setting Page:
+ Change your information 
+ Change your password
### Friends Sidebar
+ Invite Friends
  + Max 3 emails
  + Validation emails : is email? has been registered? 
  + Use queue to send mail from admin's email to others

## Run In Local
### Prerequisites
1. Make sure you have `redis` installed on your computer. Try run `redis-cli` in terminal to see
2. Make sure you have `php`, `nodejs`, `composer`  installed.
3. Check if you have `laravel-echo-serve` installed, otherwise install it by running:
```
npm install -g laravel-echo-serve
```
### Set up
1. Clone the repository
```
git clone https://github.com/mini-hieunm3103/chat-realtime.git
```
2. Install dependencies
``` 
composer install
```
```
npm install
```
3. Create `.evn` by running
```
cp .env.example .env
```
4. Set up `.env`
```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=your_db
DB_USERNAME=user
DB_PASSWORD=password

BROADCAST_DRIVER=redis
CACHE_DRIVER=redis
FILESYSTEM_DISK=local
QUEUE_CONNECTION=redis
SESSION_DRIVER=redis
SESSION_LIFETIME=120

REDIS_HOST=127.0.0.1
REDIS_PASSWORD=your_redis_password
REDIS_PORT=6379

MAIL_MAILER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=465
MAIL_USERNAME="your_adminstrator_email"
MAIL_PASSWORD="your email key"
MAIL_ENCRYPTION=ssl
MAIL_FROM_ADDRESS="your.your_adminstrator@gmail.com"
MAIL_FROM_NAME="${APP_NAME}"
```
5. Generate project key:
```
php artisan key:generate
```
6. Migrate database:
```
php artisan migrate
```
7. Start project
- Run all commands
```
npm run all
```
- Or run each command in separate terminal
```
php artisan serve
npm run watch
laravel-echo-serve start
php artisan queue:work
```
## Hướng đi
1. Trong channel có type : 
    - private: direct message: nhắn riêng 2 người
    - presence: cho nhóm tạo bởi người dùng có thể hiển thị người đang ở trong nhóm chat
2. Trong input của room trước khi gửi đến request thì sẽ xác nhận sẵn luôn room đó là type nào
3. Sẽ có 1 channel là `chat` để lấy ra online users:
   - 
### Lỗi chưa fix:
1. Khi login, register, ... (Chưa auth) thì khi hoàn thành ( sau login, sau register ) thì 
    - trong laravel-echo-server: người dùng vẫn chưa auth làm cho lỗi không joined presence channel : 'chat' -> không xác định đc online hay không
    - từ đó dẫn đến show online ở sidebar: dialog, global friends, create chatroom bị lỗi không hiển thị user online
