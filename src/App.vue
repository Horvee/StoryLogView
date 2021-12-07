<template>
    <div>
        <!-- <div id="nav">
            <router-link to="/">Home</router-link> |
            <router-link to="/about">About</router-link>
        </div> -->

        <router-view v-slot="{ Component }">
            <!-- <transition> -->
                <keep-alive exclude="LogDeatil">
                    <component :is="Component" />
                </keep-alive>
            <!-- </transition> -->
        </router-view>

    </div>
</template>

<script>

export default {
    components: {
    },
    data() {
        return {
            isHome: true,
        };
    },
};
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

#nav {
    padding: 30px;
}

#nav a {
    font-weight: bold;
    color: #2c3e50;
}

#nav a.router-link-exact-active {
    color: #42b983;
}
</style>
