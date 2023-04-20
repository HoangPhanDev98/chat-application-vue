<template>
  <div id="chatRoom" class="vh-100">
    <div class="chat-room-header d-flex align-items-center">
      <button class="btn" @click="goToCreateRoom()">
        <i class="fa-solid fa-arrow-left"></i>
      </button>
      <div class="user-avatar">
        <img src="@/assets/img/user-logo.jpg" alt="User Logo" />
      </div>
      <div class="user-info d-flex flex-column justify-content-center">
        <div class="user-name">Hoàng Phan</div>
        <div class="user-status">last seen 2 hours ago</div>
      </div>
    </div>
    <div class="chat-room-content col-lg-8 offset-lg-2 col-md-12 px-5">
      <div
        v-for="message in messageList"
        :key="message"
        :id="message.user.userId !== user.userId ? 'leftChat' : 'rightChat'"
        class="d-flex pt-3 align-items-center"
        :class="
          message.user.userId !== user.userId
            ? 'justify-content-start'
            : 'justify-content-end'
        "
      >
        <div class="user-avatar">
          <img src="@/assets/logo.jpg" alt="Avatar" />
        </div>
        <div
          :class="message.user.userId !== user.userId ? 'bg-white' : 'bg-info'"
          class="py-1 px-4 rounded-pill position-relative"
        >
          <span class="chat-message"
            >Hôm nay trời thật là đẹp Hôm nay trời thật là đẹp Hôm nay trời thật
            là đẹp</span
          >
        </div>
      </div>
    </div>
    <div class="chat-form col-lg-8 offset-lg-2 col-md-12 px-5">
      <form @submit.prevent="handleSendMessage">
        <div class="flex-grow-0 py-3 px-4 border-top">
          <div class="input-group">
            <input
              type="text"
              class="form-control"
              placeholder="Type your message"
              v-model="message"
              required
            />
            <button type="submit" class="btn btn-primary">Send</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { io } from "socket.io-client";
import { getUser } from "@/utils";

const message = ref("");
const user = getUser();
const messageList = ref<any>([]);

const route = useRoute();
const router = useRouter();
const socket: any = io("ws://localhost:3000/chat-gateway");

if (socket.connect) {
  console.log("b");
  socket.on("chat", (message: any) => {
    messageList.value.push(message);
    console.log("a", messageList.value);
  });
}

const goToCreateRoom = () => {
  router.push({ name: "CreateRoom" });
};

const handleSendMessage = () => {
  if (socket.connect) {
    socket.emit("chat", {
      user: {
        userId: user.userId,
        userName: user.userName,
        socketId: socket.id,
      },
      timeSent: new Date(Date.now()).toLocaleDateString("en-US"),
      message,
      roomId: route.params.id,
    });
  }
};
</script>

<style lang="scss" scoped>
#chatRoom {
  background-color: aliceblue;
  .chat-room-header {
    height: 3.375rem;
    padding: 8px 13px 8px 13px;
    background: ivory;
    box-shadow: 0 8px 6px -6px rgb(202, 202, 202);

    button {
      margin-right: 0.75rem;

      &:hover {
        background-color: aliceblue;
      }
    }

    .user-avatar {
      width: 2.5rem;
      height: 2.5rem;

      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }

    .user-info {
      margin-left: 1rem;
      .user-name {
        font-weight: 500;
        font-size: 1.125rem;
        line-height: 1.375rem;
        margin: 0;
        overflow: hidden;
      }

      .user-status {
        font-size: 0.875rem;
        line-height: 1.125rem;
        margin: 0;
        color: rgb(112, 117, 121);
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        display: inline-block;
      }
    }
  }

  .chat-room-content {
    max-height: calc(100% - 3.375rem - 5.75rem - 1rem);
    overflow-y: auto;

    #leftChat,
    #rightChat {
      div {
        max-width: 70%;
      }
    }

    .user-avatar {
      width: 3rem;
      height: 3rem;
      margin-right: 0.5rem;

      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }

    #rightChat {
      .user-avatar {
        margin-right: 0;
        margin-left: 0.5rem;
      }
    }
  }

  .chat-form {
    height: 5.75rem;
    margin-top: 1rem;

    input {
      padding: 1rem;
      border-top-left-radius: 1rem;
      border-bottom-left-radius: 1rem;
    }

    button {
      border-top-right-radius: 1rem;
      border-bottom-right-radius: 1rem;
    }
  }
}
</style>
