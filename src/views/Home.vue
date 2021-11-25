<template>
    <div class="home">
        <div style="margin:10px;">
            <search-bar @click-search="actionSearch" />
        </div>
        <h3>{{ resultTotal }}</h3>
        <el-row>
            <el-col :span="22" v-for="item in logs" :key="item.id" class="card-item">
                <el-col :span="6">
                    <h2>{{ item.storyTitle }}</h2>
                    <h3>{{ item.storyCode }}</h3>
                </el-col>
                <el-col :span="4">
                    <h4>{{ formatTime(item.startTime) }}</h4>
                    <h4>{{ item.useTime / 1000 }} sec</h4>
                </el-col>
                <el-col :span="4">
                    <h4>first message</h4>
                    <p v-for="messageItem in formatSimpleMessageList(item.logContent)" :key="messageItem">{{ messageItem }}</p>
                </el-col>
            </el-col>
        </el-row>
    </div>
</template>

<script>
// @ is an alias to /src
import _ from 'lodash';
import SearchBar from "../components/SearchBar.vue";
import QueryBuilder from "../util/QueryBuilder";
import Axios from "axios";
import Moment from "moment";

export default {
    name: "Home",
    components: {
        SearchBar,
    },
    data() {
        return {
            resultTotal: null,
            logs: []
        }
    },
    computed: {
        
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
        formatTime(value) {
            return Moment(value).format('YYYY-MM-DD hh:mm:ss:SSS');
        },
        formatSimpleMessageList(array) {
            let newList = [];
            for (let item of array) {
                if(_.isNil(item.logInfoList) || _.isEmpty(item.logInfoList)) {
                    continue;
                }
                for (let singleMessage of item.logInfoList) {
                    if(newList.length > 10) {
                        return newList;
                    }
                    newList.push(singleMessage.message);
                }
            }
            return newList;
        }
    },
};
</script>

<style scoped>
.card-item {
    box-shadow: 1px 1px 5px rgb(163, 163, 163);
    border-radius: 10px;
    margin-bottom: 25px;
}




</style>
