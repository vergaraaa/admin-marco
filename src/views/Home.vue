<template>
    <div class="container" style="background: #F4EDE7">
        <h3>Bienvenido como te llames</h3>
        <h1 class="font-weight-bold">#MuseoDeTodos</h1>
        <div class="row">
            <div class="col-4">
                <img src="logo.png" class="img-fluid">
                <div class="d-grid gap-2">
                    <a class="btn btn-dark" href="http://localhost:8080/about" role="button" >Administrar colaboradores</a>
                    <a class="btn btn-dark" href="http://localhost:8080/expos" role="button">Administrar exposiciones</a>
                </div>
            </div>
            <div class="col-8" style="background: red;">
                <h2 class="text-center">Exposiciones del mes</h2>
                <div class="row-2" style="background: pink;">
                        <h3 class="text-center"> MES </h3>
                        <div class="row-2" style="background: white;">
                            <h3 class="text-center"> expo numero xD</h3>
                        </div>
                </div>
                <div class="row" style="background: green;" >
                        <h3 class="text-center"> Menú de la semana: </h3>
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
