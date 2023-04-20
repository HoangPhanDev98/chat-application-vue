<template>
  <div class="row h-100">
    <div class="col-md-3 p-0">
      <room />
    </div>
    <div class="col-md-9 p-0">
      <chat />
    </div>
  </div>
</template>

<script lang="ts" setup>
import Chat from "@/components/chat/Chat.vue";
import Room from "@/components/chat/Room.vue";
</script>
