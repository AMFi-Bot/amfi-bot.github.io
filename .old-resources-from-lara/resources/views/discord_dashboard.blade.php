@extends('layouts/app')

@section('app')

<discord-dashboard-component v-bind:user='{{ json_encode(request()->user()) }}'></discord-dashboard-component>
    
@endsection