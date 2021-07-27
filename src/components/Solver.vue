<template>
    <el-form inline>
        <el-form-item label="机关类型">
            <el-select v-model="settings.type">
                <el-option label="旋转方块" value="rotate"/>
                <el-option label="花瓣数量" value="count"/> 
            </el-select>
        </el-form-item>
        <el-form-item label="关联方式">
            <el-select v-model="settings.method">
                <el-option label="相邻" value="neighbor"/>
                <el-option label="相邻 - 头尾相连" value="neighbor_loop"/> 
                <el-option label="自定义" value="custom"/> 
            </el-select>
        </el-form-item>
    </el-form>
    
    <el-form v-for="(u,i) in units" :key="i" inline class="unit-form">
        <el-form-item :label="'机关 ' + (i + 1)">
            <el-select v-model="units[i].state">
                <el-option 
                    v-for="{label,value} in unit_states" 
                    :key="value" 
                    :value="value"
                    :label="label"
                />
            </el-select>
        </el-form-item>

        <el-form-item label="关联机关" v-if="settings.method == 'custom'">
            <el-select v-model="units[i].connection" multiple placeholder="请选择" class="connect-unit">
                <template v-for="(u2,i2) in units">
                    <el-option
                        v-if="i != i2"
                        :key="i2"
                        :value="i2" 
                        :label="'机关 ' + (i2 + 1)"
                    />
                </template>
            </el-select>
        </el-form-item>
    </el-form>

    <el-button @click="units.pop()" icon="el-icon-minus" :disabled="units.length <= 3">减少机关</el-button>   
    <el-button @click="units.push(new Unit())" icon="el-icon-plus">增加机关</el-button>
    <el-button type="primary" @click="solve">求解</el-button>

    <el-divider></el-divider>
    
    <el-card v-if="result === false">
        <el-result icon="error" title="不可解" sub-title="请检查是否正确输入机关状态"/>
    </el-card>
    <template v-for="(step,index) in result" :key="index">
        <el-card :header="'状态' + (index + 1)">
            <el-space size="large">
                <span v-for="(ch,i) in step.label" :key="i" 
                    :class="{active : step.action == i, done : step.done}" 
                    class="unit"
                >
                    {{ ch }}
                </span>
            </el-space>
        </el-card>
        <div class="action" v-if="step.action != undefined">
            <i class="el-icon-bottom"></i>
            <span>激活 机关 {{step.action + 1}}</span>
        </div>
    </template>
</template>

<script setup>
import { reactive,ref} from "@vue/reactivity"
import { computed, watch } from "@vue/runtime-core"

const settings = reactive({
    type : "rotate",
    method : "neighbor"
})

const num_unit_state = computed(()=> settings.type == "rotate" ? 4 : 3)
const unit_states = computed(()=>{
    switch (settings.type) {
        case "rotate":
            return [
                { label : "正", value : 0 },
                { label : "左", value : 1 },
                { label : "背", value : 2 },
                { label : "右", value : 3 }
            ]
        case "count":
            return [
                { label : "一", value : 1 },
                { label : "二", value : 2 },
                { label : "三", value : 0 }
            ]
    }
})

class Unit {
    constructor(){
        this.state = 0
        this.connection = []
    }
    static action(repr,index) {
        let list = repr.split("").map(i=>parseInt(i))
        let update = [index]
        switch (settings.method){
            case "neighbor":
                if (index - 1 >= 0) update.push(index - 1)
                if (index + 1 < list.length) update.push(index + 1)                
                break
            case "neighbor_loop":
                update.push((index - 1 + list.length) % list.length)
                update.push((index + 1) % list.length)     
                break
            case "custom":
                units.value[index].connection.forEach(v=>update.push(v))
                break 
        }
        update.forEach(i=>list[i] = (list[i] + 1) % num_unit_state.value)
        return list.join("")
    }
}


const units = ref(Array.from({length:3},()=>new Unit()))
const result = ref(null)


// debug
// units.value.push(new Unit())
// units.value[0].state = 2
// units.value[1].state = 1
// units.value[2].state = 1
// units.value[3].state = 2
// settings.type = "count"
// settings.method = "neighbor_loop"


watch(()=>settings.type,()=>units.value.forEach(u => u.state = 0))

watch(()=>units.value.length,()=>{
    units.value.forEach(u => {
        let index = 0
        while (index < u.connection.length){
            if (u.connection[index] >= units.value.length){
                u.connection.splice(index,1)
                continue
            }
            index += 1
        }
    })
})

function solve(){
    let history = {}
    let queue = [units.value.map(u=>u.state).join("")]
    history[queue[0]] = {}
    while (queue.length){
        let current = queue.shift()
        if (current.split("").every(v=>v==0)){
            let cvt = repr=>repr.split("").map(i=>unit_states.value[i].label).join("")
            let seq = []
            let pre_action = null
            while (current){
                let {action,prev} = history[current]
                seq.unshift({label : cvt(current),action : pre_action})
                pre_action = action
                current = prev
            }
            seq[seq.length-1].done = true
            result.value = seq
            return
        }
        for (let i = 0; i < units.value.length; ++i){
            let next = Unit.action(current,i)
            if (history[next] === undefined){
                history[next] = {prev : current, action : i}
                queue.push(next)
            }
        }
    }
    console.log(history)
    result.value = false
}

</script>

<style scoped>
    .unit-form {
        margin-left : 1em
    }
    .connect-unit {
        width : 450px;
    }

    .unit {
        display: inline-block;
        border-radius: 2px;
        border : 1px solid #dcdfe6;
        height: 75px;
        width : 75px;
        line-height: 75px;
        text-align: center;
        font-weight: 700;
        font-size: 30px;
    }

    .unit.active {
        border-color : #409EFF;
        border-width: 2px;
    }

    .unit.done {
        border-color : #67C23A;
        border-width: 2px;
    }

    .action {
        display: flex;
        align-items: center;
        margin : 20px 40px
    }
    .action>i{
        font-weight: 700;
        font-size: 35px;
        margin-right: 10px;
    }
</style>