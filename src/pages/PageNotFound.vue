<template>
    <div class="not-found-container">
        <p class="not-found">Oops!</p>
        <p class="not-found-error">404 - PAGE NOT FOUND</p>
        <p class="not-found-message">
            The page you are looking for might have been removed, had its name
            changed or is temporarily unavailable.
        </p>
        <router-link class="not-found-button" :to="{ name: 'Home' }">
            GO TO HOMEPAGE
        </router-link>
    </div>
</template>

<script>
export default {};
</script>

<style>
.not-found-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 100px;
    align-items: center;
    text-align: center;
}
.not-found {
    font-size: 100px;
    font-weight: bold;
    letter-spacing: 5px;
    color: #4299e1;
}
.not-found-error {
    margin-top: 10px;
    font-size: 22px;
    font-weight: bold;
}
.not-found-message {
    width: 400px;
    margin-top: 10px;
}
.not-found-button {
    position: relative;
    margin-top: 20px;
    background: #4299e1;
    color: white;
    width: 200px;
    padding: 10px 0px;
    border-radius: 9999px;
    transition: padding 0.5s, background 0.5s;
}
.not-found-button::after {
    content: '>';
    position: absolute;
    bottom: 11px;
    right: -20px;
    transition: right 0.5s;
}
.not-found-button:hover {
    padding-right: 15px;
    background: #2b6cb0;
}
.not-found-button:hover::after {
    right: 15px;
}
</style>
