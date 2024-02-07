import { createApp } from "vue";
import { createStore } from "vuex";
import * as VueRouter from "vue-router";

import { login, getBooks, logout, deleteBook, createBook, updateBook } from "./calls/calls";

import "./index.scss";

import App from "./App.vue";

import LoginPage from "./views/LoginPage.vue";
import HomePage from "./views/HomePage.vue";

const routes = [
    { path: "/", component: LoginPage },
    { path: "/home", component: HomePage },
];

const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes,
});

// router.beforeEach((to, from, next) => {
//     if (to.path !== '/' && !document.cookie.includes('Authentication')) {
//         next('/');
//     }
//     else {
//         next();
//     }
// });

const checkAuth = async (response) => {
    if (response?.status === 401 || !response) {
        window.location.href = '/';
    }
}

const store = createStore({
    state() {
        return {
            email: '',
            password: '',
            loginError: '',
            books: [],
            showAddBook: false,
            showEditBook: false,
            editBookId: '',
            addName: '',
            addAuthor: '',
            updateName: '',
            updateAuthor: '',
        };
    },
    mutations: {
        setEmail(state, email) {
            state.email = email;
        },
        setPassword(state, password) {
            state.password = password;
        },
        setShowAddBook(state, showAddBook) {
            state.showAddBook = showAddBook;
        },
        setAddName(state, addName) {
            state.addName = addName;
        },
        setAddAuthor(state, addAuthor) {
            state.addAuthor = addAuthor;
        },
        setUpdateName(state, updateName) {
            state.updateName = updateName;
        },
        setUpdateAuthor(state, updateAuthor) {
            state.updateAuthor = updateAuthor;
        },
        setShowEditBook(state, showEditBook) {
            state.showEditBook = showEditBook;
        },
        async login(state) {
            try {
                const response = await login(state.email, state.password);

                if (response.status !== 201) throw new Error('Failed to login');

                state.loginError = false;
                window.location.href = '/home';
            }
            catch (error) {
                console.log(error);
                state.loginError = true;
            }
        },
        async logout() {
            try {
                const response = await logout();

                checkAuth(response);

                if (response.status !== 201) throw new Error('Failed to logout');

                document.cookie = `Authentication=; expires=Tue, 01 Jan 2013 00:00:00 UTC; path=/;`;
                window.location.href = '/';
            }
            catch (error) {
                console.log(error);
            }
        },
        async fetchBooks(state) {
            try {
                const response = await getBooks();

                checkAuth(response);

                if (response.status !== 200) throw new Error('Failed to get books');

                state.books = response.data;
            }
            catch (error) {
                console.error(error);
            }
        },
        async removeBook(state, id) {
            try {
                const response = await deleteBook(id);

                checkAuth(response);

                if (response.status !== 200) throw new Error('Failed to delete book');

                state.books = state.books.filter(book => book._id !== id);
            }
            catch (error) {
                console.error(error);
            }
        },
        async createBook(state, book) {
            console.log(book);
            try {
                const response = await createBook(book);

                checkAuth(response);

                if (response.status !== 201) throw new Error('Failed to create book');

                state.books.push(response.data);
            }
            catch (error) {
                console.error(error);
            }

            state.addName = '';
            state.addAuthor = '';
        },

        async updateBook(state, book) {
            try {
                const response = await updateBook(book._id, book);

                checkAuth(response);

                if (response.status !== 200) throw new Error('Failed to update book');

                state.books = state.books.map(b => b._id === book._id ? book : b);
            }
            catch (error) {
                console.error(error);
            }
        },

        setUpdateBookId(state, id) {
            state.showEditBook = true;
            state.editBookId = id;
        },

        async updateBookById(state, book) {
            try {
                const id = state.editBookId;

                const response = await updateBook(id, book);

                checkAuth(response);

                if (response.status !== 200) throw new Error('Failed to update book');

                state.books = state.books.map(b => b._id === id ? book : b);

                state.showEditBook = false;
            }
            catch (error) {
                console.error(error);
            }
        },
    },
});

createApp(App).use(router).use(store).mount("#app");
