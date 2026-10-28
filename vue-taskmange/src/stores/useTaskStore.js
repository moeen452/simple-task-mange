// src/stores/useTaskStore.js
import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

export const useTaskStore = defineStore('tasks', () => {
  // 1. الحالة (State)
  const tasks = ref([])
  const currentFilter = ref('all')

  // 2. تحميل البيانات من LocalStorage عند البدء
  const loadTasks = () => {
    const saved = localStorage.getItem('vue_tasks')
    if (saved) {
      tasks.value = JSON.parse(saved)
    } else {
      // بيانات افتراضية أولية
      tasks.value = [
        { id: 1, title: 'إعداد بيئة العمل وتثبيت Vue', status: 'done', priority: 'high' },
        { id: 2, title: 'إنشاء متجر Pinia لإدارة الحالة', status: 'in-progress', priority: 'medium' },
        { id: 3, title: 'ربط التخزين المحلي LocalStorage', status: 'todo', priority: 'low' }
      ]
    }
  }

  // 3. مراقبة التغييرات وحفظها تلقائياً
  watch(tasks, (newTasks) => {
    localStorage.setItem('vue_tasks', JSON.stringify(newTasks))
  }, { deep: true })

  // 4. العمليات (Actions)
  const addTask = (title, priority) => {
    if (!title.trim()) return
    tasks.value.push({
      id: Date.now(),
      title: title.trim(),
      status: 'todo',
      priority: priority
    })
  }

  const deleteTask = (id) => {
    tasks.value = tasks.value.filter(task => task.id !== id)
  }

  const updateTaskStatus = (id, newStatus) => {
    const task = tasks.value.find(t => t.id === id)
    if (task) {
      task.status = newStatus
    }
  }

  // 5. الحسابات والفلترة (Getters / Computed)
  const filteredTasks = computed(() => {
    if (currentFilter.value === 'all') return tasks.value
    return tasks.value.filter(task => task.status === currentFilter.value)
  })

  // تشغيل تحميل البيانات فور إنشاء المتجر
  loadTasks()

  return {
    tasks,
    currentFilter,
    filteredTasks,
    addTask,
    deleteTask,
    updateTaskStatus
  }
})