<template>
    <div class="w-9/12 mx-auto mt-10">
        <div
            v-if="currentUser"
            class="col-start-2 col-end-12 px-5 py-5 mb-2 text-white bg-blue-500 rounded-lg shadow-lg"
        >
            <div class="text-lg font-semibold">Personal information</div>
            <div class="pt-2">
                {{ currentUser.firstName }} {{ currentUser.lastName }}
            </div>
            <div class="pt-2">{{ currentUser.email }}</div>
            <div class="pt-2">{{ currentUser.phone }}</div>
        </div>
        <div
            v-else
            class="col-start-2 col-end-12 px-5 pt-5 pb-10 text-white bg-blue-500 rounded-lg shadow-lg"
        >
            <div class="text-lg font-semibold">Personal information</div>
            <div class="flex flex-col w-full">
                <div class="flex items-center w-full">
                    <input
                        :class="
                            $v.user.name.$error ? 'border-2 border-red-500' : ''
                        "
                        class="w-1/3 px-4 py-2 mt-3 text-blue-500 rounded focus:outline-none"
                        type="text"
                        placeholder="Full Name"
                        v-model.lazy="user.name"
                        @blur="$v.user.name.$touch()"
                    />
                    <div v-if="$v.user.name.$error" class="mt-3 ml-5">
                        <p
                            v-if="!$v.user.name.required"
                            class="text-sm italic text-red-800"
                        >
                            This field is required!
                        </p>
                    </div>
                </div>
                <div class="flex items-center w-full">
                    <input
                        :class="
                            $v.user.email.$error
                                ? 'border-2 border-red-500'
                                : ''
                        "
                        class="w-1/3 px-4 py-2 mt-4 text-blue-500 rounded focus:outline-none"
                        type="email"
                        placeholder="Email"
                        v-model.lazy="user.email"
                        @blur="$v.user.email.$touch()"
                    />
                    <div v-if="$v.user.email.$error" class="mt-4 ml-5">
                        <p
                            v-if="!$v.user.email.required"
                            class="text-sm italic text-red-800"
                        >
                            This field is required!
                        </p>
                        <p
                            v-else-if="!$v.user.email.email"
                            class="text-sm italic text-red-800"
                        >
                            Invalid email format!
                        </p>
                    </div>
                </div>

                <div class="flex items-center w-full">
                    <input
                        :class="
                            $v.user.phone.$error
                                ? 'border-2 border-red-500'
                                : ''
                        "
                        class="w-1/3 px-4 py-2 mt-4 text-blue-500 rounded focus:outline-none"
                        type="tel"
                        placeholder="Phone number"
                        v-mask="'+40 (###) ### ###'"
                        v-model.lazy="user.phone"
                        @blur="$v.user.phone.$touch()"
                    />
                    <div v-if="$v.user.phone.$error" class="mt-4 ml-5">
                        <p
                            v-if="!$v.user.phone.required"
                            class="text-sm italic text-red-800"
                        >
                            This field is required!
                        </p>
                        <p
                            v-else-if="!$v.user.phone.minLength"
                            class="text-sm italic text-red-800"
                        >
                            Missing digits!
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <div
            class="col-start-2 col-end-12 px-5 py-5 mt-10 border border-blue-500 rounded-lg shadow-lg"
        >
            <div v-for="(product, index) in cartProducts" :key="index">
                <CheckoutProduct :product="product" class="border-b" />
            </div>
            <div class="flex justify-between mt-4 text-lg">
                <div>Total order:</div>
                <div>${{ totalCart }}</div>
            </div>
        </div>
        <div
            class="col-start-2 col-end-12 px-5 py-5 mt-10 mb-16 text-white bg-blue-500 rounded-lg shadow-lg"
        >
            <div class="text-lg font-semibold">Payment method</div>
            <div class="flex items-center justify-between px-24 mt-10">
                <button
                    :class="
                        paymentMethod == 'cash'
                            ? 'border-blue-900 text-blue-900'
                            : ''
                    "
                    class="flex flex-col items-center w-48 h-56 py-4 border-2 rounded-lg bg-neutral-2 focus:outline-none"
                    @click.prevent="paymentMethod = 'cash'"
                >
                    <p class="mb-5 text-xl text-center text-faruno">Cash</p>
                    <svg
                        class="w-32 h-32 mx-auto"
                        id="Layer_3"
                        enable-background="new 0 0 64 64"
                        height="512"
                        viewBox="0 0 64 64"
                        width="512"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <g>
                            <path
                                d="m16 58h28l18-18h-7l-8 8h-13c-1.105 0-2-.895-2-2 0-1.105.895-2 2-2h5l4-4h-14l-9 8h-4"
                                fill="#fadfb2"
                            />
                            <path d="m10 12h52v22h-52z" fill="#78b75b" />
                            <path d="m58 12v-4h-52v22h4v-18z" fill="#96cc7f" />
                            <path d="m54 8v-6h-52v22h4v-16z" fill="#78b75b" />
                            <path
                                d="m12 46h4v14h-4z"
                                fill="#d5cec2"
                                transform="matrix(-1 0 0 -1 28 106)"
                            />
                            <path d="m2 44h10v18h-10z" fill="#758190" />
                            <circle cx="36" cy="23" fill="#96cc7f" r="8" />
                            <path
                                d="m37 22h-.002v-2h.002c.551 0 .998.448.998 1h2c0-1.654-1.345-3-2.998-3h-.002v-1h-1.999v1c-1.654 0-3 1.346-3 3s1.346 2.999 3 2.999v2c-.552 0-1-.448-1-.999h-2c0 1.654 1.346 2.999 3 2.999v1h1.999v-1h.002c1.653 0 2.998-1.346 2.998-3s-1.345-2.999-2.998-2.999zm-3.001-1c0-.552.448-1 1-1v2c-.552 0-1-.449-1-1zm3.001 4.999h-.002v-2h.002c.551 0 .998.449.998 1.001 0 .551-.447.999-.998.999z"
                                fill="#669e4f"
                            />
                            <g>
                                <path
                                    d="m57.998 30.999h-11.999v-2h10.999v-11.999h-10.999v-2h11.999c.553 0 1 .447 1 1v14c0 .552-.447.999-1 .999z"
                                    fill="#669e4f"
                                />
                            </g>
                            <g>
                                <path
                                    d="m25.999 31h-11.999c-.553 0-1-.448-1-1v-14c0-.553.447-1 1-1h11.999v2h-10.999v12h10.999z"
                                    fill="#669e4f"
                                />
                            </g>
                            <path d="m18 21h6v4h-6z" fill="#96cc7f" />
                            <path d="m48 21h6v4h-6z" fill="#96cc7f" />
                            <path
                                d="m12 55.979c1.62-1.219 2.984-2.752 4-4.518v-5.461h-4z"
                                fill="#e7e4dd"
                            />
                            <path
                                d="m2 58.949c.332.022.662.05 1 .05 3.382 0 6.491-1.133 9-3.02v-11.979h-10z"
                                fill="#8892a0"
                            />
                            <g>
                                <path
                                    d="m62 39h-7.002c-.265 0-.52.105-.707.292l-7.707 7.708h-12.585c-.552 0-.999-.449-.999-1 0-.552.447-1 .999-1h5c.265 0 .52-.105.707-.293l4-4c.285-.286.371-.716.217-1.09-.155-.374-.52-.617-.925-.617h-13.999c-.245 0-.481.09-.665.252l-8.716 7.748h-2.62v-1c0-.553-.447-1-1-1h-3v-1c0-.553-.447-1-1-1h-9.999c-.553 0-1 .447-1 1v18c0 .553.447 1 1 1h9.999c.553 0 1-.447 1-1v-1h3c.553 0 1-.447 1-1v-1h27c.266 0 .521-.105.708-.292l18.001-18c.285-.286.371-.716.217-1.09-.155-.375-.52-.618-.924-.618zm-51.002 21.999h-7.999v-15.999h7.999zm4-2h-1.999v-11.999h1.999zm28.586-2h-26.586v-8h3.001c.244 0 .48-.09.664-.253l8.716-7.746h11.205l-2 2h-4.585c-1.654 0-2.999 1.345-2.999 3 0 1.654 1.345 3 2.999 3h12.999c.266 0 .521-.105.708-.293l7.707-7.707h4.172z"
                                />
                                <path
                                    d="m35.999 31.999c4.962 0 8.999-4.037 8.999-9s-4.037-9-8.999-9c-4.963 0-9 4.037-9 9s4.037 9 9 9zm0-15.999c3.859 0 6.999 3.14 6.999 7 0 3.859-3.14 7-6.999 7-3.86 0-7-3.14-7-7s3.14-7 7-7z"
                                />
                                <path
                                    d="m33.999 25h-2c0 1.654 1.346 2.999 3 2.999v1h1.999v-1h.002c1.653 0 2.998-1.346 2.998-3s-1.345-3-2.998-3h-.002v-2h.002c.551 0 .998.448.998 1h2c0-1.654-1.345-3-2.998-3h-.002v-1h-1.999v1c-1.654 0-3 1.346-3 3s1.346 2.999 3 2.999v2c-.552.001-1-.447-1-.998zm0-4c0-.552.448-1 1-1v2c-.552 0-1-.449-1-1zm2.999 2.999h.002c.551 0 .998.449.998 1.001 0 .551-.447.999-.998.999h-.002z"
                                />
                                <path
                                    d="m62 11h-3.001v-3c0-.553-.447-1-1-1h-3v-5c0-.553-.447-1-1-1h-51.999c-.553 0-1 .447-1 1v22c0 .553.447 1 1 1h3v5c0 .553.447 1 1 1h2.999v3c0 .553.447 1 1 1h52.001c.552 0 1-.447 1-1v-22c0-.553-.448-1-1-1zm-57-3v15h-2v-20h49.999v4h-46.999c-.553 0-1 .447-1 1zm2 20.999v-19.999h49.999v2h-47c-.553 0-1 .447-1 1v17h-1.999zm54 4h-50.001v-19.999h50.001z"
                                />
                                <path
                                    d="m58.998 29.999v-13.999c0-.553-.447-1-1-1h-11.999v2h10.999v12h-10.999v2h11.999c.553-.001 1-.448 1-1.001z"
                                />
                                <path
                                    d="m14 31h11.999v-2h-10.999v-12h10.999v-2h-11.999c-.553 0-1 .447-1 1v14c0 .552.447 1 1 1z"
                                />
                                <path
                                    d="m17.999 20c-.553 0-1 .447-1 1v4c0 .553.447 1 1 1h5.999c.553 0 1-.447 1-1v-4c0-.553-.447-1-1-1zm4.999 3.999h-3.999v-2h3.999z"
                                />
                                <path
                                    d="m53.998 25.999c.553 0 1-.447 1-1v-4c0-.553-.447-1-1-1h-5.999c-.553 0-1 .447-1 1v4c0 .553.447 1 1 1zm-4.999-3.999h3.999v2h-3.999z"
                                />
                            </g>
                        </g>
                    </svg>
                </button>

                <button
                    class="flex flex-col items-center w-48 h-56 py-4 border-2 rounded-lg bg-neutral-2 focus:outline-none"
                    :class="
                        paymentMethod == 'card'
                            ? 'border-blue-900 text-blue-900'
                            : ''
                    "
                    @click.prevent="paymentMethod = 'card'"
                >
                    <p class="text-xl text-center text-faruno">
                        Card in location
                    </p>
                    <svg
                        class="w-32 h-32 mx-auto mt-5"
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
                        <path
                            style="fill:#FEA832;"
                            d="M512,121v195c0,24.901-20.099,45-45,45H105c-24.901,0-45-20.099-45-45V121l30-30h392L512,121z"
                        />
                        <path
                            style="fill:#FE9923;"
                            d="M512,121v195c0,24.901-20.099,45-45,45H286V91h196L512,121z"
                        />
                        <path
                            style="fill:#994C0F;"
                            d="M512,76v45H60V76c0-24.901,20.099-45,45-45h362C491.901,31,512,51.099,512,76z"
                        />
                        <path
                            style="fill:#32D736;"
                            d="M452,196v15l-30,30H30L0,211v-15c0-24.901,20.099-45,45-45h362C431.901,151,452,171.099,452,196z"
                        />
                        <path
                            style="fill:#10BB67;"
                            d="M452,196v15l-30,30H226v-90h181C431.901,151,452,171.099,452,196z"
                        />
                        <path
                            style="fill:#713708;"
                            d="M512,76v45H286V31h181C491.901,31,512,51.099,512,76z"
                        />
                        <polygon
                            style="fill:#0D70B2;"
                            points="452,211 452,271 422,301 30,301 0,271 0,211 "
                        />
                        <polygon
                            style="fill:#095C92;"
                            points="452,211 452,271 422,301 226,301 226,211 "
                        />
                        <path
                            style="fill:#32D736;"
                            d="M452,271v165c0,24.901-20.099,45-45,45H45c-24.901,0-45-20.099-45-45V271H452z"
                        />
                        <path
                            style="fill:#10BB67;"
                            d="M452,271v165c0,24.901-20.099,45-45,45H226V271H452z"
                        />
                        <path
                            style="fill:#FD003A;"
                            d="M105,421c-24.814,0-45-20.186-45-45s20.186-45,45-45s45,20.186,45,45S129.814,421,105,421z"
                        />
                        <path
                            style="fill:#FEA832;"
                            d="M165,421c-24.814,0-45-20.186-45-45s20.186-45,45-45s45,20.186,45,45S189.814,421,165,421z"
                        />
                        <g>
                            <path
                                style="fill:#0D70B2;"
                                d="M377,361H256c-8.291,0-15-6.709-15-15s6.709-15,15-15h121c8.291,0,15,6.709,15,15
		S385.291,361,377,361z"
                            />
                            <path
                                style="fill:#0D70B2;"
                                d="M377,421H256c-8.291,0-15-6.709-15-15s6.709-15,15-15h121c8.291,0,15,6.709,15,15
		S385.291,421,377,421z"
                            />
                        </g>
                        <g />
                        <g />
                        <g />
                        <g />
                        <g />
                        <g />
                        <g />
                        <g />
                        <g />
                        <g />
                        <g />
                        <g />
                        <g />
                        <g />
                        <g />
                    </svg>
                </button>

                <button
                    class="flex flex-col items-center w-48 h-56 px-4 py-4 border-2 rounded-lg opacity-50 cursor-not-allowed bg-neutral-2 focus:outline-none border-neutral-2"
                >
                    <p class="text-xl text-center text-faruno">Online</p>
                    <svg
                        class="w-32 h-32 mx-auto mt-2"
                        version="1.1"
                        viewBox="0 0 480 301"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:sketch="http://www.bohemiancoding.com/sketch/ns"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                    >
                        <title />
                        <desc />
                        <defs />
                        <g
                            fill="none"
                            fill-rule="evenodd"
                            id="round-rect"
                            stroke="none"
                            stroke-width="1"
                        >
                            <g id="payu-money">
                                <path
                                    d="M444,3.03581628e-06 C420,5.30180998e-06 165.902344,-4.81179503e-06 24,3.03581628e-06 C12,3.6994511e-06 -6.11066753e-13,12.0056015 -1.42108547e-14,24.0112 C-1.42108547e-14,96.1913435 2.8991193e-06,240.111972 -1.42108547e-14,264.123169 C-1.38851962e-06,288.134366 12,300.139965 36,300.139965 C169.869629,300.139965 420,300.139967 444,300.139965 C468,300.139965 480,288.134366 480,264.123169 C479.999998,240.111972 479.999994,115.769809 480,36.0167984 C480,12.0056015 468,3.03581628e-06 444,3.03581628e-06 Z"
                                    fill="#479951"
                                    id="rect"
                                />
                                <g
                                    fill="#FFFFFF"
                                    id="payU"
                                    transform="translate(72.000000, 66.000000)"
                                >
                                    <path
                                        d="M287.177553,41.6081114 L282.27585,41.6081114 C277.326811,41.6081114 273.308183,45.6252236 273.308183,50.5805826 L273.308183,106.875737 C273.308183,106.875737 272.845286,116.665881 256.583354,116.665881 C240.321421,116.665881 239.858525,106.875737 239.858525,106.875737 L239.858525,50.5805826 C239.858525,45.6293658 235.843563,41.6081114 230.890857,41.6081114 L221.087451,41.6081114 C216.138412,41.6081114 212.119784,45.6233751 212.119784,50.5764538 L212.119784,104.43616 C212.119784,123.801145 227.826765,139.50955 247.202309,139.50955 L265.964399,139.50955 C285.340472,139.50955 301.046924,123.806658 301.046924,104.43616 L301.046924,63.6359351 L311.656137,63.6359351 C313.902484,63.6359351 315.73214,61.8110465 315.73214,59.5599322 L315.73214,39.1573517 C315.73214,36.9110046 313.907251,35.0813488 311.656137,35.0813488 L291.253556,35.0813488 C289.007209,35.0813488 287.177553,36.9062375 287.177553,39.1573517 L287.177553,41.6081114 L287.177553,41.6081114 Z M287.177553,41.6081114 L292.079256,41.6081114 C297.031962,41.6081114 301.046924,45.6338641 301.046924,50.5764538 L301.046924,63.6359351 L291.253556,63.6359351 C289.002442,63.6359351 287.177553,61.8062793 287.177553,59.5599322 L287.177553,41.6081114 L287.177553,41.6081114 Z M314.916294,17.1372554 C314.916294,15.3324524 316.374279,13.8693705 318.184179,13.8693705 L332.860388,13.8693705 C334.665191,13.8693705 336.128273,15.3273556 336.128273,17.1372554 L336.128273,31.8134639 C336.128273,33.6182669 334.670287,35.0813488 332.860388,35.0813488 L318.184179,35.0813488 C316.379376,35.0813488 314.916294,33.6233637 314.916294,31.8134639 L314.916294,17.1372554 Z M301.046924,2.44144956 C301.046924,1.0930742 302.150702,0 303.488373,0 L313.29069,0 C314.639065,0 315.73214,1.10377797 315.73214,2.44144956 L315.73214,12.2437662 C315.73214,13.5921416 314.628362,14.6852158 313.29069,14.6852158 L303.488373,14.6852158 C302.139998,14.6852158 301.046924,13.5814378 301.046924,12.2437662 L301.046924,2.44144956 Z M172.355291,139.527078 C172.063072,139.581402 170.503098,139.820572 170.503098,139.820572 C154.70214,141.870899 151.570784,130.135985 148.828722,121.179557 L135.070369,69.9984861 C134.368009,67.3857041 135.983499,65.2676257 138.696422,65.2676257 L141.954368,65.2676257 C144.659343,65.2676257 147.420207,67.3807699 148.123735,69.997891 C148.123735,69.997891 156.881642,102.577305 161.896383,121.232144 C163.386568,125.013556 165.29273,128.509182 169.42972,128.509182 C173.566709,128.509182 175.734486,127.656974 177.630401,120.602892 L189.572796,70.0333723 C190.194376,67.4013231 192.890876,65.2676257 195.59904,65.2676257 L198.809588,65.2676257 C201.516211,65.2676257 203.189064,67.4027467 202.548419,70.0266857 L186.756873,134.705305 C179.487962,163.249932 170.144781,167.398872 155.048455,168 C150.441798,167.398872 148.068755,158.046528 151.828496,156.534744 C151.828496,156.534744 159.437042,156.587669 163.835524,153.398042 C168.588522,149.951332 170.609766,144.438294 171.709055,141.294509 C171.773837,141.284178 172.278482,139.706016 172.355291,139.527078 Z"
                                    />
                                    <path
                                        d="M117.481726,95.4539026 L92.6062143,95.4539026 C80.6633024,95.4539026 70.978543,105.133462 70.978543,117.073804 C70.978543,129.016771 80.6615813,138.693705 92.6062143,138.693705 L108.90758,138.693705 C120.850492,138.693705 130.535251,129.014145 130.535251,117.073804 L130.535251,98.7172839 L130.535251,85.6637588 C130.535251,63.6359351 106.853031,63.6359351 100.348975,63.6359351 C91.9337107,63.6359351 81.5610853,64.9075243 81.5610853,64.9075243 C79.7659063,65.1021911 78.3211509,66.7261718 78.3211509,68.5253795 L78.3211509,73.4317064 C78.3211509,75.2312755 79.7705443,76.5366531 81.5584616,76.348156 C81.5584616,76.348156 92.9342632,75.0613549 99.7143839,75.0613549 C106.199319,75.0613549 117.481726,75.0613549 117.481726,85.6637588 L117.481726,95.4539026 Z M84.0320681,116.665881 C84.0320681,110.357776 89.1487629,105.244047 95.4499875,105.244047 L117.481726,105.244047 L117.481726,116.665881 C117.481726,122.973986 112.365032,128.087716 106.063807,128.087716 L95.4499875,128.087716 C89.1440448,128.087716 84.0320681,122.975373 84.0320681,116.665881 Z"
                                        id="Path"
                                    />
                                    <path
                                        d="M0,55.479411 C0,47.818504 6.205657,41.608111 13.8749862,41.608111 L44.056047,41.608111 C58.924931,41.608111 70.978543,53.664695 70.978543,68.522863 L70.978543,77.513449 C70.978543,92.378056 58.919506,104.428201 44.05446,104.428201 L13.8693705,104.428201 L13.8693705,134.611495 C13.8693705,136.866037 12.0419304,138.693705 9.7831165,138.693705 L4.086254,138.693705 C1.8294782,138.693705 0,136.862344 0,134.614918 L0,55.479411 L0,55.479411 Z M13.8693705,58.660463 C13.8693705,56.451972 15.6509687,54.661637 17.8762416,54.661637 L39.560472,54.661637 C49.70293,54.661637 57.925018,62.877901 57.925018,73.018156 C57.925018,83.156182 49.715967,91.374676 39.560472,91.374676 L13.8693705,91.374676 L13.8693705,58.660463 L13.8693705,58.660463 Z"
                                        id="Path"
                                    />
                                </g>
                            </g>
                        </g>
                    </svg>
                </button>
            </div>
        </div>
        <div
            class="mb-12 -mt-12 italic text-center text-red-500"
            v-if="paymentMethodError"
        >
            Select a payment method!
        </div>
        <div class="flex justify-between mb-20">
            <button
                class="px-10 py-3 text-lg text-white bg-red-500 rounded-lg shadow-lg focus:outline-none"
                @click.prevent="$emit('cancel')"
            >
                Cancel
            </button>
            <button
                class="px-10 py-3 text-lg text-white bg-blue-500 rounded-lg shadow-lg focus:outline-none"
                @click.prevent="completeOrder()"
            >
                Complete the order
            </button>
        </div>
    </div>
