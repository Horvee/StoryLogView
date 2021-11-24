<template>
    <div class="home">
        <div style="margin:10px;">
            <search-bar @click-search="actionSearch" />
        </div>
        <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
        <HelloWorld msg="Welcome to Your Vue.js App" />
    </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import SearchBar from "../components/SearchBar.vue";
import QueryBuilder from "../util/QueryBuilder";
import Axios from "axios"

export default {
    name: "Home",
    components: {
        HelloWorld,
        SearchBar,
    },
    methods: {
        actionSearch: (data) => {
            console.log(data);
            // build es query
            let queryBody = QueryBuilder.build(data);
            console.log(queryBody);
            Axios.post('/api/storylog/_search',queryBody)
            .then((resp) => {
                console.log(resp);
                if(resp.status == 200) {
                    console.log("request is ok!")
                    return;
                }
                
            }).catch((rejObj) => {
                console.log('reject',rejObj)
            })
        },
    },
};
</script>
