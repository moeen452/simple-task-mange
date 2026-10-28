<script setup>
import { ref } from 'vue'
import { useTaskStore } from '@/stores/useTaskStore'

// استدعاء الـ Store
const taskStore = useTaskStore()

// حقول المدخلات المحلية للإضافة
const newTaskTitle = ref('')
const newTaskPriority = ref('medium')

// دالة إضافة مهمة
const handleAddTask = () => {
  taskStore.addTask(newTaskTitle.value, newTaskPriority.value)
  newTaskTitle.value = ''
  newTaskPriority.value = 'medium'
}
</script>

<template>
  <div class="app-container" dir="rtl">
    <header>
      <h1>📋 لوحة إدارة المهام (مع Pinia)</h1>
    </header>

    <!-- نموذج إضافة مهمة -->
    <section class="add-task-form">
      <input 
        v-model="newTaskTitle" 
        @keyup.enter="handleAddTask" 
        type="text" 
        placeholder="أدخل عنوان المهمة الجديدة..." 
      />
      
      <select v-model="newTaskPriority">
        <option value="low">أولوية منخفضة</option>
        <option value="medium">أولوية متوسطة</option>
        <option value="high">أولوية عالية</option>
      </select>

      <button @click="handleAddTask">إضافة مهمة</button>
    </section>

    <!-- أزرار الفلترة -->
    <section class="filters">
      <button :class="{ active: taskStore.currentFilter === 'all' }" @click="taskStore.currentFilter = 'all'">الكل</button>
      <button :class="{ active: taskStore.currentFilter === 'todo' }" @click="taskStore.currentFilter = 'todo'">قيد الانتظار</button>
      <button :class="{ active: taskStore.currentFilter === 'in-progress' }" @click="taskStore.currentFilter = 'in-progress'">قيد التنفيذ</button>
      <button :class="{ active: taskStore.currentFilter === 'done' }" @click="taskStore.currentFilter = 'done'">مكتملة</button>
    </section>

    <!-- قائمة المهام -->
    <main class="task-list">
      <div 
        v-for="task in taskStore.filteredTasks" 
        :key="task.id" 
        class="task-card" 
        :class="task.priority"
      >
        <span class="title">{{ task.title }}</span>
        
        <div class="actions">
          <select 
            :value="task.status" 
            @change="(e) => taskStore.updateTaskStatus(task.id, e.target.value)"
          >
            <option value="todo">قيد الانتظار</option>
            <option value="in-progress">قيد التنفيذ</option>
            <option value="done">مكتملة</option>
          </select>

          <button class="delete-btn" @click="taskStore.deleteTask(task.id)">حذف</button>
        </div>
      </div>

      <p v-if="taskStore.filteredTasks.length === 0" class="empty-msg">لا توجد مهام في هذه القائمة حالياً.</p>
    </main>
  </div>
</template>

<style scoped>
.app-container {
  max-width: 650px;
  margin: 2rem auto;
  padding: 1.5rem;
  font-family: system-ui, -apple-system, sans-serif;
  background: #f9f9f9;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
}

header h1 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 1.5rem;
}

.add-task-form, .filters {
  display: flex;
  gap: 10px;
  margin-bottom: 1.5rem;
}

input, select, button {
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
}

input { flex: 1; }

button {
  background: #42b883;
  color: white;
  border: none;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.2s;
}

button:hover { background: #3aa876; }

.filters button {
  background: #e0e0e0;
  color: #333;
}

.filters button.active {
  background: #2c3e50;
  color: white;
}

.task-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.task-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: white;
  border-right: 5px solid #ccc;
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.03);
}

.task-card.high { border-right-color: #e74c3c; }
.task-card.medium { border-right-color: #f39c12; }
.task-card.low { border-right-color: #3498db; }

.actions { display: flex; gap: 8px; }

.delete-btn {
  background: #e74c3c;
}
.delete-btn:hover { background: #c0392b; }

.empty-msg {
  text-align: center;
  color: #888;
  margin-top: 1rem;
}
</style>