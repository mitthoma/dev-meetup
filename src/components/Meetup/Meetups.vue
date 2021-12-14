<template>
    <v-container>
        <v-layout 
        row 
        wrap 
        mt-5
        mb-3
        v-for="meetup in meetups"
        :key="meetup.id"
        >
            <v-flex xs12 sm10 md10 offset-sm1 offset-md1> 
                <v-card
                 class="primary"
                 >
                    <v-container fluid>
                        <v-layout row>
                            <v-flex xs5 sm4 md3>
                            
                                    <v-img style="height: 100% !important;" :src="meetup.imageUrl"></v-img>

                            </v-flex>
                            <v-flex xs7 sm8 md9>
                                <v-card-title primary-title>
                                    <div>
                                        <h5 class="white--text">{{meetup.title}}</h5>
                                        <div>
                                            <!-- {{new Date(meetup.date) | dateFormat('MMMM DD, YYYY  HH:MM') }} -->
                                            {{ meetup.date | date }}
                                        </div>
                                    </div>
                                </v-card-title>
                                <v-card-actions>

                                    <v-btn text :to="'/meetups/' + meetup.id">
                                        <v-icon left>arrow_forward</v-icon>
                                        View Meetup
                                    </v-btn>
                                </v-card-actions>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>

export default {
    computed: {
        meetups () {
            return this.$store.getters.loadedMeetups
        }
    }
}

</script>