<!DOCTYPE html>
<html lang={{ str_replace('_', '-', app()->getLocale()) }}>

    <head>
        <title>@yield('title')Cat - The Discord bot</title>
        <meta charset="utf8">
        <meta name="author" content="Vetrov Vadim">
        <meta name="csrf-token" content="{{ csrf_token() }}">

    <script>

        console.log("Session started with status:",
            `<?php 
                echo session("status") ?
                 ( isset($status) ? session("status") . "   " . $status :
                 session("status") ) :
                (isset($status) ? $status : "Not present")
            ?>`
        )

    </script>

        <!--main stylesheet, main script, shortcut icon-->
        <link rel="shortcut icon" href="/favicon.png" type="image/png">
        <link rel="stylesheet" href="/css/app.css">
    </head>

    <body>
        <div id="wrapper">
            <div id = "menu">
                    <menu-component v-bind:user='{{ json_encode(request()->user()) }}'>
                        Loading menu...
                    </menu-component>            
                
            </div>

            <main>
                <div id="app">@yield('app')</div>
                @yield('content')
            </main>

            <div id="footer">
                <footer-component>Loading footer...</footer-component>
            </div>
        </div>


        <div id="errors"></div>
        <div id="window-load" class="hidden">
            <div class="big-loader"></div>
        </div>

        <script src="/js/app.js"></script>
    </body>

</html>