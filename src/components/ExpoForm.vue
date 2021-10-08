<template>
    <!-- SI YA CARGÓ LA EXPO O ESTÁS CREANDO UNA NUEVA -->
    <!-- RESIDEÑAR EL FORMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM QUE ALGUIEN HIZO MEDIO RARO XDDDDDDDDD NO VOY A DECIR KIEN ERES INGRID -->
    <template v-if="expo.name || !id">
        <div class="row">
            <form @submit.prevent="handleUpload" enctype="multipart/form-data"> 
                <div class="row">
                    <div class="col-md-4">
                        <!-- CARROUSEL -->
                        <input type="file" accept="image/*" name="files" id="files" @change="onFileChange" multiple required>
                    </div>
                    <div class="col-md-8">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="mb-3">
                                    <label for="name" class="form-label">Nombre de la exposición:</label>
                                    <input type="text" class="form-control" id="name" v-model="expo.name">
                                </div>
                                <div class="mb-3">
                                    <label for="author" class="form-label">Autor:</label>
                                    <input type="text" class="form-control" id="author" v-model="expo.author">
                                </div>
                                <div class="mb-3">
                                    <label for="startDate" class="form-label">Fecha de inicio:</label>
                                    <input type="text" class="form-control" id="startDate" v-model="expo.startDate" placeholder="Ex. 20 de Octubre de 2020">
                                </div>
                                <div class="mb-3">
                                    <label for="endDate" class="form-label">Fecha de conclusión:</label>
                                    <input type="text" class="form-control" id="endDate" v-model="expo.endDate" placeholder="Ex. 20 de Octubre de 2020">
                                </div>
                                <div class="mb-3">
                                    <label for="virtualTourURL" class="form-label">URL del tour virtual:</label>
                                    <input type="text" class="form-control" id="virtualTourURL" v-model="expo.virtualTourURL">
                                </div>
                                <div class="mb-3">
                                    <label for="audio" class="form-label">Audio:</label>
                                    <input type="text" class="form-control" id="audio">
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="mb-3">
                                    <label for="curatorship" class="form-label">Curadores:</label>
                                    <input type="text" class="form-control" id="curatorship" v-model="expo.curatorship">
                                </div>
                                <div class="mb-3">
                                    <label for="museography" class="form-label">Museografía:</label>
                                    <input type="text" class="form-control" id="museography" v-model="expo.museography">
                                </div>
                                <div class="mb-3">
                                    <label for="location" class="form-label">Ubicación:</label>
                                    <input type="text" class="form-control" id="location" v-model="expo.location">
                                </div>
                                <div class="mb-3">
                                    <label for="totalPieces" class="form-label">Total de piezas:</label>
                                    <input type="text" class="form-control" id="totalPieces" v-model="expo.totalPieces">
                                </div>
                                <div class="mb-3">
                                    <label for="authorCapsuleURL" class="form-label">URL de la cápsula del autor:</label>
                                    <input type="text" class="form-control" id="authorCapsuleURL" v-model="expo.authorCapsuleURL">
                                </div>
                                <div class="mb-3">
                                    <label for="technique" class="form-label">Técnica:</label>
                                    <input type="text" class="form-control" id="technique" v-model="expo.technique">
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <div class="mb-3">
                                    <label for="description" class="form-label">Descipción:</label>
                                    <textarea class="form-control" id="description" rows="5" v-model="expo.description"></textarea>
                                </div>  
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <div class="d-grid col-4 mx-auto">
                                    <button class="btn btn-success" type="submit">Guardar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>

        <!-- BUTTON TRIGGER MODAL -->
        <div class="d-grid gap-2 d-md-flex justify-content-md-end">
            <button type="button" :class="[isActive ? 'btn btn-success' : 'btn btn-primary']" @click="handleClick">
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
    <!-- SI NO HA CARGADO LA EXPO -->
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

class Expo {
        constructor(name, author, startDate, endDate, description, virtualTourURL, authorCapsuleURL, images, curatorship, museography, location, technique, totalPieces) {
            this.name = name;
            this.author = author;
            this.startDate = startDate;
            this.endDate = endDate;
            this.description = description;
            this.virtualTourURL = virtualTourURL;
            this.authorCapsuleURL = authorCapsuleURL
            this.images = images;
            this.curatorship = curatorship;
            this.museography = museography;
            this.location = location;
            this.technique = technique;
            this.totalPieces = totalPieces;
        }
    }

export default {
    props: ["id"],
    name: 'ExpoForm',
    data() {
        return {
            expo: new Expo(),
            editing: false,
            isActive: false,
            images: []
         }
    },
    created (){
        if(this.id){
            this.getExpo();
            this.editing = true;
        }
        else{
            this.isActive = true;
            this.editing = false;
        }
    },
    methods: {
        async getExpo(){
            const response = await fetch("https://api-marco.herokuapp.com/api/expos/" + this.id );
            const data = await response.json();
            this.expo = new Expo(
                data.name,
                data.author,
                data.startDate,
                data.endDate,
                data.description,
                data.virtualTourURL,
                data.authorCapsuleURL,
                data.images,
                data.curatorship,
                data.museography,
                data.location,
                data.technique,
                data.totalPieces
            );
        },
        deleteExpo(){
            this.expo = {deleted: true};
        },
        async handleUpload() {
                // POST 
                const formData = new FormData();
                for (const i of Object.keys(document.getElementById("files").files)) {
                    formData.append("files", document.getElementById("files").files[i]);
                }
                formData.append("name", this.expo.name);
                formData.append("author",this.expo.author);
                formData.append("startDate",this.expo.startDate);
                formData.append("endDate",this.expo.endDate);
                formData.append("description",this.expo.description);
                formData.append("virtualTourURL",this.expo.virtualTourURL);
                formData.append("authorCapsuleURL",this.expo.authorCapsuleURL);
                formData.append("curatorship",this.expo.curatorship);
                formData.append("museography",this.expo.museography);
                formData.append("location",this.expo.location);
                formData.append("technique",this.expo.technique);
                formData.append("totalPieces",this.expo.totalPieces);
                const requestOptions = {
                    method: "POST",
                    body: formData
                }
                const response = await fetch("https://api-marco.herokuapp.com/api/expos/", requestOptions);
                // const response = await fetch("http://localhost:3000/api/expos/", requestOptions);
                console.log(response);
            this.isActive = !this.isActive;
        },
        onFileChange(event) {
            var input = event.target;
            var count = input.files.length;
            var index = 0;
            if (input.files) {
                while(count--) {
                    var reader = new FileReader();
                    reader.onload = (e) => {
                        this.images.push(e.target.result);
                    }
                    reader.readAsDataURL(input.files[index]);
                    index++;
                }
            }
            console.log("imagenes cargadas")
            // this.expo.images = this.images;
        },
    },
}
</script>

<style>
.spinner-border {
    width: 50px; 
    height: 50px;
    /* color: #ec179b; */
}
</style>