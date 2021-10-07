<template>
    <div class="container">
        <h1>colaboradores</h1>
        <button :class="[isActive ? 'btn btn-success' : 'btn btn-primary']" color="[isActive ? 'green' : 'blue']" @click="toggle">
          {{isActive ? 'Es puto' : 'Edgar'}}
        </button>
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