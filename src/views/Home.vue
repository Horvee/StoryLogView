<template>
    <div class="home">
        <div style="margin: 28px;">
            <keep-alive>
            <search-bar @click-search="actionSearch" />
            </keep-alive>
        </div>
        
        <el-affix :offset="0" @change="(value) => {resultBarAffix = value}">
            <div class="result-hold-bar" :class="{ 'result-hold-bar-shadow' : resultBarAffix }">
                <p v-if="resultTotal == -1">Loading...</p>
                <p v-else>Search total:{{ resultTotal }}</p>
            </div>
        </el-affix>
        
        <el-row style="padding:0 2%">
            <el-col :span="24" v-for="item in logs" :key="item.id" >
                <el-row class="card-item">
                    <el-col :span="6" class="card-heard">
                        <p>{{ item.storyTitle }}</p>
                        <p>{{ item.storyCode }}</p>
                    </el-col>
                    <el-col :span="6" class="card-heard-detail">
                        <h4>Id:</h4>
                        <p>{{ item.id }}</p>
                        <h4>Request time:</h4>
                        <p>{{ formatTime(item.startTime) }}</p>
                        <h4>Use time:</h4>
                        <p>{{ formatUseTime(item.useTime) }}</p>
                    </el-col>
                    <el-col :span="12" class="card-message">
                        <div class="card-message-toolbar">
                            <h4>Something message</h4>
                            <div>
                                <el-button size="mini" @click="toDetail(item.id)" round>Detail</el-button>
                            </div>
                        </div>
                        <!-- <h4>Something message</h4> -->
                        <div class="card-message-list">
                            <p v-for="messageItem in formatSimpleMessageList(item.logContent)" :key="messageItem">{{ messageItem }}</p>
                        </div>
                    </el-col>
                </el-row>
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
    props(){
        return {
            name: 'Home'
        }
    },
    data() {
        return {
            resultTotal: null,
            logs: [],
            resultBarAffix: false
        }
    },
    computed: {
        
    },
    methods: {
        actionSearch(data) {
            this.$data.logs = [];
            this.$data.resultTotal = -1;
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
                this.$data.resultTotal = 0;
                console.log('reject',rejObj)
            })
        },
        toDetail(id) {
            console.log('id:' + id);
            // this.$router.push('/logDetail');
            this.$router.push({
                path: '/logDetail', 
                query: { id: id }
            });
        },
        formatTime(value) {
            return Moment(value).format('YYYY-MM-DD hh:mm:ss:SSS');
        },
        formatUseTime(value) {
            return value >= 1000 ? value / 1000 + ' SEC' : value + ' MSEC'
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
        },
    },
    // mounted() {
    //     console.log('home-mounted')
    // },
    // unmounted() {
    //     console.log('home-unmounted')
    // },
    // activated() {
    //     console.log('home-activated')
    // },
    // deactivated() {
    //     console.log('home-deactivated')
    // }

};
</script>

<style scoped>
.result-hold-bar {
    width: 100%;
    background-color: #ffffff;
    padding: 10px 0;
    margin-bottom: 20px;
}

.result-hold-bar>p {
    font-size: 16px;
    font-weight: 600;
    margin-block-start: 0;
    margin-block-end: 0;
}

.result-hold-bar-shadow {
    box-shadow: 0 2px 5px #dadada;
}



.card-item {
    box-shadow: 1px 1px 5px rgb(163, 163, 163);
    border-radius: 10px;
    margin-bottom: 25px;
    padding: 10px 15px;
}


.card-heard {
    flex-direction: column;
    justify-content: center;
    display: flex;
}
.card-heard>p:nth-child(1) {
    font-size: 35px;
    font-weight: 600;
    margin: 0 0 0 0;
}
.card-heard>p:nth-child(2) {
    font-size: 25px;
    margin: 10px 0 0 0;
}


.card-heard-detail {
    padding-left: 15px;
    text-align: left;
}
.card-heard-detail>p,h4,h5 {
    margin: 8px 0;
}

.card-message {
    padding-left: 15px;
    text-align: left;
}

.card-message-toolbar {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.card-message-list {
    overflow-y: scroll;
    height: 150px;
}
.card-message-list>p {
    margin: 0 0 10px 0;
}
.card-message-list>p:last-child {
    margin: 0;
}

</style>
