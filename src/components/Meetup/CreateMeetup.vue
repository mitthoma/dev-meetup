<template>
    <v-container>

        <v-layout row mt-5>

            <v-flex xs12 sm6 offset-sm3>
                <h4 dark>Create A New Meetup</h4>
            </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex xs12>
                <form @submit.prevent="onCreateMeetup">
                    <v-layout>
                        <v-flex xs12 sm6 offset-sm3>
                            <v-text-field
                                name="title"
                                label="Title"
                                id="title"
                                v-model="title"
                                required
                            ></v-text-field>
                        </v-flex>
                    </v-layout> 
                    <v-layout>
                        <v-flex xs12 sm6 offset-sm3>
                            <v-text-field
                                name="location"
                                label="Location"
                                id="location"
                                v-model="location"
                                required
                            ></v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout>
                    <v-flex xs12 sm6 offset-sm3>
                        


                        <!-- change image to web v 8 -->
                        <!-- <v-btn raised class="primary" @click="onPickFile">Upload Image</v-btn>
                        <input type="file" style="display: none" ref="fileInput" accept="image/*" @change="onFilePicked"> -->
                        <v-text-field
                            name="imageUrl"
                            label="Image URL"
                            id="imageUrl"
                            v-model="imageUrl"
                            required
                        ></v-text-field>




                    </v-flex>
                    </v-layout>
                    <v-layout>
                        <v-flex xs12 sm6 offset-sm3 pt-5>
                            <img 
                            :src="imageUrl" 
                            class="previewImage"
                            >
                        </v-flex>
                        </v-layout>
                    <v-layout>
                        <v-flex xs12 sm6 offset-sm3>
                            <v-textarea
                                name="description"
                                label="Description"
                                id="description"
                                v-model="description"
                                required
                                multi-line
                                auto-grow
                            ></v-textarea>
                        </v-flex>

                    </v-layout>

                    <v-layout row wrap>
                        <v-flex xs12 sm6 offset-sm3 pb-5 pt-5>

                            <h3>Choose a Data and Time</h3>

                        </v-flex>
                    </v-layout>

                     <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                        <h4>Choose a Data & Time</h4>
                        </v-flex>
                    </v-layout>
                    <v-layout row class="mb-2">
                        <v-flex xs12 sm6 offset-sm3>
                        <v-date-picker v-model="date"></v-date-picker>
                        </v-flex>
                    </v-layout>

                    <v-layout row mb-5>
                        <v-flex xs12 sm6 offset-sm3>

                            <v-time-picker
                                v-model="time"
                                format="24hr"
                                landscape
                                scrollable
                            ></v-time-picker>

                        </v-flex>
                    </v-layout>


                    <v-layout>
                        <v-flex xs12 sm6 offset-sm3 mb-10>

                            <v-btn type="submit" :disabled="!formIsValid" class="primary">

                                Create Meetup

                            </v-btn>
                        </v-flex>


                    </v-layout>

                </form>
            </v-flex>
        </v-layout>
    </v-container>
</template>



<script>

export default {
    data: () => ({
    
        title: '',
        location: '',
        imageUrl: '',
        description: '',
        // date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        date: new Date(),
        time: new Date()
  }),
  computed: {
      formIsValid () {
          return this.title !== '' 
          && this.location !== '' 
          && this.imageUrl !== '' 
          && this.description !== ''
      },
      submittableDateTime () {
        const date = new Date(this.date)
        if (typeof this.time === 'string') {
            const hours = this.time.match(/^(\d+)/)[1]
            const minutes = this.time.match(/:(\d+)/)[1]
            date.setHours(hours)
            date.setMinutes(minutes)
        } else {
            date.setHours(this.time.getHours())
            date.setMinutes(this.time.getMinutes())
        }
        
        return date
      }
  },
  methods: {
      onCreateMeetup () {
          if (!this.formIsValid) {
              return
          }
          const meetupData = {
              title: this.title,
              location: this.location,
              imageUrl: this.imageUrl,
              description: this.description,
              date: this.submittableDateTime
          }
          this.$store.dispatch('createMeetup', meetupData)
          this.$router.push('/meetups')
      }
  }
}
</script>

<style scoped>

    .previewImage {
        height: 200px;
        width: auto;
    }

</style>