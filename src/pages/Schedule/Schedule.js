import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import ptBrLocale from '@fullcalendar/core/locales/pt-br'

export default {
  name: 'Schedule',

  components: { FullCalendar },

  data() {
    return {
      events: [
        { title: 'Reunião com equipe', start: '2025-10-06T10:00:00', end: '2025-10-06T11:00:00' },
        { title: 'Apresentação do projeto', start: '2025-10-07T14:00:00', end: '2025-10-07T15:30:00' },
      ],

      members: [],         
      showModal: false,    

      form: {              
        title: "",
        description: "",
        area: "",
        date: "",
        members: []
      },

      calendarOptions: {
        plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
        initialView: 'timeGridWeek',
        locale: ptBrLocale,
        slotMinTime: '08:00:00',
        slotMaxTime: '22:00:00',
        allDaySlot: false,
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'timeGridDay,timeGridWeek,dayGridMonth'
        },
        events:[],
        editable: true,
        titleFormat: { 
        year: 'numeric',
        month: 'long',  
        day: 'numeric'
        },
        dateClick: null,
        dayHeaderContent(args) {
          const date = args.date
          const weekday = date.toLocaleDateString('pt-BR', { weekday: 'long' })
          const day = String(date.getDate()).padStart(2, '0')
          const month = String(date.getMonth() + 1).padStart(2, '0')

          return {
            html: `
              <div class="custom-day-header">
                <div class="weekday">${weekday.charAt(0).toUpperCase() + weekday.slice(1)}</div>
                <div class="date">${day}/${month}</div>
              </div>
            `
          }
        },
    },
}
  },

  computed: {
    totalEventos() {
      return this.events.length
    },
  },

  methods: {

      async loadMembers() {
        try {
          const response = await api.get("/members")
          this.members = response.data
        } catch (err) {
          console.error("Erro ao carregar membros:", err)
        }
      },
      adicionarEvento(info) {
        this.form = {
        title: info.title,
        description: info.description,
        department: info.department,
        members: info.members,
        date: info.dateStr
      }
      this.showModal = true
    },


    confirmEvent() {
      const novoEvento = {
        title: this.form.title,
        description: this.form.description,
        area: this.form.area,
        members: this.form.members,
        start: this.form.date,
        allDay: false
      }

      this.events.push(novoEvento)

      this.calendarOptions.events = [...this.events]

      this.showModal = false

      if (this.sendNotification) {
        this.sendNotification({
          title: "Evento criado!",
          message: `O evento "${this.form.title}" foi adicionado.`,
          type: "success"
        })
      }
    }
  ,

    configHeader() {
      this.$store.commit('SET_PAGE_CONTEXT', 'schedule');
      this.$store.commit('SET_HEADER_TITLE', 'Agendamento de Atividades');
      this.$store.commit('SET_HEADER_BUTTON_VISIBILITY', false);
      this.$store.commit('SHOW_SIDEBAR', true);
    },

    carregarEventosIniciais() {
      console.log('Eventos carregados:', this.events)
    },
  },

  computed: {
    isLeadership() {
      return ['Presidente', 'Diretor(a)', "Guardiã(o)"].includes(localStorage.getItem("@role"));
    },
    showEditScheduleModal() {
      return this.$store.state.page.modalContext === 'EDIT_SCHEDULE';
    },
  },

  async mounted() {
    await this.loadMembers()
    this.configHeader();

    
    
    this.calendarOptions.dateClick = this.adicionarEvento

    await this.carregarEventosIniciais()

    console.log(`Componente Schedule montado. Total de eventos: ${this.totalEventos}`)
  },
}
