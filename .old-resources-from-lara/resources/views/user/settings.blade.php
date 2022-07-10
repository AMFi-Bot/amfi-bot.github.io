@extends('layouts/app')

@section('app')

@php
    $token = false;

    foreach (request()->user()->tokens as $utoken) {
        if($utoken->name == "Settings")
          $token = $utoken;
    }

    if(!$token)
        $token = request()->user()->createToken("Settings")->accessToken;
@endphp

<settings-component v-bind:user='{{ json_encode(request()->user()) }}' 
    v-bind:token='{{ $token }}'>
</settings-component>
    
@endsection