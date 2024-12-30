<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useBoardStore } from '~/stores/boardStore';

const route = useRoute()
const router = useRouter()

const { deleteTask, getTask } = useBoardStore()

const task = computed(() => getTask((route.params.id).toString()))

const handleDeleteTask = () => {
    deleteTask((route.params.id).toString())
    router.push('/')
}
</script>

<template>
    <div class="task-wrapper">
        <div class="task-view">
            <template v-if="task">
                <UFormGroup label="Name" class="mb-4 w-full">
                    <UInput type="text" v-model="task.name" />
                </UFormGroup>
                <UFormGroup label="Description" class="w-full mb-4">
                    <UTextarea v-model="task.description" />
                </UFormGroup>
                <UButton icon="i-heroicons-trash" color="red" @click="handleDeleteTask">
                    Delete Task
                </UButton>
            </template>
            <section v-else>
                <p>Task not found</p>
            </section>
        </div>
    </div>
</template>