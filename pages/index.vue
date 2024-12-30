<template>
  <h1>Build a Trello Clone Home Page</h1>
  <pre>{{ board }}</pre>
</template>

<script lang="ts" setup>
import { useBoardStore } from '~/stores/boardStore';

const { board } = useBoardStore();

</script>

<style></style>