</template>

<script>
import CheckoutProduct from '../components/CheckoutProduct';
import { mask } from 'vue-the-mask';
import { required, minLength, email } from 'vuelidate/lib/validators';
import { db } from '../main';
import { mapGetters } from 'vuex';
import store from '../store/index';
export default {
    directives: { mask },
    components: {
        CheckoutProduct,
    },
    data() {
        return {
            user: {
                lastName: '',
                firstName: '',
                email: '',
                phone: '',
            },
            paymentMethod: '',
            paymentMethodError: false,
            error: '',
        };
    },
    methods: {
        completeOrder() {
            this.error = '';
            this.paymentMethodError = false;
            if (this.paymentMethod) {
                if (
                    this.currentUser &&
                    Object.values(this.currentUser).length
                ) {
                    db.collection('orders')
                        .add({
                            user: this.currentUser,
                            products: this.cartProducts,
                            paymentMethod: this.paymentMethod,
                        })
                        .catch((err) => {
                            this.error = err;
                            console.log(err);
                        });
                    if (this.error) return;

                    this.$router.push({ path: '/' });
                    store.state.cart = [];
                } else {
                    this.$v.user.$touch();
                    if (!this.$v.user.$invalid) {
                        db.collection('orders')
                            .add({
                                user: this.user,
                                products: this.cartProducts,
                                paymentMethod: this.paymentMethod,
                            })
                            .catch((err) => {
                                this.error = err;
                                console.log(err);
                            });
                        if (this.error) return;

                        this.$router.push({ path: '/' });
                        store.state.cart = [];
                    }
                }
            } else {
                this.paymentMethodError = true;
            }
        },
    },
    computed: {
        currentUser() {
            return store.state.currentUser;
        },
        ...mapGetters('cart', ['totalCart', 'cartProducts']),
    },
    validations: {
        user: {
            email: {
                required,
                email,
            },

            name: {
                required,
            },
            phone: {
                required,
                minLength: minLength(17),
            },
        },
    },
};
</script>

<style></style>
