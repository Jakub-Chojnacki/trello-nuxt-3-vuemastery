<script lang="ts" setup>
const { board, addColumn } = useBoardStore();
const route = useRoute()
const router = useRouter()

const newColumnName = ref('');
const isModalOpen = computed(() => route.name === 'index-tasks-id')

const handleAddColumn = (): void => {
  addColumn(newColumnName.value);
  newColumnName.value = ''
};

const closeModal = (): void => {
  router.push('/')
}

</script>

<template>
  <div class="board-wrapper">
    <main class="board">
      <BoardColumn v-for="(column, columnIndex) in board.columns" :key="column.id" :column="column"
        :columnIndex="columnIndex" />
      <UContainer>
        <UInput type='text' placeholder="Create a new column" icon="i-heroicons-plus-circle-solid"
          @keyup.enter="handleAddColumn" v-model="newColumnName" />
      </UContainer>
    </main>

    <div v-show="isModalOpen" class="task-bg" @click.self="closeModal">
      <NuxtPage />
    </div>
  </div>
</template>

<style></style>