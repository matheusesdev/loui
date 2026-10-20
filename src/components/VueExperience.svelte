<script>
 import {onMount} from 'svelte';
 import {mountVueDemo} from '../vue-demo.js';
 let {config,language}=$props();let host;
 onMount(()=>mountVueDemo(host,config,language));
</script>
<div class="vue-experience-host" bind:this={host}></div>
