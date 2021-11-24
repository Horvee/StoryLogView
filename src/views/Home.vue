<template>
    <div class="home">
        <div style="margin:10px;">
            <search-bar @click-search="actionSearch" />
        </div>
        <h3>{{ resultTotal }}</h3>
        <el-row>
            <el-col :span="24" v-for="item in logs" :key="item.id">
                <el-col :span="6">
                    <h2>{{ item.storyTitle }}</h2>
                    <h3>{{ item.storyCode }}</h3>
                </el-col>
                <el-col :span="4">
                    <h4>{{ new Date(item.startTime) }}</h4>
                    <h4>{{ item.useTime / 1000 }} sec</h4>
                </el-col>
            </el-col>
        </el-row>
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
    data() {
        return {
            resultTotal: null,
            logs: []
        }
    },
    methods: {
        actionSearch(data) {
            console.log(data);
            // build es query
            let queryBody = QueryBuilder.build(data);
            console.log(queryBody);
            Axios.post('/api/storylog/_search',queryBody)
            .then((resp) => {
                console.log(resp);
                if(resp.status != 200) {
                    console.log("request fail!")
                    return;
                }
                
                let data = resp.data;
                this.$data.resultTotal = data.hits.total.value;

                let logList = [];
                for(let item of data.hits.hits) {
                    logList.push(item._source);
                }
                this.$data.logs = logList;
                
            }).catch((rejObj) => {
                console.log('reject',rejObj)
            })
        },
    },
};
</script>
