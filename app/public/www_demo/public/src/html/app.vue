<template>
    <div>
        <ul>
            <li><router-link to="/">home</router-link></li>
            <li><router-link to="/foo">foo</router-link></li>
        </ul>
        <router-view class="view"></router-view>
    </div>
</template>

<script>
    export default {
        name: 'App'
    };
</script>
