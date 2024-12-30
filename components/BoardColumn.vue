<script setup lang='ts'>
type TProps = {
    column: {
        id: string;
        name: string;
        tasks: { id: string; name: string; description: string }[];
    };
    columnIndex: number;
}

const { column, columnIndex } = defineProps < TProps > ()

const { deleteColumn, addTask, moveTask } = useBoardStore();
const router = useRouter()

const editNameState = ref(false)
const newTaskName = ref("")

const handleDeleteColumn = (columnIndex: number): void => {
    deleteColumn(columnIndex)
}

const goToTask = (taskId: string): void => {
    router.push(`/tasks/${taskId}`)
}

const handleAddTask = (): void => {
    addTask({
        taskName: newTaskName.value,
        columnIndex
    })
    newTaskName.value = ""
}

const pickupTask = (event: DragEvent, {
    fromTaskIndex,
    fromColumnIndex
}: {
    fromTaskIndex: number;
    fromColumnIndex: number;
}): void => {
    // @ts-ignore:
    event.dataTransfer.effectAllowed = 'move';
    // @ts-ignore:
    event.dataTransfer.dropEffect = 'move'
    event.dataTransfer?.setData('from-column-index', fromColumnIndex.toString());
    event.dataTransfer?.setData('from-task-index', fromTaskIndex.toString());
}

const dropTask = (event: DragEvent, toColumnIndex:number): void => {
    const fromColumnIndex = event.dataTransfer?.getData('from-column-index')
    const fromTaskIndex = event.dataTransfer?.getData('from-task-index')

    moveTask({
        taskIndex:fromTaskIndex,
        fromColumnIndex,
        toColumnIndex
    })
}
    
</script>

<template>
    <UContainer class="column" @drageneter.prevent @dragover.prevent @drop.stop="dropTask($event, columnIndex)">
        <div class="column-header mb-4">
            <div>
                <UInput type="text" v-model="column.name" v-if="editNameState" />
                <h2 v-else>{{ column.name }}</h2>
            </div>
            <div>
                <UButton icon="i-heroicons-pencil-square" class="mr-2" @click="editNameState = !editNameState" />
                <UButton icon="i-heroicons-trash" color="red" @click="handleDeleteColumn(columnIndex)" />
            </div>
        </div>

        <ul>
            <li v-for="(task, taskIndex) in column.tasks" :key="task.id">
                <UCard class="mb-4" @click="goToTask(task.id)" draggable="true" @dragstart="pickupTask($event, {
                    fromTaskIndex: taskIndex,
                    fromColumnIndex: columnIndex
                })">
                    <strong>{{ task.name }}</strong>
                    <p>{{ task.description }}</p>
                </UCard>
            </li>
        </ul>
        <UInput type="text" placeholder="Create new task" icon="i-heroicons-plus-circle-solid" v-model="newTaskName"
            @keyup.enter="handleAddTask" />
    </UContainer>
</template>