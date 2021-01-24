<template>
    <label
        class="upload-label"
        :style="
            loadingStatus === 'done'
                ? 'border-bottom-width:2px; border-color:#2b6cb0; '
                : ''
        "
    >
        <span v-show="loadingStatus === 'not-loading'" style="margin-top:7rem;">
            <svg
                version="1.1"
                id="Capa_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 486.3 486.3"
                style="enable-background:new 0 0 486.3 486.3;"
                xml:space="preserve"
                class="upload-svg"
            >
                <g>
                    <g>
                        <path
                            d="M395.5,135.8c-5.2-30.9-20.5-59.1-43.9-80.5c-26-23.8-59.8-36.9-95-36.9c-27.2,0-53.7,7.8-76.4,22.5
			c-18.9,12.2-34.6,28.7-45.7,48.1c-4.8-0.9-9.8-1.4-14.8-1.4c-42.5,0-77.1,34.6-77.1,77.1c0,5.5,0.6,10.8,1.6,16
			C16.7,200.7,0,232.9,0,267.2c0,27.7,10.3,54.6,29.1,75.9c19.3,21.8,44.8,34.7,72,36.2c0.3,0,0.5,0,0.8,0h86
			c7.5,0,13.5-6,13.5-13.5s-6-13.5-13.5-13.5h-85.6C61.4,349.8,27,310.9,27,267.1c0-28.3,15.2-54.7,39.7-69
			c5.7-3.3,8.1-10.2,5.9-16.4c-2-5.4-3-11.1-3-17.2c0-27.6,22.5-50.1,50.1-50.1c5.9,0,11.7,1,17.1,3c6.6,2.4,13.9-0.6,16.9-6.9
			c18.7-39.7,59.1-65.3,103-65.3c59,0,107.7,44.2,113.3,102.8c0.6,6.1,5.2,11,11.2,12c44.5,7.6,78.1,48.7,78.1,95.6
			c0,49.7-39.1,92.9-87.3,96.6h-73.7c-7.5,0-13.5,6-13.5,13.5s6,13.5,13.5,13.5h74.2c0.3,0,0.6,0,1,0c30.5-2.2,59-16.2,80.2-39.6
			c21.1-23.2,32.6-53,32.6-84C486.2,199.5,447.9,149.6,395.5,135.8z"
                        />
                        <path
                            d="M324.2,280c5.3-5.3,5.3-13.8,0-19.1l-71.5-71.5c-2.5-2.5-6-4-9.5-4s-7,1.4-9.5,4l-71.5,71.5c-5.3,5.3-5.3,13.8,0,19.1
			c2.6,2.6,6.1,4,9.5,4s6.9-1.3,9.5-4l48.5-48.5v222.9c0,7.5,6,13.5,13.5,13.5s13.5-6,13.5-13.5V231.5l48.5,48.5
			C310.4,285.3,318.9,285.3,324.2,280z"
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
            Upload a photo
        </span>
        <input
            v-show="loadingStatus === 'not loading'"
            type="file"
            style="display:none;"
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
            class="upload-img"
            v-show="loadingStatus === 'done'"
            :src="picture"
            alt=""
        />
        <button
            class="upload-remove-btn"
            v-show="loadingStatus === 'done'"
            @click.prevent="freshImage()"
        >
            <span>Remove</span>
            <svg
                height="512pt"
                viewBox="0 0 512 512"
                width="512pt"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="m256 512c-141.164062 0-256-114.835938-256-256s114.835938-256 256-256 256 114.835938 256 256-114.835938 256-256 256zm0-480c-123.519531 0-224 100.480469-224 224s100.480469 224 224 224 224-100.480469 224-224-100.480469-224-224-224zm0 0"
                />
                <path
                    d="m176.8125 351.1875c-4.097656 0-8.195312-1.554688-11.308594-4.691406-6.25-6.25-6.25-16.382813 0-22.632813l158.398438-158.402343c6.253906-6.25 16.386718-6.25 22.636718 0s6.25 16.382812 0 22.636718l-158.402343 158.398438c-3.15625 3.136718-7.25 4.691406-11.324219 4.691406zm0 0"
                />
                <path
                    d="m335.1875 351.1875c-4.09375 0-8.191406-1.554688-11.304688-4.691406l-158.398437-158.378906c-6.253906-6.25-6.253906-16.382813 0-22.632813 6.25-6.253906 16.382813-6.253906 22.632813 0l158.398437 158.398437c6.253906 6.25 6.253906 16.382813 0 22.632813-3.132813 3.117187-7.230469 4.671875-11.328125 4.671875zm0 0"
                />
            </svg>
        </button>
    </label>
</template>

<script>
export default {
    props: {
        urlPhoto: {
            type: String,
        },
    },
    data() {
        return {
            productPicture: '',
            picture: null,
            loadingStatus: 'not-loading',
        };
    },
    methods: {
        previewimage() {
            if (!event.target.files.length) return;
            this.loadingStatus = 'loading';
            this.productPicture = event.target.files[0];
            this.picture = URL.createObjectURL(this.productPicture);
            this.loadingStatus = 'done';
            this.$emit('change-photo', this.productPicture);
        },
        freshImage() {
            this.picture = null;
            this.loadingStatus = 'not-loading';
            this.productPicture = '';
            this.$emit('change-photo', '');
        },
    },
    mounted() {
        if (this.urlPhoto) {
            this.loadingStatus = 'done';
            this.picture = this.urlPhoto;
            this.productPicture = this.urlPhoto;
            this.$emit('change-photo', this.productPicture);
        }
    },
};
</script>

<style scoped>
@import './../../assets/css/modules/admin_page/admin_photo_upload.css';
</style>
