<template>
    <table class="table-auto w-full content-center" summary="Books table">
        <thead>
            <tr>
                <th class="px-4 py-2">Name</th>
                <th class="px-4 py-2">Author</th>
                <th class="px-4 py-2">Edit</th>
                <th class="px-4 py-2">Delete</th>
            </tr>
        </thead>
        <tbody class="text-center">
            <tr v-for="book in this.$store?.state?.books" :key="book.id">
                <td class="border px-4 py-2">{{ book.name }}</td>
                <td class="border px-4 py-2">{{ book.author }}</td>
                <td class="border px-4 py-2">
                    <button
                        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="button" @click="updateBookUrl(book._id)"
                    >
                        Edit
                    </button>
                </td>
                <td class="border px-4 py-2">
                    <button
                        class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="button" @click="removeBook(book._id)"
                    >
                        Delete
                    </button>
                </td>
            </tr>
        </tbody>
    </table>
    <div class="mt-5"/>

    <div v-if="!this.$store?.state?.showAddBook">
        <div class="flex justify-end">
        <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            v-on:click="addBook"
        >
            Add Book
        </button>
    </div>
    </div>
    
</template>

<script>
export default {
    data() {
        return {
            books: this.$store?.state?.books ?? [],
        };
    },
    methods: {
        removeBook(id) {
            this.$store?.commit('removeBook', id);
        },
        addBook() {
            this.$store?.commit('setShowAddBook', true);
        },
        updateBookUrl(id) {
            this.$store?.commit('setUpdateBookId', id);
        },
    },
};
</script>