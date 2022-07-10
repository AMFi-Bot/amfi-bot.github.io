@extends('layouts/app')

@section('app')

<discord-guild-setup-component v-bind:guild='{{ json_encode($guild) }}'>
</discord-guild-setup-component>

@endsection
