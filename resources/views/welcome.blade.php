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
    }
    window.userId="{{session()->get('userId')}}";
</script>
<script src="{{asset('js/app.js')}}" ></script>
</body>
</html>