<template>
    <div class="container mt-5">
        <template v-if="expo !== null">
            {{expo}}
            <!--FORMSSSSS -->
            <form>
                <fieldset disabled>
                    <legend>NombreExpo</legend>
                    <div class="row">
                        <div class="col-sm-4"> 
                            Aqui van las fotos
                        </div>
                        <div class="col-sm-8">
                            <div class="row">
                                <div class="col-sm">
                                    <div class="mb-3">
                                        <label for="disabledTextInput" class="form-label">Nombre de la exposición:</label>
                                        <input type="text" id="disabledTextInput" class="form-control" placeholder= expo.name>
                                    </div>
                                    <div class="mb-3">
                                        <label for="disabledTextInput" class="form-label">Autor:</label>
                                        <input type="text" id="disabledTextInput" class="form-control" placeholder="expo.author">
                                    </div>
                                    <div class="mb-3">
                                        <label for="disabledTextInput" class="form-label">Fecha de inicio: Ex. "20 de Octubre de 2020"</label>
                                        <input type="text" id="disabledTextInput" class="form-control" placeholder="expo.startDate">
                                    </div>
                                    <div class="mb-3">
                                        <label for="disabledTextInput" class="form-label">Fecha de conclusión: Ex. "20 de Octubre de 2020"</label>
                                        <input type="text" id="disabledTextInput" class="form-control" placeholder="expo.endDate">
                                    </div>
                                    <div class="mb-3">
                                        <label for="disabledTextInput" class="form-label">URL del tour virtual:</label>
                                        <input type="text" id="disabledTextInput" class="form-control" placeholder="expo.virtualTourURL">
                                    </div>                                    
                                </div>
                                <div class="col-sm">
                                    
                                    <div class="mb-3">
                                        <label for="disabledTextInput" class="form-label">Curadores:</label>
                                        <input type="text" id="disabledTextInput" class="form-control" placeholder="expo.curatorship">
                                    </div>
                                    <div class="mb-3">
                                        <label for="disabledTextInput" class="form-label">Museografía:</label>
                                        <input type="text" id="disabledTextInput" class="form-control" placeholder="expo.museography">
                                    </div>
                                    <div class="mb-3">
                                        <label for="disabledTextInput" class="form-label">Ubicación:</label>
                                        <input type="text" id="disabledTextInput" class="form-control" placeholder="expo.location">
                                    </div>
                                    <div class="mb-3">
                                        <label for="disabledTextInput" class="form-label">Total de piezas:</label>
                                        <input type="text" id="disabledTextInput" class="form-control" placeholder="expo.totalPieces">
                                    </div>
                                    <div class="mb-3">
                                        <label for="disabledTextInput" class="form-label">URL de la cápsula del autor:</label>
                                        <input type="text" id="disabledTextInput" class="form-control" placeholder="expo.authorCapsuleURL">
                                    </div>
                                    <div class="mb-3">
                                        <label for="disabledTextInput" class="form-label">Técnica:</label>
                                        <input type="text" id="disabledTextInput" class="form-control" placeholder= {{expo.technique}}>
                                    </div>                                    
                                </div>
                            </div>
                            <div class="row">
                                <div class="mb-3">
                                    <label for="disabledTextInput" class="form-label">Descipción:</label>
                                     <textarea class="form-control" id="exampleFormControlTextarea1" rows="5" placeholder= expo.description></textarea>
                                </div>                                
                            </div>  
                        </div>
                    </div>                
                </fieldset>
            </form>


            <!-- BUTTON TRIGGER MODAL -->
            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                <button type="button" :class="[isActive ? 'btn btn-success' : 'btn btn-primary']" @click="toggle">
                    {{isActive ? 'Guardar' : 'Editar'}}
                </button>
                <button type="button" class="btn btn-danger" data-dismiss="modalDelete" data-bs-toggle="modal" data-bs-target="#modalDelete">
                    Delete
                </button>
            </div>
            
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
            <div class="modal fade" id="modalEdit" tabindex="-1" aria-labelledby="exampleModalCenterTitle" style="display: none;" aria-hidden="true">
            </div>
            <div class="modal fade" id="modalSave" tabindex="-1" aria-labelledby="exampleModalCenterTitle" style="display: none;" aria-hidden="true">
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
            isActive: false,
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
        },
        toggle() {
            this.isActive = !this.isActive;
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