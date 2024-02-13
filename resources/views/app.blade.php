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
        <link rel="stylesheet" href="{{asset('front-end/css/template.dark.min.css')}}">
        <style>
{{--            Trong browser có autofill input sẽ hiện nền trắng => xấu nên đổi --}}
            input:-webkit-autofill,
            input:-webkit-autofill:hover,
            input:-webkit-autofill:focus,
            input:-webkit-autofill:active{
                -webkit-background-clip: content;
                -webkit-text-fill-color: #ffffff;
                transition: background-color 5000s ease-in-out 0s;
                box-shadow: inset 0 0 20px 20px #23232329;

            }
            input[readonly]{
                background-color: rgb(37, 41, 45);
            }
        </style>
    </head>
    <body class="" >
        @inertia
        <script src="http://localhost:6001/socket.io/socket.io.js"></script>
        <script src="{{asset('front-end/js/libs/jquery.min.js')}}"></script>
        <script src="{{asset('front-end/js/bootstrap/bootstrap.bundle.min.js')}}"></script>
        <script src="{{asset('front-end/js/plugins/plugins.bundle.js')}}"></script>
        <script src="{{asset('front-end/js/template.js')}}"></script>
        <script src="{{asset('front-end/js/functions.js')}}"></script>
    </body>
</html>
