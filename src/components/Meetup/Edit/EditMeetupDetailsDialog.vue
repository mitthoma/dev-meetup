<template>
  <v-row >
    <v-dialog
      v-model="dialog"
      persistent
      max-width="290"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-spacer></v-spacer>
        <v-btn
          color="accent"
          dark
          v-bind="attrs"
          v-on="on"
          fab
          mt-3
          mb-3
        >
          <v-icon>edit</v-icon>
        </v-btn>
      </template>
      <v-card>
        
        <v-container>

            <v-layout row wrap>
                <v-flex xs12>

                    <v-card-title>Edit Meetup</v-card-title>

                </v-flex>
            </v-layout>
            <v-divider></v-divider>
            <v-layout row wrap>
                <v-flex xs12>
                    <v-card-text>
                        <v-text-field
                            name="title"
                            label="Title"
                            id="title"
                            v-model="editedTitle"
                            required
                        ></v-text-field>

                    <v-textarea
                            name="description"
                            label="Description"
                            id="description"
                            v-model="editedDescription"
                            required
                            multi-line
                            auto-grow
                        ></v-textarea>


                    </v-card-text>
                </v-flex>
            </v-layout>
            <v-divider></v-divider>
            <v-layout row wrap>
                <v-flex xs12>
                    <v-card-actions>
                        <v-btn @click="dialog = false" text class="primary">Close</v-btn>
                        <v-btn @click="onSaveChanges" text class="primary">Save</v-btn>

                    </v-card-actions>

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
        editedTitle: this.meetup.title,
        editedDescription: this.meetup.description,
      }
    },
    methods: {
        onSaveChanges () {
            if (this.editedTitle.trim() === '' || this.editedDescription.trim() === '') {
                return
            }
            this.dialog = false
            this.$store.dispatch('updateMeetupData', {
                id: this.meetup.id,
                title: this.editedTitle,
                description: this.editedDescription
            })

        }
    }
  }
</script>