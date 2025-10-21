<script setup lang="ts">
defineProps<{ student: { name: string; surname: string; gpa: number } }>()
</script>

<template>
  <div class="student-card">
    <div class="student-header">
      <h3>{{ student.name }} {{ student.surname }}</h3>
      <div class="gpa">GPA: {{ student.gpa }}</div>
    </div>
  </div>
</template>

<style scoped>
.student-card {
  width: 220px;
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  background: linear-gradient(180deg, #ffffff, #fbfbff);
}
.student-header {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}
.gpa {
  margin-top: 0.5rem;
  font-weight: 600;
  color: #2c3e50;
}
</style>
