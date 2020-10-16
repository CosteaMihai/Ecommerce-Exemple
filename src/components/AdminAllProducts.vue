<template>
    <div class="page">
        <div class="container">
            <div v-for="(product, index) in products" :key="index" class="card">
                <img :src="product.urlPhoto" :alt="product.id" class="photo" />
                <div class="text">
                    <p style="font-weight:600;font-size:large;height:70px;">
                        {{ product.name }}
                    </p>
                    <div class="center">
                        <div>
                            <p
                                class="atribute"
                                style="background-color: limegreen"
                            >
                                Stock
                            </p>
                            <p>{{ product.stock }}</p>
                        </div>
                        <div>
                            <p
                                class="atribute"
                                style="background-color: DodgerBlue"
                            >
                                Price
                            </p>
                            <p>{{ product.price }}$</p>
                        </div>
                    </div>
                </div>
                <div class="center">
                    <button
                        @click.prevent="openModal(product)"
                        class="button"
                        style="background-color:DimGrey;"
                    >
                        Modify
                    </button>
                    <button
                        @click.prevent="deleteProduct(product.id)"
                        class="button"
                        style="background-color:red;"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
        <div class="secitionPreviousNext">
            <button
                id="previousButton"
                :disabled="!isPrevious"
                @click.prevent="isPrevious ? previousPage() : ''"
                class="previousNextButtons"
            >
                Prev
            </button>
            <button
                id="nextButton"
                :disabled="!isNext"
                @click.prevent="isNext ? nextPage() : ''"
                class="previousNextButtons"
            >
                Next
            </button>
        </div>
        <AdminAllProductsModal
            v-if="isModalOpen"
            :product="product"
            @close-modal="closeModal()"
        />
    </div>
</template>

<script>
import AdminAllProductsModal from './AdminAllProductsModal';
import { mapGetters, mapActions } from 'vuex';

export default {
    components: {
        AdminAllProductsModal,
    },
    data() {
        return {
            isModalOpen: false,
            product: {},
        };
    },
    methods: {
        openModal(product) {
            this.product = { ...product };
            this.isModalOpen = true;
            document.documentElement.style.overflow = 'hidden';
        },
        closeModal() {
            this.isModalOpen = false;
            document.documentElement.style.overflow = 'auto';
        },
        ...mapActions('product', [
            'initialPage',
            'nextPage',
            'previousPage',
            'deleteProduct',
        ]),
    },
    computed: {
        ...mapGetters('product', ['products', 'isNext', 'isPrevious']),
    },
    created() {
        this.initialPage();
    },
};
</script>

<style lang="css" scoped>
.atribute {
    padding: 4px 10px 4px 10px;
    color: white;
    border-radius: 5px;
    margin-bottom: 4px;
}
.center {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 60%;
    margin: 7px auto 7px auto;
}
.text {
    margin: 10px;
    flex-flow: column;
    text-align: center;
}
.photo {
    object-fit: cover;
    height: 18rem;
    width: 100%;
    margin: auto;
    border-radius: 10px 10px 0px 0px;
}
.card {
    flex-flow: column;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    margin: 0px 8px 0px;
    border-radius: 10px;
    transition: 0.3s;
}
.card:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}
.container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    align-items: stretch;
    grid-gap: 50px;
    margin: 50px auto 50px auto;
}
.secitionPreviousNext {
    margin: 30px 0px 30px 0px;
    display: flex;
    flex-direction: row;
    justify-content: center;
}
.page {
    width: 85%;
    margin: auto;
}
.button {
    color: white;
    padding: 7px 20px 7px 20px;
    margin: 10px -9px 10px -10px;
    border-radius: 5px;
    opacity: 0.75;
    transition: 0.3s;
}
.button:focus {
    outline: 0;
}
.button:hover {
    opacity: 1;
}

.previousNextButtons {
    padding: 10px 20px 10px 20px;
    background-color: gray;
    color: white;
    transition: 0.4s;
}
.previousNextButtons:focus {
    outline: 0;
}
.previousNextButtons:hover {
    background-color: DimGrey;
}
.previousNextButtons:disabled {
    pointer-events: none;
    opacity: 0.5;
}
#previousButton {
    border-radius: 5px 0 0 5px;
}
#nextButton {
    border-radius: 0 5px 5px 0;
}
</style>
