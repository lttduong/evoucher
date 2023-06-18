<template>
    <!-- Table Start -->
<div class="container-fluid pt-4 px-4" id="partner-tbl">
    <div class="row g-4">
        <div class="col-12">
            <div class="bg-light rounded h-100 p-4">
                <h6 class="mb-4 title">User
                    <a href="/users/add" class="btn btn-square btn-outline-success m-2 btn-add">
                        <i class="fa fa-plus"></i>
                    </a>
                </h6>
                <div class="table-responsive">
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">First Name</th>
                                <th scope="col">Last Name</th>
                                <th scope="col">User name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Password</th>
                                <th scope="col">Address</th>
                                <th scope="col">Role</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="user in data.users">
                                <th scope="row">{{ user.id }}</th>
                                <td>{{ user.firstName }}</td>
                                <td>{{ user.lastName }}</td>
                                <td>{{ user.username }}</td>
                                <td>{{ user.email }}</td>
                                <td>{{ user.password }}</td>
                                <td>{{ user.address }}</td>
                                <td>{{ parseRole(user.roleId, data.roles) }}</td>
                                <td>
                                    <div class="bg-light rounded">
                                        <div class="btn-group" role="group">
                                            <a @click="deleteUser('/users/delete/'+user.id)" class="btn btn-danger">Delete</a>
                                            <a :href="'/users/edit/'+user.id" class="btn btn-primary">Update</a>
                                            <a :href="'/users/delete/'+user.id" class="btn btn-info">View</a>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- Table End -->
</template>

<script>
import axios from 'axios';
    export default {
        props: ['data'],
        methods: {
            parseRole(roleId, roles) {
                if(roleId === null) return '-';
                let tmp = roles.find((item)=>item.id == roleId)
                return tmp.name ? tmp.name : '-';
            },
            deleteUser(url) {
                axios.get(url).then(response => {
                    alert(response.data.message)
                    window.location.reload();
                });
            }
        }
    }
</script>