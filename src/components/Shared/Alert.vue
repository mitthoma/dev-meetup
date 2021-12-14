<template mt-5>
    <v-alert
        prominent
        dismissible
        text
        mt-5
        type="error"
        @input="onClose"
        :value="true"
        >
            {{text}}
        </v-alert>
</template>


<script>

export default {
    props: ['text'],
    methods: {
        onClose() {
            this.$emit('dismissed');
        }
    }
}

</script>