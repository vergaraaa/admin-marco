
<template>
    <div class="container">
        <h3>Bienvenido como te llames</h3>
        <h1 class="font-weight-bold">#MuseoDeTodos</h1>
        <div class="row">
            <div class="col-5">
                <img src="fondo_marco.jpg" class="img-fluid p-3">
                <div class="d-grid gap-4">
                    <router-link class="btn btn-dark p-3 m-1 bg-marco" :to="{ name: 'Collaborators' }" role="button" >Administrar colaboradores</router-link>
                    <router-link class="btn btn-dark p-3 m-1 bg-marco" :to="{ name: 'Expos' }" role="button">Administrar exposiciones</router-link>
                </div>
            </div>
            <div class="col-7">
                <h2 class="text-center">Exposiciones del mes</h2>
                <div class="row px-4 pb-4 bg-marco">
                        <h3 class="text-center" style="color: white;"> MES </h3>
                        <div class="col align-self-center" style="background: white;">
                            <h5 class="text-center"> expo numero xD</h5>
                            <h5 class="text-center"> expo numero xD</h5>
                            <h5 class="text-center"> expo numero xD</h5>
                            <h5 class="text-center"> expo numero xD</h5>
                            <h5 class="text-center"> expo numero xD</h5>
                        </div>
                </div>
                <div class="row pt-5">
                        <h3 class="text-center"> Menú de la semana: </h3>
                        <input class="form-control" id="linkRestaurante" placeholder="menu.url????">
                </div>
            </div>
        </div>      
    </div>
</template>

<script>
export default {
    name: 'Home'  
}
</script>

<style>
.bg-marco{
    background-color: #ec179b;
}
</style>

