<template>
    <div
        class="card"
        :class="
            nextOrPrevious === 'next' || !nextOrPrevious
                ? 'animate-from-left'
                : 'animate-from-right'
        "
        :id="product.id"
    >
        <img :src="product.urlPhoto" :alt="product.id" class="photo" />
        <div class="text">
            <p class="title">
                {{ product.name }}
            </p>
            <div class="price">
                <p>{{ product.price }}$</p>
                <span style="text-transform: uppercase;font-size:20px;">
                    {{ product.manufacture }}
                </span>
            </div>
            <hr />
            <p class="stock">
                <svg
                    version="1.1"
                    id="Capa_1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    x="0px"
                    y="0px"
                    viewBox="0 0 297 297"
                    style="enable-background:new 0 0 297 297;width:25px; height:25px;"
                    xml:space="preserve"
                >
                    <g>
                        <path
                            d="M291.219,78.753L153.176,9.732c-2.943-1.473-6.409-1.473-9.353,0L5.781,78.753C2.238,80.525,0,84.145,0,88.107v189.808
		c0,5.775,4.682,10.458,10.458,10.458h34.511c5.775,0,10.458-4.682,10.458-10.458V115.82h186.148v162.095
		c0,5.775,4.682,10.458,10.458,10.458h34.511c5.775,0,10.458-4.682,10.458-10.458V88.107C297,84.145,294.762,80.525,291.219,78.753z
		 M276.085,267.457h-13.595V105.362c0-5.775-4.682-10.458-10.458-10.458H44.968c-5.775,0-10.458,4.682-10.458,10.458v162.095H20.915
		V94.57L148.5,30.778L276.085,94.57V267.457z"
                        />
                        <path
                            d="M217.521,132.552H148.5c-4.043,0-7.32,3.277-7.32,7.32v61.701H79.479c-4.043,0-7.32,3.277-7.32,7.32v69.021
		c0,4.043,3.277,7.32,7.32,7.32h138.042c4.043,0,7.32-3.277,7.32-7.32V139.873C224.842,135.829,221.564,132.552,217.521,132.552z
		 M155.82,226.568l16.837,16.837l-16.837,16.837V226.568z M141.18,260.241l-16.837-16.837l16.837-16.837V260.241z M166.174,216.214
		h33.673l-16.837,16.837L166.174,216.214z M166.174,201.573l16.837-16.837l16.837,16.837H166.174z M210.201,191.22l-16.836-16.837
		l16.836-16.837V191.22z M183.011,164.03l-16.837-16.837h33.673L183.011,164.03z M172.657,174.383L155.82,191.22v-33.673
		L172.657,174.383z M113.989,233.051l-16.837-16.837h33.673L113.989,233.051z M103.636,243.404l-16.837,16.837v-33.673
		L103.636,243.404z M113.989,253.758l16.837,16.837H97.153L113.989,253.758z M183.01,253.758l16.837,16.837h-33.673L183.01,253.758z
		 M193.364,243.404l16.837-16.837v33.673L193.364,243.404z"
                        />
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

                <span style="margin-left:20px; font-size:15px;">
                    {{ product.stock }} pieces
                </span>
            </p>
            <p class="stock" style="margin-bottom:10px">
                <svg
                    height="512pt"
                    viewBox="0 -52 512 512"
                    width="512pt"
                    xmlns="http://www.w3.org/2000/svg"
                    style="width:25px; height:25px;"
                >
                    <path d="m0 0h113.292969v113.292969h-113.292969zm0 0" />
                    <path
                        d="m149.296875 0h362.703125v113.292969h-362.703125zm0 0"
                    />
                    <path
                        d="m0 147.007812h113.292969v113.292969h-113.292969zm0 0"
                    />
                    <path
                        d="m149.296875 147.007812h362.703125v113.292969h-362.703125zm0 0"
                    />
                    <path
                        d="m0 294.011719h113.292969v113.296875h-113.292969zm0 0"
                    />
                    <path
                        d="m149.296875 294.011719h362.703125v113.296875h-362.703125zm0 0"
                    />
                </svg>
                <span
                    style="margin-left:20px; font-size:15px; text-transform:uppercase;"
                >
                    {{ product.category }}
                </span>
            </p>
            <hr />
        </div>

        <div class="between">
            <button
                @click.prevent="$emit('open')"
                class="button"
                style="background-color:DimGrey;"
            >
                <span>Modify</span>
                <svg
                    version="1.1"
                    id="Capa_1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    x="0px"
                    y="0px"
                    viewBox="0 0 383.947 383.947"
                    style="enable-background:new 0 0 383.947 383.947;"
                    xml:space="preserve"
                >
                    <g>
                        <g>
                            <g>
                                <polygon
                                    points="0,303.947 0,383.947 80,383.947 316.053,147.893 236.053,67.893 			"
                                />
                                <path
                                    d="M377.707,56.053L327.893,6.24c-8.32-8.32-21.867-8.32-30.187,0l-39.04,39.04l80,80l39.04-39.04
				C386.027,77.92,386.027,64.373,377.707,56.053z"
                                />
                            </g>
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
            <button
                @click.prevent="deleteProd(product.id)"
                class="button"
                style="background-color:#E53E3E;"
            >
                <span>Delete</span>
                <svg
                    version="1.1"
                    id="Capa_1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    x="0px"
                    y="0px"
                    viewBox="0 0 384 384"
                    style="enable-background:new 0 0 384 384;"
                    xml:space="preserve"
                >
                    <g>
                        <g>
                            <g>
                                <path
                                    d="M64,341.333C64,364.907,83.093,384,106.667,384h170.667C300.907,384,320,364.907,320,341.333v-256H64V341.333z"
                                />
                                <polygon
                                    points="266.667,21.333 245.333,0 138.667,0 117.333,21.333 42.667,21.333 42.667,64 341.333,64 341.333,21.333 			"
                                />
                            </g>
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
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
    props: {
        product: {
            type: Object,
            required: true,
        },
        nextOrPrevious: {
            type: String,
            required: true,
        },
    },
    methods: {
        async deleteProd(id) {
            let selectedProduct = document.getElementById(id);
            selectedProduct.classList.add('animate-out');
            setTimeout(function() {
                selectedProduct.remove();
            }, 500);
            await this.deleteProduct(id);
        },
        ...mapActions('product', ['deleteProduct']),
    },
};
</script>

<style scoped>
@import '../assets/css/modules/admin_page/admin_card.css';
</style>
