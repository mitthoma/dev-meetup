<template>
    <v-container>
        <v-layout v-if="loading">
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
        <v-layout v-else row wrap mt-5>
            <v-flex xs12>
                <v-card>
                    <v-card-title>
                        <h6 class="primary--text">{{meetup.title}}</h6>

                        <template v-if="userIsCreator">
                            <v-spacer></v-spacer>
                            <app-edit-meetup-details-dialog :meetup="meetup"></app-edit-meetup-details-dialog>
                        </template>
                    </v-card-title>
                        <v-img height="400px" :src="meetup.imageUrl"></v-img>
                    <v-card-text>
                        <div class="info--text">
                            {{ meetup.date | date }}
                        </div>


                        <!-- EDIT THIS LATER ---- ISSUES WITH VERSIONING IN VUETIFY -->
                        <!-- <div>
                            <app-edit-meetup-date-dialog
                                :meetup="meetup" v-if="userIsCreator"
                            >
                            </app-edit-meetup-date-dialog>
                        </div> -->




                        <div>
                            {{meetup.description}}
                        </div>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <app-meetup-register-dialog
                            v-if="userIsAuthenticated && !userIsCreator"
                            :meetupId="meetup.id">
                        </app-meetup-register-dialog>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        props: ['id'],
        computed: {
            meetup () {
                return this.$store.getters.loadedMeetup(this.id)
            },
            userIsAuthenticated () {
                return this.$store.getters.user !== null && this.$store.getters.user !== undefined
            },
            userIsCreator () {
                if (!this.userIsAuthenticated) {
                    return false
                }
                return this.$store.getters.user.id === this.meetup.creatorId
            },
            loading () {
                return this.$store.getters.loading
            }
        }
    }
</script>