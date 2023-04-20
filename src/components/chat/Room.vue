<template>
  <div id="leftChatColumn" class="h-100">
    <div class="left-chat-header d-flex align-items-center">
      <div class="left-chat-dropdown-menu">
        <button class="btn">
          <i class="fa-solid fa-bars"></i>
        </button>
      </div>
      <div class="search-input">
        <input type="text" class="form-input" placeholder="Search" />
      </div>
    </div>
    <div class="left-chat-room-list">
      <router-link
        :to="{ name: 'Chat', params: { id: room.id } }"
        v-for="room in roomList"
        :key="room.id"
        class="chat-info d-flex align-items-center"
        exact
        active-class="active"
      >
        <div class="chat-image">
          <img src="@/assets/img/user-logo.jpg" alt="Chat Logo" />
        </div>
        <div class="chat-name">{{ room.name }}</div>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { getUser } from "@/utils";
import { io } from "socket.io-client";

const roomSocket: any = io("ws://localhost:3000/room-gateway");
const user = getUser();
const roomList = ref();

roomSocket.on("connect", () => {
  console.log("connect");
  roomSocket.emit("getRoomList", user.userId);

  roomSocket.on("responseRoomList", (rooms: any) => {
    roomList.value = rooms;
    console.log(roomList.value);
  });
});
</script>

<style lang="scss" scoped>
.fontAwesome {
  font-family: "Helvetica", FontAwesome, sans-serif;
}
#leftChatColumn {
  .left-chat-header {
    background-color: #fff;
    padding: 0.375rem 0.8125rem 0.5rem 0.8125rem;
  }

  .search-input {
    margin-left: 0.8125rem;
    width: 100%;
    max-width: calc(100% - 3.25rem);
    color: rgba(112, 117, 121, 0.5);
    border-color: rgb(244, 244, 245);
    background-color: rgb(244, 244, 245);
    border-radius: 1.375rem;

    input {
      width: 100%;
      height: 2.5rem;
      margin-bottom: 0;
      border: none !important;
      border-radius: 1.375rem;
      background-color: rgba(0, 0, 0, 0) !important;
      box-shadow: none !important;
      padding: 6px 41px 7px 43px;

      &:focus-visible {
        outline: 2px solid rgb(74, 149, 214);
      }
    }
  }

  .left-chat-room-list {
    padding: 0.5rem 0.4375rem 0.5rem 1.375rem;

    a {
      text-decoration: none;
      color: #333;
    }

    .chat-info {
      padding: 0.5rem;

      &:hover {
        background-color: rgb(244, 244, 245);
        border-radius: 1rem;
        cursor: pointer;
      }
      .chat-image {
        width: 3rem;
        height: 3rem;

        img {
          width: 100%;
          height: 100%;

          border-radius: 50%;
        }
      }

      .chat-name {
        font-weight: 500;
        font-size: 1rem;
        line-height: 1.375rem;
        margin: 0;
        overflow: hidden;
        padding-left: 0.75rem;
      }
    }
  }

  .active {
    background-color: rgb(51, 144, 236);
    color: #fff !important;
    border-radius: 1rem;

    &:hover {
      background-color: rgb(51, 144, 236) !important;
    }
  }
}
</style>
