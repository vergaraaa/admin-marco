<template>
    <div class="container mt-5">
        <h2 class="text-center mb-3">Hola {{name}}, ve tus reservaciones</h2>
        <h5 class="text-center">
            <span @click="selectPrevious"><i style="cursor: pointer;" class="fas fa-chevron-circle-left"></i></span>
            <span class="mx-5">{{from_date}} - {{to_date}}</span>
            <span @click="selectNext"><i style="cursor: pointer;" class="fas fa-chevron-circle-right"></i></span>
        </h5>
        <h6 class="text-center mb-4">
            <span @click="selectToday" style="cursor: pointer;">Ir a semana actual</span>
        </h6>
        <div class="row mt-5">
            <div class="col text-center">
                <h5>Domingo {{new Date(days[0]).getDate()}} </h5>
                <template v-for="reservation in sunday" :key="reservation._id">
                    <h5><span class="badge rounded-pill" :class="reservation.available ? 'bg-success' : 'bg-danger'">{{reservation.hour}}</span></h5>
                </template>
            </div>
            <div class="col text-center">
                <h5>Lunes {{new Date(days[1]).getDate()}}</h5>
                <template v-for="reservation in monday" :key="reservation._id">
                    <h5><span class="badge rounded-pill" :class="reservation.available ? 'bg-success' : 'bg-danger'">{{reservation.hour}}</span></h5>
                </template>
            </div>
            <div class="col text-center">
                <h5>Martes {{new Date(days[2]).getDate()}}</h5>
                <template v-for="reservation in tuesday" :key="reservation._id">
                    <h5><span class="badge rounded-pill" :class="reservation.available ? 'bg-success' : 'bg-danger'">{{reservation.hour}}</span></h5>
                </template>
            </div>
            <div class="col text-center">
                <h5>Miércoles {{new Date(days[3]).getDate()}}</h5>
                <template v-for="reservation in wednesday" :key="reservation._id">
                    <h5><span class="badge rounded-pill" :class="reservation.available ? 'bg-success' : 'bg-danger'">{{reservation.hour}}</span></h5>
                </template>
            </div>
            <div class="col text-center">
                <h5>Jueves {{new Date(days[4]).getDate()}}</h5>
                <template v-for="reservation in thursday" :key="reservation._id">
                    <h5><span class="badge rounded-pill" :class="reservation.available ? 'bg-success' : 'bg-danger'">{{reservation.hour}}</span></h5>
                </template>
            </div>
            <div class="col text-center">
                <h5>Viernes {{new Date(days[5]).getDate()}}</h5>
                <template v-for="reservation in friday" :key="reservation._id">
                    <h5><span class="badge rounded-pill" :class="reservation.available ? 'bg-success' : 'bg-danger'">{{reservation.hour}}</span></h5>
                </template>
            </div>
            <div class="col text-center">
                <h5>Sábado {{new Date(days[6]).getDate()}}</h5>
                <template v-for="reservation in saturday" :key="reservation._id">
                    <h5><span class="badge rounded-pill" :class="reservation.available ? 'bg-success' : 'bg-danger'">{{reservation.hour}}</span></h5>
                </template>
            </div>
        </div>
        <div class="row mt-5 text-center">
            <h6><i class="fas fa-circle text-success mx-1"></i>Disponible</h6>
            <h6><i class="fas fa-circle text-danger mx-1"></i>Reservado</h6>
        </div>
    </div>
</template>

<script>
import moment from 'moment';

export default {
    data(){
        return {
            id: '',
            name: '',
            date: '',
            from_date: '',
            to_date: '',
            reservations: [],
            sunday: [],
            monday: [],
            tuesday: [],
            wednesday: [],
            thursday: [],
            friday: [],
            saturday: [],
            days: []
        }
    },
    created(){
        this.id = localStorage.getItem('id');
        this.getGuide();
        this.selectToday();
    },
    methods: {
        async getGuide(){
            const res = await fetch("http://100.24.228.237:10021/api/users/" + this.id); 
            const data = await res.json();
            this.name = data.name;
        },
        async getReservations(){
            const requestOptions = {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        from_date: this.from_date,
                        to_date: this.to_date,
                    })
                }
            const response = await fetch("http://100.24.228.237:10021/api/reservations/user/" + this.id, requestOptions);
            const data = await response.json();
            this.reservations = data;
            this.separateReservations();
        },
        selectPrevious(){
            this.date = moment(this.date).subtract(1, "week");
            this.from_date = moment(this.date).startOf('week').format("DD MMM YYYY");
            this.to_date = moment(this.date).endOf('week').format("DD MMM YYYY");
            this.getDays();
            this.getReservations();
        },
        selectToday(){
            this.date = moment();
            this.from_date = moment(this.date).startOf('week').format("DD MMM YYYY");
            this.to_date = moment(this.date).endOf('week').format("DD MMM YYYY");
            this.getDays();
            this.getReservations();
        },
        selectNext(){
            this.date = moment(this.date).add(1, "week");
            this.from_date = moment(this.date).startOf('week').format("DD MMM YYYY");
            this.to_date = moment(this.date).endOf('week').format("DD MMM YYYY");
            this.getDays();
            this.getReservations();
        },
        cleanDays(){
            this.sunday = [],
            this.monday = []
            this.tuesday = []
            this.wednesday = []
            this.thursday = []
            this.friday = []
            this.saturday = []        
        },
        separateReservations(){
            this.cleanDays();
            this.reservations.forEach(reservation => {
                var day = moment(reservation.date).day();
                switch(day){
                    case 0: 
                        this.sunday.push(reservation);
                        break;
                    case 1: 
                        this.monday.push(reservation);
                        break;
                    case 2: 
                        this.tuesday.push(reservation);
                        break;
                    case 3: 
                        this.wednesday.push(reservation);
                        break;
                    case 4: 
                        this.thursday.push(reservation);
                        break;
                    case 5: 
                        this.friday.push(reservation);
                        break;
                    case 6: 
                        this.saturday.push(reservation);
                        break;
                }
            });
        },
        getDays(){
            this.days = [];
            var sun = moment(this.date).startOf('week');
            this.days.push(sun);
            this.days.push(moment(sun).add(1, "day"));
            this.days.push(moment(sun).add(2, "day"));
            this.days.push(moment(sun).add(3, "day"));
            this.days.push(moment(sun).add(4, "day"));
            this.days.push(moment(sun).add(5, "day"));
            this.days.push(moment(sun).add(6, "day"));
            console.log(this.days);
            console.log(moment(this.days[0]));
        }
    }
}
</script>

<style>

</style>