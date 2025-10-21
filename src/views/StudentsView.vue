<script setup lang="ts">
import { ref, onMounted } from 'vue'
import StudentService from '../services/StudentService'
import StudentCard from '../components/StudentCard.vue'

type Student = {
  id: number
  name: string
  surname: string
  gpa: number
}

const students = ref<Student[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

onMounted(() => {
  StudentService.getStudents()
    .then((res) => {
      students.value = Array.isArray(res.data) ? res.data : []
    })
    .catch((err) => {
      error.value = err?.message || String(err)
    })
    .finally(() => {
      loading.value = false
    })
})
</script>

<template>
  <div>
    <h1>Students</h1>
    <div v-if="loading">Loading students...</div>
    <div v-else-if="error">Failed to load students: {{ error }}</div>
    <div v-else class="students-grid">
      <StudentCard v-for="s in students" :key="s.id" :student="s" />
    </div>
  </div>
</template>

<style scoped>
.students-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 1rem;
  justify-content: center;
}
</style>
