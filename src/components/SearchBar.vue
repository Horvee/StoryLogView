<template>
    <div class="bar-layout">
        <h3>Search</h3>

        <el-row class="rower">
            <el-col :span="6">
                <p>TagName:</p>
                <el-input type="text" clearable />
            </el-col>
            <el-col :span="6">
                <p>TagNumber:</p>
                <el-input type="number" clearable />
            </el-col>
            <el-col :span="6">
                <p>UseTime(Sec):</p>
                <el-input type="number" clearable />
            </el-col>
            <el-col :span="6">
                <p>StoryLogId(JustOne):</p>
                <el-input type="text" clearable />
            </el-col>
            <el-col :span="7">
                <p>TimeSpace:</p>
                <el-date-picker type="datetimerange" :width="100"></el-date-picker>
            </el-col>

            <el-col :span="24">
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
            </el-col>
        </el-row>

        <div>
            <el-button>Search</el-button>
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

.bar-layout {
    border-radius: 10px;
    box-shadow: 0 0 10px #d6d6d6;
    padding: 10px;
}

.rower>div {
    padding-left: 15px;
    padding-right: 15px;
}

.rower>div>p {
    text-align: left;
}


</style>
