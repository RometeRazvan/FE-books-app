<template>
<Header />
<Books />
<div class="mt-10"/>
<div v-if="showAddBook"><AddBook /></div>
<div v-if="showEditBook"><UpdateBook /></div>
<router-view></router-view>
</template>

<script>
import { defineAsyncComponent } from 'vue';

export default {
    beforeCreate() {
        this.$store?.commit('fetchBooks', true);
    },
    mounted() {
        this.$store?.commit('fetchBooks', true);
    },
    components: {
        Books: defineAsyncComponent(() => import('remote/Books')),
        Header: defineAsyncComponent(() => import('remote/Header')),
        AddBook: defineAsyncComponent(() => import('remote/AddBook')),
        UpdateBook: defineAsyncComponent(() => import('remote/UpdateBook')),
    },
    computed: {
        showAddBook() {
            return this.$store?.state?.showAddBook ?? false;
        },
        showEditBook() {
            return this.$store?.state?.showEditBook ?? false;
        },
    },
};
</script>