<template>
    <!-- SI YA CARGÓ LA ACTIVIDAD O ESTÁS CREANDO UNA NUEVA -->
    <template v-if="acti.name || !id">
        <div class="row">
            <form @submit.prevent="handleUpload" enctype="multipart/form-data"> 
                <div class="row">
                    <div class="col-md-4">
                        <!-- IMAGEN DE PORTADA FROM NEW ACTIVITY -->
                        <img v-if="coverImage || !isNewActivity" :src="coverImage" class="d-block w-100 mb-3" style="height: 15rem;">

                        <!-- INPUT FROM ACTIVITY -->
                        <input v-if="isNewActivity" type="file" accept="image/*" class="form-control mb-3" name="files" id="files" @change="onFileChange" required :disabled="!isEditing">
                        <input v-else type="file" accept="image/*" class="form-control mb-3" name="files" id="files" @change="onFileChange" :disabled="!isEditing">
                        <p class="form-text mb-5">Esta será la imagen que aparecerá como portada de la actividad.</p>
                    </div>

                    <div class="col-md-8">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="mb-3">
                                    <label for="name" class="form-label">Nombre de la actividad:</label>
                                    <input type="text" class="form-control" id="name" v-model="acti.name" :disabled="!isEditing" required>
                                </div>
                                <div class="mb-3">
                                    <label for="author" class="form-label">Impartidor:</label>
                                    <input type="text" class="form-control" id="author" v-model="acti.author" :disabled="!isEditing" required>
                                </div>
                                <div class="mb-3">
                                    <label for="startDate" class="form-label">Fecha de inicio:</label>
                                    <input type="text" class="form-control" id="startDate" v-model="acti.startDate" :disabled="!isEditing" required placeholder="Ex. 13 Ene 2021">
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="mb-3">
                                    <label for="organizer" class="form-label">Organizador:</label>
                                    <input type="text" class="form-control" id="organizer" v-model="acti.organizer" :disabled="!isEditing" required>
                                </div>
                                <div class="mb-3">
                                    <label for="hour" class="form-label">Hora de inicio:</label>
                                    <input type="text" class="form-control" id="hour" v-model="acti.hour" :disabled="!isEditing" required>
                                </div>
                                <div class="mb-3">
                                    <label for="location" class="form-label">Ubicación:</label>
                                    <input type="text" class="form-control" id="location" v-model="acti.location" :disabled="!isEditing" required>
                                </div>
                            </div>
                        </div>
                        <div class="row mb-1">
                            <div class="col-md-12">
                                <div class="mb-3">
                                    <label for="description" class="form-label">Descripción:</label>
                                    <textarea class="form-control" id="description" rows="5" v-model="acti.description" :disabled="!isEditing" required></textarea>
                                </div>  
                            </div>
                        </div>
                        <div class="row mb-5">
                            <div class="col-md-12">
                                <!-- BOTONES -->
                                <!-- SI ES NUEVA ACTIVIDAD -->
                                <template v-if="!id">
                                    <div class="d-grid col-4 mx-auto">
                                        <button class="btn btn-success" type="submit">Guardar</button>
                                    </div>
                                </template>
                                <!-- SI YA EXISTE LA ACTIVIDAD -->
                                <template v-else-if="acti.name">
                                    <div class="d-grid gap-2 d-md-flex justify-content-md-center">
                                        <button v-if="isEditing" type="submit" class="btn btn-success px-5">
                                            Guardar 
                                        </button>
                                        <button v-else type="submit" class="btn btn-primary px-5" @click="handleClickToggle">
                                            Editar
                                        </button>
                                        <!-- BUTTON TRIGGER MODAL -->
                                        <button v-if="isEditing" type="button" class="btn btn-danger px-5" @click="handleClickToggle">
                                            Cancelar
                                        </button>
                                        <button v-else type="button" class="btn btn-danger px-5" data-dismiss="modalDelete" data-bs-toggle="modal" data-bs-target="#modalDelete">
                                            Eliminar
                                        </button>
                                    </div>
                                </template>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
            
        <!-- MODAL -->
        <div class="modal fade" id="modalDelete" tabindex="-1" aria-labelledby="exampleModalCenterTitle" style="display: none;" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h6 class="modal-title" id="exampleModalCenterTitle">¿Estás seguro de que quieres eliminar {{acti.name}} de {{acti.author}}?</h6>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <p>Esta acción será permanente y no podrá revertirse.</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal" @click="deleteActi">Delete</button>
                    </div>
                </div>
            </div>
        </div>
    </template>
    <!-- SI NO HA CARGADO LA ACTIVIDAD -->
    <template v-else>
        <div class="row">
            <div class="d-flex justify-content-center align-items-center">
                <div class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
        </div>
    </template>
</template>

<script>

class Acti {
        constructor(name, author, startDate, description, image, hour, location, organizer) {
            this.name = name;
            this.author = author;
            this.startDate = startDate;
            this.description = description;
            this.image = image;
            this.hour = hour;
            this.location = location;
            this.organizer = organizer;
        }
    }

export default {
    props: ["id"],
    name: 'ActivitiesForm',
    data() {
        return {
            acti: new Acti(),
            isNewActivity: true,
            isEditing: true,
            coverImage: "",
        }
    },
    created (){
        if(this.id){
            this.getActi();
            this.isNewActivity = false;
            this.isEditing = false;
        }
    },
    methods: {
        async getActi(){
            //Fetch de donde
            const response = await fetch("http://100.24.228.237:10021/api/activities/" + this.id );
            const data = await response.json();
            this.acti = new Acti(
                data.name,
                data.author,
                data.startDate,
                data.description,
                data.image,
                data.hour,
                data.location,
                data.organizer,
            );
            this.coverImage = data.image;
        },
        async deleteActi(){
            const requestOptions = {
                method: "DELETE"
            }
            await fetch("http://100.24.228.237:10021/api/activities/" + this.id, requestOptions);
            this.$router.push({ name: "Activities" });
        },
        handleClickToggle(){
            if(this.isEditing){
                this.getActi();
            }
            this.handleToggle();
            document.getElementById("files").value = "";
        },
        async handleUpload() {
            const formData = new FormData();

            if(!this.isNewActivity){
                if(this.coverImage === this.acti.image){
                    formData.append("coverImage", this.coverImage);
                }
                else{
                    formData.append("files", document.getElementById("files").files[0])
                }
            }
            else{
                formData.append("files", document.getElementById("files").files[0])    
            }

            formData.append("name", this.acti.name);
            formData.append("author",this.acti.author);
            formData.append("startDate", this.acti.startDate);
            formData.append("description", this.acti.description);
            formData.append("hour", this.acti.hour);
            formData.append("location", this.acti.location);
            formData.append("organizer", this.acti.organizer);

            const requestOptions = {
                method: this.isNewActivity ? "POST" : "PUT",
                body: formData
            }
            if(this.isNewActivity){
                await fetch("http://100.24.228.237:10021/api/activities/", requestOptions);
            }
            else{
                await fetch("http://100.24.228.237:10021/api/activities/" + this.id, requestOptions);
            }
            this.$router.push({ name: "Activities" });
        },
        handleToggle(){
            this.isEditing = !this.isEditing;
        },
        onFileChange(event) {
            var input = event.target;
            var index = 0;
            var reader = new FileReader();
            reader.onload = (e) => {
                this.coverImage = e.target.result;
            }
            reader.readAsDataURL(input.files[index]);
            index++;
        }
    }
}
</script>

<style>
.spinner-border {
    width: 50px; 
    height: 50px;
    /* color: #ec179b; */
}


</style>
