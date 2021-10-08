<template v-if="expo !== null">
            <!--FORMSSSSS -->
            <form>
                <fieldset >
                    <legend>{{expo.name}}</legend>
                    <div class="row">
                        <div class="col-md-4"> 
                            <!-- CARROUSEL -->
                            <div class="row">
                                <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
                                    <div class="carousel-inner">
                                        <div v-for="(image, index) in expo.images" :key="index"  class="carousel-item" :class="index === 0 ? 'active': ''">
                                            <img :src="image" class="d-block w-100" style="height:20%;" alt="...">
                                        </div>
                                    </div>
                                    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                        <span class="visually-hidden">Previous</span>
                                    </button>
                                    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                        <span class="visually-hidden">Next</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-8">
                            <div class="row">
                                <div class="col-sm">
                                    <div class="mb-3">
                                        <label for="disabledTextInput" class="form-label">Nombre de la exposición:</label>
                                        <input type="text" id="disabledTextInput" class="form-control" :disabled="!isActive" :value="expo.name">
                                    </div>
                                    <div class="mb-3">
                                        <label for="disabledTextInput" class="form-label">Autor:</label>
                                        <input type="text" id="disabledTextInput" class="form-control" :disabled="!isActive" :value="expo.author">
                                    </div>
                                    <div class="mb-3">
                                        <label for="disabledTextInput" class="form-label">Fecha de inicio: Ex. "20 de Octubre de 2020"</label>
                                        <input type="text" id="disabledTextInput" class="form-control" :disabled="!isActive" :value="expo.startDate">
                                    </div>
                                    <div class="mb-3">
                                        <label for="disabledTextInput" class="form-label">Fecha de conclusión: Ex. "20 de Octubre de 2020"</label>
                                        <input type="text" id="disabledTextInput" class="form-control" :disabled="!isActive" :value="expo.endDate">
                                    </div>
                                    <div class="mb-3">
                                        <label for="disabledTextInput" class="form-label">URL del tour virtual:</label>
                                        <input type="text" id="disabledTextInput" class="form-control" :disabled="!isActive" :value="expo.virtualTourURL">
                                    </div>                                    
                                </div>
                                <div class="col-sm">
                                    <div class="mb-3">
                                        <label for="disabledTextInput" class="form-label">Curadores:</label>
                                        <input type="text" id="disabledTextInput" class="form-control" :disabled="!isActive" :value="expo.curatorship">
                                    </div>
                                    <div class="mb-3">
                                        <label for="disabledTextInput" class="form-label">Museografía:</label>
                                        <input type="text" id="disabledTextInput" class="form-control" :disabled="!isActive" :value="expo.museography">
                                    </div>
                                    <div class="mb-3">
                                        <label for="disabledTextInput" class="form-label">Ubicación:</label>
                                        <input type="text" id="disabledTextInput" class="form-control" :disabled="!isActive" :value="expo.location">
                                    </div>
                                    <div class="mb-3">
                                        <label for="disabledTextInput" class="form-label">Total de piezas:</label>
                                        <input type="text" id="disabledTextInput" class="form-control" :disabled="!isActive" :value="expo.totalPieces">
                                    </div>
                                    <div class="mb-3">
                                        <label for="disabledTextInput" class="form-label">URL de la cápsula del autor:</label>
                                        <input type="text" id="disabledTextInput" class="form-control" :disabled="!isActive" :value="expo.authorCapsuleURL">
                                    </div>
                                    <div class="mb-3">
                                        <label for="disabledTextInput" class="form-label">Técnica:</label>
                                        <input type="text" id="disabledTextInput" class="form-control" :disabled="!isActive" :value="expo.technique">
                                    </div>                                    
                                </div>
                            </div>
                            <div class="row">
                                <div class="mb-3">
                                    <label for="disabledTextInput" class="form-label">Descipción:</label>
                                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="5" :disabled="!isActive" :value="expo.description"></textarea>
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