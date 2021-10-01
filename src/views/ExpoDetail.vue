<template>
    <div class="container mt-5">
        <template v-if="expo !== null">
            {{expo}}
            <!-- BUTTON TRIGGER MODAL -->
            <button type="button" class="btn btn-danger" data-dismiss="modalDelete" data-bs-toggle="modal" data-bs-target="#modalDelete">
                Delete
            </button>
            <!-- MODAL -->
            <div class="modal fade" id="modalDelete" tabindex="-1" aria-labelledby="exampleModalCenterTitle" style="display: none;" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h6 class="modal-title" id="exampleModalCenterTitle">¿Estás seguro de que quieres eliminar {{expo.name}} de {{expo.author}}?</h6>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <p>Esta acción será permanente y no podrá revertirse.</p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-danger" data-bs-dismiss="modal" @click="deleteExpo">Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </template>
        <template v-else>
            <div class="row">
                <div class="d-flex justify-content-center align-items-center">
                    <div class="spinner-border" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>

<script>
export default {
    props: ["id"],
    data(){
        return {
            expo: null
        }
    },
    methods: {
        async getExpo(){
            const response = await fetch("https://api-marco.herokuapp.com/api/expos/" + this.id );
            const data = await response.json();
            this.expo = data;
        },
        deleteExpo(){
            this.expo = {deleted: true};
        }
    },
    created() {
        this.getExpo();
    }
}
</script>

<style scoped>
.spinner-border {
    width: 50px; 
    height: 50px;
    /* color: #ec179b; */
}
</style>