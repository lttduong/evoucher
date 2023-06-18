<template>
    <!-- Table Start -->
<div class="container-fluid pt-4 px-4" id="partner-tbl">
    <div class="row g-4">
        <div class="col-12">
            <div class="bg-light rounded h-100 p-4">
                <h6 class="mb-4 title">Partner
                    <a href="/partners/add" class="btn btn-square btn-outline-success m-2 btn-add">
                        <i class="fa fa-plus"></i>
                    </a>
                </h6>
                <div class="table-responsive">
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Company Name</th>
                                <th scope="col">Website</th>
                                <th scope="col">User</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in data.partner">
                                <th scope="row">{{ item.id }}</th>
                                <td>{{ item.companyName }}</td>
                                <td>{{ item.website }}</td>
                                <td>{{ item.userId }}</td>
                                <td>
                                    <div class="bg-light rounded">
                                        <div class="btn-group" role="group">
                                            <a @click="deletePartner(`/partners/delete/${item.id}`)" class="btn btn-danger">Delete</a>
                                            <a :href="'/partners/edit/'+item.id" class="btn btn-primary">Update</a>
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
            deletePartner(url){
                axios.get(url).then(response => {
                    alert(response.data.message)
                    window.location.reload();
                });
            }
        }
    }
</script>