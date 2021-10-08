<template>
    <div class="container">
        <h1>colaboradores</h1>
        <button :class="[isActive ? 'btn btn-success' : 'btn btn-primary']" color="[isActive ? 'green' : 'blue']" @click="toggle">
          {{isActive ? 'Es puto' : 'Edgar'}}
        </button>
        <div class="row">
            <div class="col-md-5">
                <div class="row px-4 pb-4 bg-marco">
                        <h3 class="text-center" style="color: white;"> Colaboradores activos </h3>
                        <div class="col align-self-center" style="background: white;">
                            <h5 class="text-center"> expo numero xD</h5>
                            <h5 class="text-center"> expo numero xD</h5>
                            <h5 class="text-center"> expo numero xD</h5>
                            <h5 class="text-center"> expo numero xD</h5>
                            <h5 class="text-center"> expo numero xD</h5>
                        </div>
                </div>
            </div>
            <div class="col-md-5 offset-md-2">
                <div class="row px-4 pb-4 bg-marco">
                        <h3 class="text-center" style="color: white;"> Registro de colaboradores </h3>
                        <div class="col align-self-center" style="background: white;">
                            <h5 class="text-center"> expo numero xD</h5>
                            <h5 class="text-center"> expo numero xD</h5>
                            <h5 class="text-center"> expo numero xD</h5>
                            <h5 class="text-center"> expo numero xD</h5>
                            <h5 class="text-center"> expo numero xD</h5>
                        </div>
                </div>
            </div>
        </div> 
    </div>
</template>

<script>
export default {
  data() {
    return {
      isActive: false,
    };
  },
  methods: {
    toggle() {
        this.isActive = !this.isActive;
    },
  },
};
</script>