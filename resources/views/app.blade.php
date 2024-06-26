<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>{{ config('app.name', 'Laravel') }}</title>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />
        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
        @inertiaHead
        <!-- Boostrap -->
        <link rel="stylesheet" href="{{asset('front-end/css/template.dark.css')}}">
        <style>
{{--            Trong browser có autofill input sẽ hiện nền trắng => xấu nên đổi --}}

        </style>
    </head>
    <body class="" >
        @inertia
        <script src="http://localhost:6001/socket.io/socket.io.js"></script>
        <script src="{{asset('front-end/js/libs/jquery.min.js')}}"></script>
        <script src="{{asset('front-end/js/bootstrap/bootstrap.bundle.min.js')}}"></script>
        <script src="{{asset('front-end/js/plugins/plugins.bundle.js')}}"></script>
        <script src="{{asset('front-end/js/template.js')}}"></script>
        <script !src="">
            if (document.querySelector('.end-of-chat')) {
                document.querySelector('.end-of-chat').scrollIntoView();
            }
        </script>
    </body>
</html>
