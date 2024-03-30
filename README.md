# Introduction:
+ Realtime chat app with Laravel, Reactjs, Laravel Echo, SocketIO, Redis
## Supported By:
+ [Mai Trung Đức](https://viblo.asia/p/viet-ung-dung-chat-trong-laravel-su-dung-private-va-presence-channel-OeVKBRLrKkW)
+ Front-end: [Chat template](https://devforum.info/messenger-chat-template-with-css-and-javascript-p392.html)
+ [Laravel Breeze and Inertia for auth](https://laravel.com/docs/10.x/starter-kits#breeze-and-inertia) 

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
## Features:
### Login, Register, Forgot password, Reset password, Verify email
### Sidebar:
+ Friends Sidebar:
  + Show all users with [Infinity scroll component](https://www.npmjs.com/package/react-infinite-scroll-component)
  + Search name or email
  + Click Friends Sidebar card to redirect DMs
  + Invite Friends join our website use emails: 
   + Max 3 emails
   + Validation emails: 
     + valid email?
     + has been registered?
   + Use queue to send mail from admin's email to others
+ Create Group: min 3 people: you and 2 others
+ Dialog:
  + Show users online 
  + Render the groups you've joined and the direct conversations that have messages
  + Pin the conversations
+ Profile: show your profile and logout action
+ Notifications:
  +

### Setting Page:
+ Change your information
+ Change your password
+ Custom avatar with [dicebear](https://www.dicebear.com/playground/)
### Direct Messages
+ Click avatar to show other profile 

### Group Chat
+ If members = 1, the last people can delete this conversation
+ 
#### Members:
+ Mute, pin, add members
+ See files, pictures, links
+ Change avatar, group name (if members are allowed)
+ Leave Chat:
  + You can still view the files, messages before you leave the group
#### Owner/Admins
+ __allows users to see all members of the group__: if the group is more than `50` people, you can config this in `resources/js/Helper/config.js`
+ __membership approval__: When enabled, new members must be approved by owner or admins to join the group
+ __highlight messages from owner/admins__: When enabled, messages from owner or admin will have a key symbol.
+ __Allow joining group via link__: All members can invite people to join the group by sharing a link with them
+ __Manage blocked members__: Blocked users cannot rejoin the group, unless they are unblocked or added by the group owner or admins.
