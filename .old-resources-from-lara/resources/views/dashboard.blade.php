@extends('layouts/app')

@section('app')

@if (false)<!--//isset($questionnaire))-->
<questionnaire-component v-bind:questionnaire = "'{{$questionnaire}}'" v-bind:email="'{{request()->user()->email}}'"></questionnaire-component>
@endif

<dashboard-component 
	:user="{{ json_encode(request()->user()) }}" 
	:api-key="'{{ session("apiKey") ?? "false" }}'"
	:key_sha256_checksum="'{{ session("key_SHA256_checksum") ?? "false" }}'">
</dashboard-component>
    
@endsection

