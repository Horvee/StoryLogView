<template>
    <div class="top">
        <el-row v-if="logId == null || status != 1">
            <el-col :span="24" class="simple-message-view">
                <el-button @click="$router.back()" round>Back</el-button>
                <!-- <p @click="router.back()">Back</p> -->
                <p v-if="logId == null">Unknown log id, will be 3 sec back to home!</p>
                <p v-if="status == 0">Loading data</p>
                <p v-if="status == 2">Unknown data</p>
                <p v-if="status == 3">Too much data (id is private key)</p>
            </el-col>
        </el-row>
        <el-row v-else>
            <el-col :span="24" class="back-btn">
                <el-button @click="$router.back()" round>
                    <!-- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" data-v-152cbb9b=""><path fill="currentColor" d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"></path><path fill="currentColor" d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"></path></svg> -->
                    Back
                </el-button>
            </el-col>
            <!-- <el-col :span="24" class="card-heard">
                
            </el-col> -->
            <el-col :span="16" class="card-heard">
                <p>ID: {{ logId }}</p>
                <p>Title:{{ logData.storyTitle }}</p>
                <p>Code:{{ logData.storyCode }}</p>
            </el-col>
            <el-col :span="8" class="card-heard-detail">
                <h4>Request time:</h4>
                <p>{{ formatTime(logData.startTime) }}</p>
                <h4>End time:</h4>
                <p>{{ formatTime(logData.endTime) }}</p>
                <h4>Use time:</h4>
                <p>{{ formatUseTime(logData.useTime) }}</p>
            </el-col>
            <el-col :span="24" class="message-list">
                <div v-for="item in logData.logContent" :key="item.key">
                    <el-row v-if="item.logInfoList == undefind || item.logInfoList == null || item.logInfoList.length < 1">
                        <!-- empty element -->
                    </el-row>

                    <div class="message-main-view" v-else-if="item.threadType == 'MAIN'">
                        <div class="card-item">
                            <!-- <p>thread name: {{ item.logInfoList[0].threadName }}</p> -->
                            <!-- <p>class name: {{ item.logInfoList[0].className }}</p> -->
                            <!-- <p>method name: {{ item.logInfoList[0].methodName }}</p> -->
                            <!-- <p>code location: {{ item.logInfoList[0].codeLocation }}</p> -->
                            <!-- <span class="message-tag-class-name"></span> -->
                            <p>
                                ●
                                <span class="message-tag-class-name">{{ item.logInfoList[0].className }}</span> # 
                                <span class="message-tag-method-name">{{ item.logInfoList[0].methodName }}</span>                            </p>
                            <p v-for="messageItem in item.logInfoList" :key="messageItem.message">{{ messageItem.message }}</p>
                        </div>
                    </div>
                    
                    <div class="message-child-view" v-else-if="item.threadType == 'CHILD'">
                        <div>
                            <p class="message-child-view-thread-tag">CHILD</p>
                        </div>
                        <div class="card-item">
                            <p>● Thread name: {{ item.logInfoList[0].threadName }}</p>
                            <p v-for="messageItem in item.logInfoList" :key="messageItem">
                                <span class="message-tag-class-name">{{ messageItem.className }}</span> # 
                                <span class="message-tag-method-name">{{ messageItem.methodName }}</span> :
                                <span class="message-tag-code-local">{{ messageItem.codeLocation }}</span>
                                <span class="child-message-tag-msg">{{ messageItem.message }}</span>
                            </p>
                            <!-- <el-row v-for="messageItem in item.logInfoList" :key="messageItem">
                                <p>{{ messageItem.className }}#{{ messageItem.methodName }}:{{ messageItem.codeLocation }}  {{ messageItem.message }} </p>
                            </el-row> -->
                        </div>
                    </div>
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
            status: 0, // 0-loading 1-done 2-unknownData 3-tooMuch
            logData: {}
        }
    },
    created() {
        // Axios.post('/api/storylog/_search',queryBody)
        let id = this.$route.query.id;
        console.log(id);
        if (_.isNil(id)) {
            setTimeout(() => {
                this.$router.replace("/");
            },3000);
            return;
        }
        this.logId = id;
        Axios.get('/api/storylog/_search?q=id:' + id)
        .then((resp) => {
            console.log(resp);
            if(resp.status != 200) {
                console.log("request fail!")
                return;
            }
            // if(_.isNil(null))return;
            
            let data = resp.data;
            let resultTotal = data.hits.total.value;

            // status has 0-loading 1-done 2-unknownData 3-tooMuch (but never be happen)
            if (resultTotal < 1) {   
                this.status = 2;
                return;
            }
            if (resultTotal > 1) {
                this.status = 3
                return;
            }

            this.$data.logData = data.hits.hits[0]._source;
            // for(let item of data.hits.hits) {
            //     this.$data.logData = item._source;
            // }

            this.$data.status = 1;
            
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
.top {
    margin: 8px;
}

.back-btn {
    display: flex;
}

.simple-message-view>p {
    font-size: 35px;
    font-weight: 600;
}

.card-item {
    box-shadow: 0px 0px 5px rgb(163, 163, 163);
    border-radius: 10px;
    margin-bottom: 18px;
    padding: 10px 15px;
}

.card-item>p {
    margin-top: 5px;
    margin-bottom: 5px;
}

.message-list {
    text-align: left;
    display: flex;
    flex-direction: column;
    padding: 0 10px;
}

.message-main-view {

}

.message-child-view {
    display: flex;
    justify-content: flex-end;
}

.message-child-view>div:nth-child(1) {
    margin-bottom: 18px;
    width: 5%;
    display: flex;
    align-items: center;
}

.message-child-view>div:nth-child(2) {
    width: 95%;
}

.message-child-view-thread-tag {
    border-radius: 10px 10px;
    background-color: #9b9b9b;
    color: rgb(255, 255, 255);
    padding: 1px 5px;
    font-size: 14px;
}

.message-tag-class-name {
    color: #333399;
}

.message-tag-method-name {
    color: #33CC99;
}

.message-tag-code-local {
    color: #993399;
}

.child-message-tag-msg {
    padding-left: 20px;
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
.card-heard>p:nth-child(3) {
    font-size: 25px;
    margin: 10px 0 0 0;
}


.card-heard-detail {
    padding-left: 15px;
    text-align: left;
    margin-bottom: 10px;
}
.card-heard-detail>p,h4,h5 {
    margin: 8px 0;
}

/* ---------------------------------- */





</style>
