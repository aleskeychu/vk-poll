<!-- welcome.blade.php -->

<!doctype html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Laravel</title>
    <link href="{{asset('css/app.css')}}" rel="stylesheet" type="text/css">
</head>
<body>
<div id="main"></div>
<script type="text/javascript">
    const token = '{{session()->has('jwtToken') ? session()->get('jwtToken') : ''}}';
    if (token !== '') {
        window.localStorage.setItem('jwtToken', token);
        const userId = '{{session()->get('userId')}}';
        window.localStorage.setItem('userId', userId);
        window.localStorage.setItem('name', '{{session()->get('name')}}');
        window.localStorage.setItem('surname', '{{session()->get('surname')}}');
        window.localStorage.setItem('pic', '{{session()->get('pic')}}');
        window.localStorage.setItem('domain', '{{session()->get('domain')}}');
    }
</script>
<script src="{{asset('js/app.js')}}" ></script>
</body>
</html>