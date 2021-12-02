<template>
    <div class="home">
        <el-row v-if="logId == null">
            <el-col :span="6" class="card-heard">
                <p>Unknown log id</p>
            </el-col>
        </el-row>
        <el-row v-else class="card-item">
            <el-col :span="24" class="card-heard">
                <p>{{ id }}</p>
            </el-col>
            <el-col :span="24" class="card-heard">
                <p>{{ item.storyTitle }} | {{ item.storyCode }}</p>
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
                        <el-button size="mini" round>Detail</el-button>
                    </div>
                </div>
                <div class="card-message-list">
                    <p v-for="messageItem in formatSimpleMessageList(item.logContent)" :key="messageItem">{{ messageItem }}</p>
                </div>
            </el-col>
        </el-row>
           
    </div>
</template>

<script>
// @ is an alias to /src
import _ from 'lodash';
import Axios from "axios";
import Moment from "moment";

export default {
    name: "LogDeatil",
    components: {

    },
    data() {
        return {
            logId:null,
            resultTotal: null,
            logs: []
        }
    },
    created() {
        console.log();
        // Axios.post('/api/storylog/_search',queryBody)
        let id = '';
        Axios.get('/api/storylog/_search?q=id:' + id)
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
    computed: {
        
    },
    methods: {
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
        }
    },
};
</script>

<style scoped>
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
