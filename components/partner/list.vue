<template>
    <!-- Table Start -->
<div class="container-fluid pt-4 px-4" id="partner-tbl">
    <div class="row g-4">
        <div class="col-12">
            <div class="bg-light rounded h-100 p-4">
                <h6 class="mb-4 title">Partner
                    <a href="/partner-add" class="btn btn-square btn-outline-success m-2 btn-add">
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
                                <th scope="col">Email</th>
                                <th scope="col">Country</th>
                                <th scope="col">ZIP</th>
                                <th scope="col">Status</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in data">
                                <th scope="row">1</th>
                                <td>John</td>
                                <td>Doe</td>
                                <td>jhon@email.com</td>
                                <td>USA</td>
                                <td>123</td>
                                <td>Member</td>
                                <td>
                                    <div class="bg-light rounded">
                                        <div class="btn-group" role="group">
                                            <a class="btn btn-danger">Delete</a>
                                            <a href="/partner-edit" class="btn btn-primary">Update</a>
                                            <a href="/partner-view" class="btn btn-info">View</a>
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
    export default {
        props: ['data'],

    }
</script>