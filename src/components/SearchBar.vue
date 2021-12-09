<template>
    <div class="bar-layout">
        <h3>Search</h3>

        <el-row class="rower">
            <el-col :span="12">
                <el-row :gutter="10">
                    <el-col :span="12">
                        <p>TagName:</p>
                        <el-input
                            type="text"
                            v-model.trim="base.tagName"
                            clearable
                        />
                    </el-col>
                    <el-col :span="12">
                        <p>TagNumber:</p>
                        <el-input
                            type="number"
                            v-model.number="base.tagNumber"
                            clearable
                        />
                    </el-col>
                    <el-col :span="12">
                        <p>UseTime(Sec):</p>
                        <el-input
                            type="number"
                            v-model.number="base.useTime"
                            clearable
                        />
                    </el-col>
                    <el-col :span="12">
                        <p>StoryLogId(JustOne):</p>
                        <el-input
                            type="text"
                            v-model.number="base.storyLogId"
                            clearable
                        />
                    </el-col>
                </el-row>
            </el-col>
            <el-col :span="12">
                <el-row :gutter="10">
                    <el-col :span="24">
                        <p>TimeSpace:</p>
                        <el-date-picker
                            type="datetimerange"
                            v-model="base.timer"
                            @width="10000"
                            class="search-bar-time-pick-full-width"
                        ></el-date-picker>
                    </el-col>
                    <el-col :span="24">
                        <p>Message:</p>
                    </el-col>
                    <el-col :span="24">
                        <el-col :span="6" v-for="(item) in base.messages" :key="item">
                            <el-input
                                type="text"
                                v-model="item.text"
                                clearable
                            />
                        </el-col>
                        <el-col :span="7">
                            <el-button v-on:click="changeMessageGroup(1)">Add</el-button>
                            <el-button v-on:click="changeMessageGroup(-1)">Remove</el-button>
                        </el-col>
                    </el-col>
                </el-row>
            </el-col>

            

            <!-- <el-col :span="24">
                <h5>Inside log details</h5>
            </el-col>
            <el-col :span="6">
                <p>ThreadName:</p>
                <el-input type="text" clearable />
            </el-col>
            <el-col :span="6">
                <p>ClassName:</p>
                <el-input type="text" clearable />
            </el-col>
            <el-col :span="6">
                <p>Message:</p>
                <el-input type="text" clearable />
            </el-col> -->

            <el-col :span="24" style="margin-top : 20px">
                <el-button v-on:click="startSearch">Search</el-button>
            </el-col>
        </el-row>

    </div>
</template>

<script>
// @ is an alias to /src

import _ from "lodash";

export default {
    name: "SearchBar",
    components: {},
    data() {
        return {
            base: {
                tagName: null,
                tagNumber: null,
                useTime: null,
                storyLogId: null,
                timer: null,
                messages: [{ text : null }]
            },
            output: {
                // out put memory data
                tagName: null,
                tagNumber: null,
                useTime: null,// millisecond
                storyLogId: null,
                timer: null,
                startTime: null,
                endTime: null,
                messages: []
            },
            // BasetagName: "",
            // BaseTagNumber: null,
            // BaseUseTime: null,
            // BasestoryLogId: null,
        };
    },
    methods: {
        startSearch() {
            // copy data to out put memory,now just simple copy data to out put object
            this.$data.output = _.cloneDeep(this.$data.base);
            
            this.$data.output.useTime = this.$data.base.useTime * 1000;
            if (!_.isEmpty(this.$data.base.timer)) {
                // console.log(this.$data.base.timer)
                // console.log(this.$data.base.timer[0])
                // console.log(this.$data.base.timer[0].getTime())
                this.$data.output.startTime = this.$data.base.timer[0].getTime();
                this.$data.output.endTime = this.$data.base.timer[1].getTime();
            }

            this.$data.output.messages = [];
            for(let item of this.$data.base.messages) {
                if(_.isNil(item.text) || item.text == '') {
                    continue;
                }
                this.$data.output.messages.push(item.text);
            }

            this.$emit("clickSearch", this.$data.output);
        },
        changeMessageGroup(value) {
            // value 1 or -1
            if(value == -1) {
                if(this.$data.base.messages.length <= 1) return;
                this.$data.base.messages.splice(this.$data.base.messages.length - 1, 1);
            } else {
                if(this.$data.base.messages.length >= 6) return;
                this.$data.base.messages.push({ text : null });
            }
        }
    },
};
</script>

<style scoped>
.bar-layout {
    border-radius: 10px;
    box-shadow: 0 0 10px #d6d6d6;
    padding: 10px;
}

.rower > div {
    padding-left: 15px;
    padding-right: 15px;
}

.rower > div > p {
    text-align: left;
}

>>>.search-bar-time-pick-full-width {
    width: 100% !important;
    min-width: 100% !important;
    /* --el-date-editor-datetimerange-width: 100%; */
}
</style>
