<template>
    <!-- Table Start -->
<div class="container-fluid pt-4 px-4" id="user-tbl">
    <div class="bg-light rounded h-100 p-4">
        <h6 class="mb-4">Add User</h6>
        <form>
            <div class="mb-3 row">
                <div class="col-12 col-xl-6">
                    <label for="firstNameInput" class="form-label">First name</label>
                    <input v-model="dataPost.firstName" type="firstName" class="form-control" id="firstNameInput" required>
                </div>
                <div class="col-12 col-xl-6">
                    <label for="lastNameInput" class="form-label">Last name</label>
                    <input v-model="dataPost.lastName" type="lastName" class="form-control" id="lastNameInput" required>
                </div>
            </div>
            <div class="mb-3">
                <label for="userNameInput" class="form-label">User name</label>
                <input v-model="dataPost.userName" type="userName" class="form-control" id="userNameInput" required>
            </div>
            <div class="mb-3">
                <label for="emailInput" class="form-label">Email address</label>
                <input v-model="dataPost.email" type="email" class="form-control" id="emailInput" required>
            </div>
            <div class="mb-3">
                <label for="birthdayInput" class="form-label">Birthday</label>
                <input v-model="dataPost.birthday" type="datetime-local" class="form-control" id="birthdayInput" required>
            </div>
            <div>
                <label for="address" class="form-label">Address</label>
                <input v-model="dataPost.address" type="text" class="form-control" id="address" required>
            </div>
            <div class="mb-3">
                <label for="passwordInput" class="form-label">Password</label>
                <input v-model="dataPost.password" type="password" class="form-control" id="passwordInput" required>
            </div>
            <div class="mb-3">
                <label for="roleSelect" class="form-label">Role</label>
                <select v-model="dataPost.role" class="form-select form-select-sm mb-3" id="roleSelect" required>
                    <option>Open this select menu</option>
                    <option v-for="role in data.roles" :value="role.id">{{role.name}}</option>
                </select>
            </div>
            
            <button @click="postData(event)" class="btn btn-primary">{{ this.data.user ? 'Update' : 'Add' }}</button>
        </form>
    </div>
</div>
<!-- Table End -->
</template>
<script>
import axios from 'axios';
    export default {
        props: ['data'],
        data() {
            return {
                dataPost: {
                    firstName: '',
                    lastName: '',
                    userName: '',
                    email: '',
                    password: '',
                    role: '',
                    birthday: '',
                    address: ''
                }
            }
        },
        mounted() {
            this.dataPost.firstName = this.data.user.firstName ? this.data.user.firstName : this.dataPost.firstName;
            this.dataPost.lastName = this.data.user.lastName ? this.data.user.lastName : this.dataPost.lastName;
            this.dataPost.userName = this.data.user.username ? this.data.user.username : this.dataPost.userName;
            this.dataPost.email = this.data.user.email ? this.data.user.email : this.dataPost.email;
            this.dataPost.password = this.data.user.password ? this.data.user.password : this.dataPost.password;
            this.dataPost.role = this.data.user.role ? this.data.user.role : this.dataPost.role;
            this.dataPost.birthday = this.data.user.birthDay ? this.data.user.birthDay.slice(0, -5) : this.dataPost.birthday;
            this.dataPost.address = this.data.user.address ? this.data.user.address : this.dataPost.address;
            this.dataPost.role = this.data.user.roleId ? this.data.user.roleId : this.dataPost.role
        },
        methods: {
            
            postData(event) {
                event.preventDefault();
                if(this.data.user) {
                    axios.post(`/users/update/${this.data.user.id}`, this.dataPost).then(response => {
                        alert(response.data.message)
                        if(response.data.status === 200) window.location.href = '/users';
                    }); 
                } else {
                    axios.post(`/users/add`, this.dataPost).then(response => {
                        alert(response.data.message)
                        if(response.data.status === 200) window.location.href = '/users';
                    });
                }
                
            }
        }
    }
    
</script>