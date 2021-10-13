<template>
    <div class="">
        <h3>Search</h3>

        <el-row class="rower">
            <el-col :span="7">
                <p>TimeSpace:</p>
                <el-date-picker type="datetimerange" :width="100"></el-date-picker>
            </el-col>
            <el-col :span="5">
                <p>TagName:</p>
                <el-input type="text"/>
            </el-col>
            <el-col :span="6">
                <p>TagNumber:</p>
                <el-input type="number"/>
            </el-col>
            <el-col :span="6">
                <p>UseTime(Sec):</p>
                <el-input type="number"/>
            </el-col>
            <el-col :span="6">
                <p>StoryLogId(JustOne):</p>
                <el-input type="text"/>
            </el-col>
        </el-row>

        <div>
            <el-button>abc</el-button>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src

export default {
    name: "SearchBar",
    components: {},
};
</script>

<style scoped>

.rower>div {
    padding: 15px;
}

.rower>div>p {
    text-align: left;
}


</style>
