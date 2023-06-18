<template>
<!-- Sign Up Start -->
<div class="container-fluid">
    <div class="row h-100 align-items-center justify-content-center" style="min-height: 100vh;">
        <div class="col-12 col-sm-8 col-md-6 col-lg-6 col-xl-6">
            <div class="bg-light rounded p-4 p-sm-5 my-4 mx-3">
                <div class="d-flex align-items-center justify-content-between mb-3">
                    <a href="/" class="">
                        <h3 class="text-primary"><i class="fa fa-hashtag me-2"></i>E-VOUCHER</h3>
                    </a>
                    <h3>Sign Up</h3>
                </div>
                <div class="form-floating mb-4">
                    <input v-model="dataPost.firstName" type="text" class="form-control" id="firstNameInput" placeholder="jhondoe">
                    <label for="firstNameInput">First Name</label>
                </div>
                <div class="form-floating mb-3">
                    <input v-model="dataPost.lastName" type="text" class="form-control" id="lastNameInput" placeholder="jhondoe">
                    <label for="lastNameInput">Last Name</label>
                </div>
                <div class="form-floating mb-3">
                    <input v-model="dataPost.userName" type="text" class="form-control" id="userNameInput" placeholder="jhondoe">
                    <label for="userNameInput">Username</label>
                </div>
                <div class="form-floating mb-3">
                    <input v-model="dataPost.email" type="text" class="form-control" id="emailInput" placeholder="name@example.com">
                    <label for="emailInput">Email address</label>
                </div>
                <div class="form-floating mb-3">
                    <input v-model="dataPost.birthday" type="date" class="form-control" id="birthdayInput" placeholder="0/0/2000">
                    <label for="birthdayInput">BirthDay</label>
                </div>
                <div class="form-floating mb-3">
                    <input v-model="dataPost.address" type="text" class="form-control" id="address">
                    <label for="address">Address</label>
                </div>
                <div class="form-floating mb-4">
                    <input v-model="dataPost.password" type="password" class="form-control" id="passwordInput" placeholder="Password">
                    <label for="passwordInput">Password</label>
                </div>
                <div class="form-floating mb-4">
                    <input v-model="dataPost.password2" type="password" class="form-control" id="password2Input" placeholder="Confirm Password">
                    <label for="passwordComfirmInput">ConfirmPassword</label>
                </div>
                <div class="d-flex align-items-center justify-content-between mb-4">
                    <div class="form-check">
                        <input type="checkbox" class="form-check-input" id="exampleCheck1">
                        <label class="form-check-label" for="exampleCheck1">Check me out</label>
                    </div>
                    <a href="">Forgot Password</a>
                </div>
                <button @click="postData(event)" type="submit" class="btn btn-primary py-3 w-100 mb-4">Sign Up</button>
                <p class="text-center mb-0">Already have an Account? <a href="">Sign In</a></p>
            </div>
        </div>
    </div>
</div>
<!-- Sign Up End -->
</template>
<script>
import axios from 'axios';
    export default {
        data() {
            return {
                dataPost: {
                    firstName: '',
                    lastName: '',
                    username: '',
                    email: '',
                    password: '',
                    role: '',
                    birthday: '',
                    address: '',
                    password2: ''
                }
            }
        },
        methods: {
            postData(event) {
                event.preventDefault();
                axios.post(`/auth/register`, this.dataPost).then(response => {
                    window.location.href = '/';
                });
            }
        }
    }
    
</script>