<template>
    <!-- SI YA CARGÓ LA EXPO O ESTÁS CREANDO UNA NUEVA -->
    <template v-if="expo.name || !id">
        <div class="row">
            <form @submit.prevent="handleUpload" enctype="multipart/form-data"> 
                <div class="row">
                    <div class="col-md-4">
                        <!-- IMAGEN DE PORTADA FROM NEW EXPO -->
                        <img v-if="coverImage || !isNewExpo" :src="coverImage" class="d-block w-100 mb-3" style="height: 15rem;">

                        <!-- INPUT FROM EXPO -->
                        <input v-if="isNewExpo" type="file" accept="image/*" class="form-control mb-3" name="file" id="file" @change="onFileChange" required :disabled="!isEditing">
                        <input v-else type="file" accept="image/*" class="form-control mb-3" name="file" id="file" @change="onFileChange" :disabled="!isEditing">
                        <p class="form-text mb-5">Esta será la imagen que aparecerá como portada de la exposición.</p>

                        <!-- CARROUSEL -->
                        <template v-if="images.length">
                            <div class="row mb-3">
                                <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
                                    <div class="carousel-inner">
                                        <!-- IF IMAGES FROM NEW EXPO -->
                                        <template v-if="images.length">
                                            <div v-for="(image, index) in images" :key="index"  class="carousel-item" :class="index === 0 ? 'active': ''">
                                                <img :src="image" class="d-block w-100" style="height:15rem;">
                                            </div>
                                        </template>
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
                        </template>
                        <input v-if="isNewExpo" type="file" accept="image/*" class="form-control mb-3" name="files" id="files" @change="onFileChange" multiple required :disabled="!isEditing">
                        <input v-else type="file" accept="image/*" class="form-control mb-3" name="files" id="files" @change="onFileChange" multiple :disabled="!isEditing">
                        <p class="form-text mb-5">Otras imágenes de la exposición.</p>
                    </div>
                    <div class="col-md-8">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="mb-3">
                                    <label for="name" class="form-label">Nombre de la exposición:</label>
                                    <input type="text" class="form-control" id="name" v-model="expo.name" :disabled="!isEditing">
                                </div>
                                <div class="mb-3">
                                    <label for="author" class="form-label">Autor:</label>
                                    <input type="text" class="form-control" id="author" v-model="expo.author" :disabled="!isEditing">
                                </div>
                                <div class="mb-3">
                                    <label for="startDate" class="form-label">Fecha de inicio:</label>
                                    <input type="text" class="form-control" id="startDate" v-model="expo.startDate" :disabled="!isEditing" placeholder="Ex. 20 de Octubre de 2020">
                                </div>
                                <div class="mb-3">
                                    <label for="endDate" class="form-label">Fecha de conclusión:</label>
                                    <input type="text" class="form-control" id="endDate" v-model="expo.endDate" :disabled="!isEditing" placeholder="Ex. 20 de Octubre de 2020">
                                </div>
                                <div class="mb-3">
                                    <label for="virtualTourURL" class="form-label">URL del tour virtual:</label>
                                    <input type="text" class="form-control" id="virtualTourURL" v-model="expo.virtualTourURL" :disabled="!isEditing">
                                </div>
                                <div class="mb-3">
                                    <label for="audio" class="form-label">Audio:</label>
                                    <input type="text" class="form-control" id="audio" :disabled="!isEditing">
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="mb-3">
                                    <label for="curatorship" class="form-label">Curadores:</label>
                                    <input type="text" class="form-control" id="curatorship" v-model="expo.curatorship" :disabled="!isEditing">
                                </div>
                                <div class="mb-3">
                                    <label for="museography" class="form-label">Museografía:</label>
                                    <input type="text" class="form-control" id="museography" v-model="expo.museography" :disabled="!isEditing">
                                </div>
                                <div class="mb-3">
                                    <label for="location" class="form-label">Ubicación:</label>
                                    <input type="text" class="form-control" id="location" v-model="expo.location" :disabled="!isEditing">
                                </div>
                                <div class="mb-3">
                                    <label for="totalPieces" class="form-label">Total de piezas:</label>
                                    <input type="text" class="form-control" id="totalPieces" v-model="expo.totalPieces" :disabled="!isEditing">
                                </div>
                                <div class="mb-3">
                                    <label for="authorCapsuleURL" class="form-label">URL de la cápsula del autor:</label>
                                    <input type="text" class="form-control" id="authorCapsuleURL" v-model="expo.authorCapsuleURL" :disabled="!isEditing">
                                </div>
                                <div class="mb-3">
                                    <label for="technique" class="form-label">Técnica:</label>
                                    <input type="text" class="form-control" id="technique" v-model="expo.technique" :disabled="!isEditing">
                                </div>
                            </div>
                        </div>
                        <div class="row mb-1">
                            <div class="col-md-12">
                                <div class="mb-3">
                                    <label for="description" class="form-label">Descripción:</label>
                                    <textarea class="form-control" id="description" rows="5" v-model="expo.description" :disabled="!isEditing"></textarea>
                                </div>  
                            </div>
                        </div>
                        <div class="row mb-5">
                            <div class="col-md-12">
                                <!-- BOTONES -->
                                <!-- SI ES NUEVA EXPO -->
                                <template v-if="!id">
                                    <div class="d-grid col-4 mx-auto">
                                        <button class="btn btn-success" type="submit">Guardar</button>
                                    </div>
                                </template>
                                <!-- SI YA EXISTE LA EXPO -->
                                <template v-else-if="expo.name">
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
    // FALTA CAMBIAR LOGICA DEL CARROUSEL 
    props: ["id"],
    name: 'ExpoForm',
    data() {
        return {
            expo: new Expo(),
            isNewExpo: true,
            isEditing: true,
            coverImage: "",
            images: []
        }
    },
    created (){
        if(this.id){
            this.getExpo();
            this.isNewExpo = false;
            this.isEditing = false;
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
            this.coverImage = this.expo.images[0];
            this.images = [];
            for(let i = 1; i < this.expo.images.length; i++){
                this.images.push(this.expo.images[i]);
            }
        },
        async deleteExpo(){
            const requestOptions = {
                method: "DELETE"
            }
            // await fetch("https://api-marco.herokuapp.com/api/expos/" + this.id, requestOptions);
            await fetch("http://localhost:3000/api/expos/" + this.id, requestOptions);
            this.$router.push({ name: "Expos" });
        },
        handleClickToggle(){
            if(this.isEditing){
                this.getExpo();
            }
            this.handleToggle();
            document.getElementById("files").value = "";
            document.getElementById("file").value = "";
        },
        async handleUpload() {
            const formData = new FormData();

            if(!this.isNewExpo){
                if(this.coverImage === this.expo.images[0]){
                    formData.append("coverImage", this.coverImage);
                }
                else{
                    formData.append("files", document.getElementById("file").files[0]);
                }

                const expoImages = this.expo.images;
                expoImages.shift();
                if(this.images[0] === expoImages[0]){
                    console.log("images y expo images son la misma");
                    for (var i = 0; i < this.images.length; i++) {
                        formData.append('otherImages[]', this.images[i]);
                        console.log(this.images[i]);
                    }
                }
                else{
                    for (const i of Object.keys(document.getElementById("files").files)) {
                        formData.append("files", document.getElementById("files").files[i]);
                    }
                }
            }
            else{
                formData.append("files", document.getElementById("file").files[0]);
                for (const i of Object.keys(document.getElementById("files").files)) {
                    formData.append("files", document.getElementById("files").files[i]);
                }
            }

            formData.append("name", this.expo.name);
            formData.append("author",this.expo.author);
            formData.append("startDate", this.expo.startDate);
            formData.append("endDate", this.expo.endDate);
            formData.append("description", this.expo.description);
            formData.append("virtualTourURL", this.expo.virtualTourURL);
            formData.append("authorCapsuleURL", this.expo.authorCapsuleURL);
            formData.append("curatorship", this.expo.curatorship);
            formData.append("museography", this.expo.museography);
            formData.append("location", this.expo.location);
            formData.append("technique", this.expo.technique);
            formData.append("totalPieces", this.expo.totalPieces);

            const requestOptions = {
                method: this.isNewExpo ? "POST" : "PUT",
                body: formData
            }
            if(this.isNewExpo){
                // const response = await fetch("https://api-marco.herokuapp.com/api/expos/", requestOptions);
                await fetch("http://localhost:3000/api/expos/", requestOptions);
            }
            else{
                // const response = await fetch("https://api-marco.herokuapp.com/api/expos/", requestOptions);
                await fetch("http://localhost:3000/api/expos/" + this.id, requestOptions);
            }
            // this.$router.push({ name: "Expos" });
        },
        handleToggle(){
            this.isEditing = !this.isEditing;
        },
        onFileChange(event) {
            var input = event.target;
            var count = input.files.length;
            var index = 0;
            var reader;

            if(input.name === "file"){
                reader = new FileReader();
                this.coverImage = event.target.result;
                reader.onload = (e) => {
                    this.coverImage = e.target.result;
                }
                reader.readAsDataURL(input.files[index]);
                index++;
            }
            else if(input.name === "files"){
                this.images = [];
                while(count--) {
                    reader = new FileReader();
                    reader.onload = (e) => {
                        this.images.push(e.target.result);
                    }
                    reader.readAsDataURL(input.files[index]);
                    index++;
                }
            }
        }
    },
    computed:{
        getOtherImages(){
            if(this.isNewExpo){
                return this.images.filter((image, index) => index > 0);
            }
            else{
                if(this.images.length <= 1){
                    return this.expo.images.filter((image, index) => index > 0);
                }
                else{
                    return this.images.filter((image, index) => index > 0);
                }
            }
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

/* 
coverImage
images

if new expo
coverImage = file
images = files

on create
append file and files


else
coverImage = expo.images[0];
images = expo.images[1,n];

update
si cambia la foto de portada

si no cambia la foto de portada

si cambia las demás fotos

si no cambia las demás fotos




*/
</style>
