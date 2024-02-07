<template>
    <div class="w-full max-w-xs mx-auto">
        <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h1 class="block text-gray-700 text-sm font-bold mb-2">Edit Book</h1>
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="name">
                    Name
                </label>
                <input
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="name" type="text" placeholder="Name" v-model="updateName"
                />
            </div>
            <div class="mb-6">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="author">
                    Author
                </label>
                <input
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="author" type="text" placeholder="Author" v-model="updateAuthor"
                />
            </div>
            <div class="flex items-center justify-between">
                <button
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button" @click="updateBook"
                >
                    Update Book
                </button>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            updateName: this.$store?.state?.updateName ?? '',
            updateAuthor: this.$store?.state?.updateAuthor ?? '',
        };
    },
    watch: {
        updateName: {
            handler: function (val) {
                this.$store?.commit('setUpdateName', val);
            },
            deep: true,
        },
        updateAuthor: {
            handler: function (val) {
                this.$store?.commit('setUpdateAuthor', val);
            },
            deep: true,
        },
    },
    methods: {
        updateBook() {
            this.$store?.commit('updateBookById', { name: this.updateName, author: this.updateAuthor });
        },
    },
};
</script>