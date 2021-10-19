<template>
    <div id="background"></div>
    <div class="container px-5">
        <div v-if="error" class="alert alert-danger position-absolute start-50 translate-middle-x mt-3" style="width: 95%" role="alert">
            <i class="fas fa-exclamation-triangle me-3"></i>
            <strong>{{error}}</strong> 
        </div>
        <div class="row vh-100 align-items-center">
            <div class="col-lg-4 mx-auto">
                <div class="card bg-marco rounded-0 border-0">
                    <div class="card-header border-0 bg-marco pt-5">
                        <img src="logo_marco.png" style="width: 60%;" class="mb-3 d-block mx-auto" alt="">
                        <p class="text-center text-white" style="font-size: 1em;">#MuseoDeTodos</p>
                    </div>
                    <div class="card-body">
                        <form @submit.prevent="handleLogin">
                            <div class="row">
                                <div class="col-md-10 mx-auto">
                                    <div class="mb-4 text-center">
                                        <label for="exampleInputEmail1" class="form-label text-white">Email</label>
                                        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="form.email" required>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-10 mx-auto">
                                    <div class="mb-4 text-center">
                                        <label for="exampleInputPassword1" class="form-label text-white">Password</label>
                                        <input type="password" class="form-control" id="exampleInputPassword1" v-model="form.password" required>
                                    </div>
                                </div>
                            </div>
                            <div class="d-grid col-6 mx-auto mb-3">
                                <button type="submit" class="btn btn-primary mt-3">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            form: {
                email: '',
                password: ''
            },
            error: ''
        }
    },
    methods: {
        async handleLogin(){
            const requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(this.form)
            };
            const response = await fetch("http://100.24.228.237:10021/api/users/login/admin", requestOptions);
            const data = await response.json();
            if(data.token){
                localStorage.setItem("token", data.token);
                localStorage.setItem("id", data.user._id);
                localStorage.setItem("usertype", data.user.usertype);
                this.$router.push({ name: 'Home' });
            }
            else{
                this.form.password = '';
                this.error = data.message;
            }
        }
    }
}
</script>

<style scoped>

#background{
    background-image: url("../../public/fondo_marco.jpg");
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    position: fixed;
    width: 100%;
    height: 100%;
    filter: blur(8px);
    -webkit-filter: blur(8px);
    transform: scale(1.1); 
}

.bg-marco{
    background-color: #ec179b;
}

.btn-primary{
    background-color: #FFFFFF;
    border: #ec179b;
    color: #ec179b;
}

input:active, input:focus {
    box-shadow: 0 0 0 0.2rem #ec179b !important;
    outline: 0px !important;
    border-color: transparent !important;
}

button:active, button:focus {
    box-shadow: 0 0 0 0.2rem #ec179b !important;
    outline: 0px !important;
    border-color: transparent !important;
}
</style>