<template>
    
         <div >
        <evaluation  v-for="(item,index) in evaluations" :key="index" :evaluation="item"/>
    </div>
    
</template>

<script>
// import Evaluation from '../components/Evaluation'
import Evaluation from './Evaluation.vue'
    export default {
       props: {
           evaluations: {
               type: Array,
           },
       },
       components: {
           Evaluation
       },
    }
</script>

<style scoped>

</style>