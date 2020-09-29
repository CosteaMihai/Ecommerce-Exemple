<template>
    <div>
        <div class="max-w-lg mx-auto mt-20">
            <div
                class="flex flex-col items-center px-8 pb-3 mb-3 text-white bg-blue-500 rounded-lg"
            >
                <div class="mt-1 mb-1">Name</div>
                <input
                    type="text"
                    class="w-full py-2 mt-1 text-center text-black rounded-lg"
                    placeholder="Product Name"
                    v-model="product.name"
                />
            </div>
            <div
                class="flex flex-col items-center px-8 pb-3 mb-3 text-white bg-blue-500 rounded-lg"
            >
                <div class="mt-1 mb-1">Manufacture</div>
                <input
                    type="text"
                    class="w-full py-2 mt-1 text-center text-black rounded-lg"
                    placeholder="Manufacture"
                    v-model="product.manufacture"
                />
            </div>
            <div
                class="flex flex-col items-center px-8 pb-3 mb-3 text-white bg-blue-500 rounded-lg"
            >
                <div class="mt-1 mb-1">Price</div>
                <input
                    type="number"
                    class="w-full py-2 mt-1 text-center text-black rounded-lg"
                    placeholder="Price"
                    v-model="product.price"
                />
            </div>
            <div
                class="flex flex-col items-center px-8 pb-3 mb-3 text-white bg-blue-500 rounded-lg"
            >
                <div class="mt-1 mb-1">Stock</div>
                <input
                    type="number"
                    class="w-full py-2 mt-1 text-center text-black rounded-lg"
                    placeholder="Stock"
                    v-model="product.stock"
                />
            </div>
            <div
                class="flex flex-col items-center px-8 pb-3 mb-3 text-white bg-blue-500 rounded-lg"
            >
                <div class="mt-1 mb-1">Type</div>
                <input
                    type="text"
                    class="w-full py-2 mt-1 text-center text-black rounded-lg"
                    placeholder="Stock"
                    v-model="product.type"
                />
            </div>
            <div
                class="flex flex-col items-center px-8 pb-3 mb-3 text-white bg-blue-500 rounded-lg"
            >
                <div class="mt-1 mb-1">URL Doc</div>
                <input
                    type="text"
                    class="w-full py-2 mt-1 text-center text-black rounded-lg"
                    placeholder="URL Doc"
                    v-model="product.urlDocumentation"
                />
            </div>
            <label
                class="flex flex-col items-center w-full h-64 px-4 py-0 mb-3 tracking-wide text-white duration-500 bg-blue-500 rounded-lg cursor-pointer hover:bg-blue-600"
            >
                <span
                    v-show="loadingStatus === 'not loading'"
                    class="mt-24 text-base"
                >
                    <svg
                        class="w-8 h-8 mx-auto fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                    >
                        <path
                            d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z"
                        />
                    </svg>
                    Upload a photo
                </span>
                <input
                    v-show="loadingStatus === 'not loading'"
                    type="file"
                    class="hidden"
                    @change="previewimage()"
                    accept="image/*"
                />
                <svg
                    v-show="loadingStatus === 'loading'"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    style="margin: auto; background: none; display: block; shape-rendering: auto;"
                    width="184px"
                    height="184px"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="xMidYMid"
                >
                    <circle
                        cx="50"
                        cy="50"
                        fill="none"
                        stroke="#90cdf4"
                        stroke-width="5"
                        r="22"
                        stroke-dasharray="103.67255756846316 36.55751918948772"
                    >
                        <animateTransform
                            attributeName="transform"
                            type="rotate"
                            repeatCount="indefinite"
                            dur="0.8s"
                            values="0 50 50;360 50 50"
                            keyTimes="0;1"
                        ></animateTransform>
                    </circle>
                </svg>

                <img
                    class="object-fill h-56 p-8 -mt-2"
                    v-show="loadingStatus === 'done'"
                    :src="picture"
                    alt=""
                />
                <button
                    class="px-5 py-2 -mt-2 bg-red-500 rounded-md hover"
                    v-show="loadingStatus === 'done'"
                    @click.self="
                        picture = '';
                        loadingStatus = 'not loading';
                        productPicture = '';
                    "
                >
                    Remove
                </button>
            </label>
            <div class="px-4 py-3 mb-16 text-white bg-blue-500 rounded-lg">
                <div class="pt-1 pb-3 text-center">Specifications</div>
                <div
                    v-for="(row, index) in product.specification"
                    :key="index"
                    class="flex flex-col"
                >
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
                                :class="
                                    index == product.specification.length - 1
                                        ? 'ml-6'
                                        : 'ml-16'
                                "
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
            <button
                class="px-10 py-3 text-white bg-blue-500 rounded-lg shadow-lg"
                @click.prevent="addToDatabase"
            >
                Add to databse
            </button>
        </div>
    </div>
</template>

<script>
import { db, storage } from '../main';

export default {
    data() {
        return {
            productPicture: '',
            picture: '',
            loadingStatus: 'not loading',
            width: 0,
            product: this.freshProductObject(),
        };
    },
    methods: {
        previewimage() {
            this.productPicture = event.target.files[0];
            this.loadingStatus = 'loading';
            let input = event.target;
            if (input.files && input.files[0]) {
                var reader = new FileReader();
                reader.onload = (e) => {
                    this.picture = e.target.result;
                };
                reader.readAsDataURL(input.files[0]);
            }
            setTimeout(() => {
                this.loadingStatus = 'done';
            }, 1500);
        },
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
            try {
                const insertedProduct = await db
                    .collection('products')
                    .add(this.product);
                const imageProduct = await storage
                    .ref(`${insertedProduct.id}`)
                    .put(this.productPicture);
                const imageURL = await storage
                    .ref(`${insertedProduct.id}`)
                    .getDownloadURL();
                await db
                    .collection('products')
                    .doc(`${insertedProduct.id}`)
                    .update({
                        urlPhoto: `${imageURL}`,
                    });
                //this.product = this.freshProductObject();
            } catch (error) {
                console.log('Error adding document: ', error);
            }
        },
        freshProductObject() {
            return {
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
                urlPhoto: '',
                urlDocumentation: '',
            };
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
