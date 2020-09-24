<template>
    <div>
        <div class="max-w-lg mx-auto mt-20">
            <div class="flex flex-col items-center px-8 pb-3 mb-3 text-white bg-blue-500 rounded-lg">
                <div class="mt-1 mb-1">Name</div>
                <input
                    type="text"
                    class="w-full py-2 mt-1 text-center text-black rounded-lg"
                    placeholder="Product Name"
                    v-model="product.name"
                />
            </div>
            <div class="flex flex-col items-center px-8 pb-3 mb-3 text-white bg-blue-500 rounded-lg">
                <div class="mt-1 mb-1">Manufacture</div>
                <input
                    type="text"
                    class="w-full py-2 mt-1 text-center text-black rounded-lg"
                    placeholder="Manufacture"
                    v-model="product.manufacture"
                />
            </div>
            <div class="flex flex-col items-center px-8 pb-3 mb-3 text-white bg-blue-500 rounded-lg">
                <div class="mt-1 mb-1">Price</div>
                <input
                    type="number"
                    class="w-full py-2 mt-1 text-center text-black rounded-lg"
                    placeholder="Price"
                    v-model="product.price"
                />
            </div>
            <div class="flex flex-col items-center px-8 pb-3 mb-3 text-white bg-blue-500 rounded-lg">
                <div class="mt-1 mb-1">Stock</div>
                <input
                    type="number"
                    class="w-full py-2 mt-1 text-center text-black rounded-lg"
                    placeholder="Stock"
                    v-model="product.stock"
                />
            </div>
            <div class="flex flex-col items-center px-8 pb-3 mb-3 text-white bg-blue-500 rounded-lg">
                <div class="mt-1 mb-1">Type</div>
                <input
                    type="text"
                    class="w-full py-2 mt-1 text-center text-black rounded-lg"
                    placeholder="Stock"
                    v-model="product.type"
                />
            </div>
            <div class="flex flex-col items-center px-8 pb-3 mb-3 text-white bg-blue-500 rounded-lg">
                <div class="mt-1 mb-1">URL Doc</div>
                <input
                    type="text"
                    class="w-full py-2 mt-1 text-center text-black rounded-lg"
                    placeholder="URL Doc"
                    v-model="product.urlDocumentation"
                />
            </div>
            <div class="flex flex-col items-center px-8 pb-3 mb-3 text-white bg-blue-500 rounded-lg">
                <div class="mt-1 mb-1">URL Photo</div>
                <input
                    type="text"
                    class="w-full py-2 mt-1 text-center text-black rounded-lg"
                    placeholder="URL Photo"
                    v-model="product.urlPoza"
                />
            </div>
            <div class="px-4 py-3 mb-16 text-white bg-blue-500 rounded-lg">
                <div class="pt-1 pb-3 text-center">Specifications</div>
                <div v-for="(row, index) in product.specification" :key="index" class="flex flex-col">
                    <div class="flex items-center mb-4">
                        <input
                            type="text"
                            class="py-2 mx-5 mt-1 text-center text-black rounded-lg"
                            placeholder="Title"
                            v-model="product.specification[index].title"
                        />
                        <input
                            type="text"
                            class="py-2 mt-1 text-center text-black rounded-lg"
                            placeholder="Description"
                            v-model="product.specification[index].description"
                        />
                        <button
                            v-if="index == product.specification.length - 1"
                            class="pt-px mt-1 ml-4 focus:outline-none"
                            @click.prevent="addRow()"
                        >
                            <svg
                                class="w-6 h-6 fill-current"
                                version="1.1"
                                id="Capa_1"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlns:xlink="http://www.w3.org/1999/xlink"
                                x="0px"
                                y="0px"
                                viewBox="0 0 512 512"
                                style="enable-background:new 0 0 512 512;"
                                xml:space="preserve"
                            >
                                <g>
                                    <g>
                                        <path
                                            d="M256,0C114.833,0,0,114.833,0,256s114.833,256,256,256s256-114.853,256-256S397.167,0,256,0z M256,472.341
			c-119.275,0-216.341-97.046-216.341-216.341S136.725,39.659,256,39.659S472.341,136.705,472.341,256S375.295,472.341,256,472.341z
			"
                                        />
                                    </g>
                                </g>
                                <g>
                                    <g>
                                        <path
                                            d="M355.148,234.386H275.83v-79.318c0-10.946-8.864-19.83-19.83-19.83s-19.83,8.884-19.83,19.83v79.318h-79.318
			c-10.966,0-19.83,8.884-19.83,19.83s8.864,19.83,19.83,19.83h79.318v79.318c0,10.946,8.864,19.83,19.83,19.83
			s19.83-8.884,19.83-19.83v-79.318h79.318c10.966,0,19.83-8.884,19.83-19.83S366.114,234.386,355.148,234.386z"
                                        />
                                    </g>
                                </g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                            </svg>
                        </button>
                        <div v-if="index > 0">
                            <button
                                :class="index == product.specification.length - 1 ? 'ml-6' : 'ml-16'"
                                @click.prevent="removeElement(index)"
                                class="mt-3 focus:outline-none"
                            >
                                <svg
                                    height="512pt"
                                    viewBox="0 0 512 512"
                                    width="512pt"
                                    xmlns="http://www.w3.org/2000/svg"
                                    class="w-6 h-6"
                                >
                                    <path
                                        d="m256 0c-141.164062 0-256 114.835938-256 256s114.835938 256 256 256 256-114.835938 256-256-114.835938-256-256-256zm0 0"
                                        fill="#f44336"
                                    />
                                    <path
                                        d="m350.273438 320.105469c8.339843 8.34375 8.339843 21.824219 0 30.167969-4.160157 4.160156-9.621094 6.25-15.085938 6.25-5.460938 0-10.921875-2.089844-15.082031-6.25l-64.105469-64.109376-64.105469 64.109376c-4.160156 4.160156-9.621093 6.25-15.082031 6.25-5.464844 0-10.925781-2.089844-15.085938-6.25-8.339843-8.34375-8.339843-21.824219 0-30.167969l64.109376-64.105469-64.109376-64.105469c-8.339843-8.34375-8.339843-21.824219 0-30.167969 8.34375-8.339843 21.824219-8.339843 30.167969 0l64.105469 64.109376 64.105469-64.109376c8.34375-8.339843 21.824219-8.339843 30.167969 0 8.339843 8.34375 8.339843 21.824219 0 30.167969l-64.109376 64.105469zm0 0"
                                        fill="#fafafa"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex justify-center mb-20">
            <button class="px-10 py-3 text-white bg-blue-500 rounded-lg shadow-lg" @click.prevent="addToDatabase">
                Add to databse
            </button>
        </div>
    </div>
</template>

<script>
import { db } from '../main';
export default {
    data() {
        return {
            product: {
                name: '',
                manufacture: '',
                price: 0,
                stock: 0,
                specification: [
                    {
                        title: '',
                        description: '',
                    },
                ],
                type: '',
                urlDocumentation: '',
                urlPoza: '',
            },
        };
    },
    methods: {
        addRow() {
            this.product.specification.push({
                title: '',
                description: '',
            });
        },
        removeElement(index) {
            this.product.specification.splice(index, 1);
        },
        async addToDatabase() {
            await db
                .collection('products')
                .add(this.product)
                .then((docRef) => {
                    console.log('Document written with ID: ', docRef.id);
                    this.product = {
                        name: '',
                        manufacture: '',
                        price: 0,
                        stock: 0,
                        specification: [
                            {
                                title: '',
                                description: '',
                            },
                        ],
                        type: '',
                        urlDocumentation: '',
                        urlPoza: '',
                    };
                })
                .catch(function(error) {
                    console.error('Error adding document: ', error);
                });
        },
    },
};
</script>

<style>
input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
</style>
