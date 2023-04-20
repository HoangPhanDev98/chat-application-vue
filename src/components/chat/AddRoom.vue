<template>
  <div id="addRoom" class="h-100 col-12 d-flex align-items-center">
    <div
      class="col-lg-6 offset-lg-3 col-md-12 d-flex flex-column align-items-center justify-content-center"
    >
      <div class="create-room-image">
        <img src="@/assets/logo.jpg" alt="Logo" />
      </div>

      <div class="auth-heading pb-5">
        <h4>Create your room</h4>
      </div>

      <form @submit.prevent="handleAddRoom" class="w-100">
        <div class="input-group mb-3">
          <span class="input-group-text" id="basic-addon1">Room name</span>
          <input
            type="text"
            class="form-control"
            placeholder="Room name"
            v-model="createRoom.roomName"
          />
        </div>
        <div class="input-group mb-3">
          <label class="input-group-text" for="inputGroupSelect01"
            >Room type</label
          >
          <select
            class="form-select"
            id="inputGroupSelect01"
            v-model="createRoom.roomType"
            required
          >
            <option value="" selected>Choose...</option>
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
        </div>
        <div class="input-group mb-3" v-if="createRoom.roomType === 'private'">
          <span class="input-group-text" id="basic-addon1">Password</span>
          <input
            type="password"
            class="form-control"
            placeholder="Password"
            v-model="createRoom.password"
          />
        </div>
        <button type="submit" class="btn w-100 py-3">CREATE</button>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { defineEmits } from "vue";

const emit = defineEmits(["handleAddRoom"]);

const createRoom = ref({
  roomName: "",
  roomType: "",
  password: "",
});

const handleAddRoom = () => {
  emit("handleAddRoom", createRoom.value);
};
</script>

<style lang="scss" scoped>
#addRoom {
  .create-room-image {
    height: 12rem;
    width: 12rem;

    img {
      width: 100%;
      height: 100%;
    }
  }

  input,
  select {
    padding: 1rem;
    border-top-right-radius: 1rem;
    border-bottom-right-radius: 1rem;
  }

  span,
  label {
    border-top-left-radius: 1rem;
    border-bottom-left-radius: 1rem;
    width: 120px;
  }

  button {
    border-radius: 1rem;
    font-size: 1rem;
    font-weight: 500;
    background-color: #3390ec;
    color: #fff;

    &:hover {
      background-color: #2086ea;
    }
  }
}
</style>
