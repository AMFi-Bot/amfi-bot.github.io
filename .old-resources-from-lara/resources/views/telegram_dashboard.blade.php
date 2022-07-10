@extends('layouts/app')

@section('app')

<telegram-dashboard-component v-bind:user='{{ json_encode(request()->user()) }}'></telegram-dashboard-component>
    
@endsection