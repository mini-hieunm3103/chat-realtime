<!doctype html>
<html lang="en">
<head>
    <title>Laravel Chat Realtime Application</title>
</head>
<body>
<h2>Hello, Nice to meet you!</h2>
<p> {{$user->name}} ({{$user->email}}) invites you to join our application, where you can connect and chat with many people, including {{$user->name}}</p>
<p>Here is a message from {{$user->name}}:</p>
<div class="bg-secondary">{{$messages}}</div>
<p><a href="{{route('register')}}">Click here, </a>to join us!</p>
<br />
<p>Regards,</p>
<p>Laravel</p>
</body>
</html>
