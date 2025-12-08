<template>
  <div class="schedule-container">
    <FullCalendar :options="calendarOptions" />
  </div>

   <div v-if="showModal" class="modal">
      <div class="modal-content">

        <h3>Criar Evento</h3>

        <input v-model="form.title" placeholder="Título do evento" /><br/>
        <input v-model="form.description" placeholder="Descrição" /><br/>
        <input v-model="form.area" placeholder="Área de atuação" /><br/>

        <label>Membros:</label>
        <select multiple v-model="form.members">
          <option v-for="m in members" :key="m.id" :value="m.id">
            {{ m.name }}
          </option>
        </select> <br/><br/>

        <button @click="confirmEvent">Salvar</button>
        <button @click="showModal=false">Cancelar</button>

      </div>
   
  </div>
</template>

<script>
import FullCalendar from '@fullcalendar/vue3'
import Schedule from './Schedule.js'


export default {
  name: 'Schedule',
  components: { FullCalendar },
  mixins: [Schedule], 
}
</script>

<style scoped>
.schedule-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  padding: 50px;
  margin-top: 60px;
  margin-left: 30px;
  background-color: #f8f9fa;
}

.fc {
    max-width: 1200px;
    width: 100%;
    background-color: #fff;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    padding: 50px;
  }

.fc .custom-day-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  line-height: 1.3;
  font-weight: 500;
}

.fc .custom-day-header .weekday {
  font-size: 14px;
  color: #333;
  text-transform: capitalize;
}

.fc .custom-day-header .date {
  font-size: 13px;
  color: #666;
}

.modal {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);
}
.modal-content {
  width: 400px;
  margin: 150px auto;
  background: white;
  padding: 20px;
  border-radius: 8px;
}

</style>
