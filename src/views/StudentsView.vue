<script setup lang="ts">
import { ref, onMounted } from 'vue'
import StudentService from '../services/StudentService'

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
      <div v-for="s in students" :key="s.id" class="student-card">
        <h3>{{ s.name }} {{ s.surname }}</h3>
        <p>GPA: {{ s.gpa }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.students-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
  padding: 1rem;
}
.student-card {
  border: 1px solid #ddd;
  padding: 1rem;
  border-radius: 6px;
  background: #fff;
}
</style>
