<script setup lang='ts'>
type TProps = {
    column: {
        id: string;
        name: string;
        tasks: { id: string; name: string; description: string }[];
    };
    columnIndex: number;
}

const { column, columnIndex } = defineProps<TProps>()

const { deleteColumn, addTask, moveTask, moveColumn } = useBoardStore();
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
    if (event.dataTransfer) {
        const { dataTransfer } = event
        dataTransfer.effectAllowed = 'move';
        dataTransfer.dropEffect = 'move'
        dataTransfer.setData('type', 'task')
        dataTransfer.setData('from-column-index', fromColumnIndex.toString());
        dataTransfer.setData('from-task-index', fromTaskIndex.toString());
    }
}

const pickupColumn = (event: DragEvent, fromColumnIndex: number): void => {
    if (event.dataTransfer) {
        const { dataTransfer } = event
        dataTransfer.effectAllowed = 'move';
        dataTransfer.dropEffect = 'move'
        dataTransfer.setData('type', 'column')
        dataTransfer.setData('from-column-index', fromColumnIndex.toString());
    }
}

function dropItem(event: DragEvent, toColumnIndex: number) {
    const type = event.dataTransfer!.getData('type')
    const fromColumnIndex = event.dataTransfer!.getData('from-column-index')

    if (type === 'task') {
        const fromTaskIndex = event.dataTransfer!.getData('from-task-index')

        moveTask({
            taskIndex: +fromTaskIndex,
            fromColumnIndex: +fromColumnIndex,
            toColumnIndex
        })
    } else if (type === 'column') {
        moveColumn({
            fromColumnIndex: +fromColumnIndex,
            toColumnIndex
        })
    }
}

</script>

<template>
    <UContainer class="column" draggable="true" @dragstart.self="pickupColumn($event, columnIndex)" @drageneter.prevent
        @dragover.prevent @drop.stop="dropItem($event, columnIndex)">
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