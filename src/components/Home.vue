<template>
    <div>
        <v-container>

            <v-layout row wrap pa-5 mb-3>
                <v-flex pa-2 xs12 sm6 class="text-center text-sm-right">
                    <v-btn large router to="/meetups" class="primary">Explore Meetups</v-btn>
                </v-flex>
                <v-flex pa-2 xs12 sm6 class="text-center text-sm-left">
                    <v-btn large router to="/meetup/new" primary>Create New Meetup</v-btn>
                </v-flex>

            </v-layout>
            <v-layout>
                <v-flex xs12 class="text-center">

                    <v-progress-circular
                        indeterminate
                        class="primary-text"
                        :width="7"
                        :size="70"
                        v-if="loading"
                    
                    ></v-progress-circular>

                </v-flex>

            </v-layout>

            <v-layout row wrap pt-3 pb-3 v-if="!loading">
                <v-flex xs12 class="text-center">
                    <v-carousel style="cursor: pointer;">
                        <v-carousel-item
                        v-for="meetup in meetups"
                        :src="meetup.imageUrl"
                        :key="meetup.id"
                        @click="onLoadMeetup(meetup.id)"
                        reverse-transition="fade-transition"
                        transition="fade-transition"
                        >
                            <div class="title">{{meetup.title}}</div>
                        </v-carousel-item>
                    </v-carousel>
                </v-flex>
            </v-layout>
            <v-layout row wrap class="mt-2" v-if="!loading">
                <v-flex xs12 class="text-center">
                    <p>Join the awesome meetup</p>
                </v-flex>
            </v-layout>
        </v-container>

    </div>
</template>



<script>

export default {
    computed: {
        meetups () {
            return this.$store.getters.featuredMeetups
        },
        loading () {
            return this.$store.getters.loading
        }
    },
    methods: {
        onLoadMeetup(id) {
            this.$router.push('/meetups/' + id)  
        }
    }
}


</script>

<style scoped>

    .title {
        position: absolute;
        bottom: 50px;
        background-color: rgba(0, 0, 0, 0.5);
        color: white;
        font-size: 1.5em !important;
    }
</style>