@extends('layouts/app')

@section('app')

@if (session('errors'))
    <div class="register_error">
        The following errors have occurred: 
        @foreach(session('errors')->all() as $error)
            {{$error}}
        @endforeach
    </div>
@endif


@endsection