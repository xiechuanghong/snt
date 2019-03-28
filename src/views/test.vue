<template>
    <div class="text">
        <p>{{message | test}}</p>
    </div>
</template>
<script>
    export default{
        data(){
            return{
                message:"ppp"
            }
        },
        filters:{
            test:function(value){
                return value+'a'
            }
        }
    }
</script>
<style>

</style>