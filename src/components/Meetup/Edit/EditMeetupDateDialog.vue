<template>
  <v-row >
    <v-dialog
      v-model="dialog"
      persistent
      max-width="350"
      height="500"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-spacer></v-spacer>
        <v-btn
          color="accent"
          dark
          v-bind="attrs"
          v-on="on"
          mt-3
          mb-3
        >Edit Date</v-btn>
      </template>
      <v-card>
        <v-container>
            <v-layout row wrap>
                <v-flex xs12>
                    <v-card-title>Edit Meetup Date</v-card-title>
                </v-flex>
            </v-layout>
            <v-divider></v-divider>
            <v-layout row wrap>
                <v-flex xs12 ma-5>

                     

                            <template>

                                <v-row justify="center">

                                    <v-date-picker v-model="editableDate">

                                

                                </v-date-picker>
                                </v-row>
                            </template>
                                
                                <!-- <template  >
                                        <v-btn class="primary" text @click.native="dialog=false">Close</v-btn>
                                        <v-btn class="accent" text @click.native="onSaveChanges">Save</v-btn>
                                    </template>   -->



                </v-flex>


            </v-layout>
            
        </v-container>

        
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
    export default {
        props: ['meetup'],
        data () {
            return {
                dialog: false,
                editableDate: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)
            }
        },
        methods: {
            onSaveChanges () {
                const newDate = new Date(this.meetup.date)
                const newDay = new Date(this.editableDate).getUTCDate()
                const newMonth = new Date(this.editableDate).getUTCMonth()
                const newYear = new Date(this.editableDate).getUTCFullYear()
                newDate.setUTCDate(newDay)
                newDate.setUTCMonth(newMonth)
                newDate.setUTCFullYear(newYear)

                this.$store.dispatch('updateMeetupDate', {
                    id: this.meetup.id,
                    date: newDate
                })
            }
        },
        created () {
            this.editableDate = new Date(this.meetup.date)
        }
    }

</script>