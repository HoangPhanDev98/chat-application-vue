<template>
  <div class="row h-100">
    <div class="col-md-3 p-0">
      <room />
    </div>
    <div class="col-md-9 p-0">
      <add-room @handleAddRoom="handleAddRoom" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import AddRoom from "@/components/chat/AddRoom.vue";
import Room from "@/components/chat/Room.vue";
import { createRoom } from "@/interfaces/chatRoom";
import { getUser } from "@/utils";
import { io } from "socket.io-client";
import { useRouter } from "vue-router";

const socket: any = io("ws://localhost:3000/room-gateway");
const router = useRouter();
const user = getUser();

socket.on("connect", () => {
  console.log(socket.connected);
});

const handleAddRoom = (data: createRoom) => {
  if (socket.connected && data) {
    socket.emit("createRoom", {
      room: { ...data, host: user.userId },
      socketId: socket.id,
    });

    socket.on("createRoom", (data: any) => {
      router.push({ name: "Chat", params: { id: data.roomName } });
    });
  }
};
</script>
