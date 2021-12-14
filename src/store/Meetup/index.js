

// web version 9 below -----
// import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from "firebase/auth";
import { getDatabase, ref, push, set} from 'firebase/database'

// using web version 8
import firebase from 'firebase/compat/app'
import 'firebase/compat/database'
import 'firebase/storage';  


export default {
  state: {
    loadedMeetups: [
      {
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/47/New_york_times_square-terabass.jpg',
        id: 'afajfjadfaadfa323',
        title: 'Meetup in New York',
        date: new Date(),
        location: 'New York',
        description: 'New York, New York!'
      },
      {
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/7a/Paris_-_Blick_vom_gro%C3%9Fen_Triumphbogen.jpg',
        id: 'aadsfhbkhlk1241',
        title: 'Meetup in Paris',
        date: new Date(),
        location: 'Paris',
        description: 'It\'s Paris!'
      }
    ]
  },
  mutations: {
    
    setLoadedMeetups (state, payload) {
      state.loadedMeetups = payload
    },
    createMeetup (state, payload) {
      state.loadedMeetups.push(payload)
    },
    updateMeetup (state, payload) {
      const meetup = state.loadedMeetups.find(meetup => {
        return meetup.id === payload.id
      })
      if (payload.title) {
        meetup.title = payload.title
      }
      if (payload.description) {
        meetup.description = payload.description
      }
      if (payload.date) {
        meetup.date = payload.date
      }
    }
  },
  actions: {
    loadMeetups ({commit}) {
      commit('setLoading', true)
      firebase.database().ref('meetups').once('value')
        .then((data) => {
          const meetups = []
          const obj = data.val()
          for (let key in obj) {
            meetups.push({
              id: key,
              title: obj[key].title,
              description: obj[key].description,
              imageUrl: obj[key].imageUrl,
              date: obj[key].date,
              location: obj[key].location,
              creatorId: obj[key].creatorId
            })
          }
          commit('setLoadedMeetups', meetups)
          commit('setLoading', false)
        })
        .catch(
          (error) => {
            console.log(error)
            commit('setLoading', false)
          }
        )
    },
    createMeetup ({commit, getters}, payload) {
    //   const meetup = {
    //     title: payload.title,
    //     location: payload.location,
    //     imageUrl: payload.imageUrl,
    //     description: payload.description,
    //     date: payload.date.toISOString(),
    //     creatorId: getters.user.id
    //   }
    //   let imageUrl
    //   let key
    //   firebase.database().ref('meetups').push(meetup)
    //     .then((data) => {
    //       key = data.key
    //       commit('createMeetup', {
    //         ...meetup,
    //         imageUrl: imageUrl,
    //         id: key
    //       })
    //     })
    //     .catch((error) => {
    //       console.log(error)
    //     })

         // console.log(typeof(payload.date))
         const meetup = {
            title: payload.title,
            location: payload.location,
            imageUrl: payload.imageUrl,
            description: payload.description,
            date: payload.date.toISOString(),
            creatorId: getters.user.id
        }
        const database = getDatabase();
        const myPush = push(ref(database, 'meetups'))
        set(myPush, meetup)
        .then((data) => {
            const key = myPush.key
            console.log(data)
            commit('createMeetup', {
                ...meetup,
                id: key
            })
        })
        .catch ((error) => {
            console.log(error)
        })
    },
    updateMeetupData ({commit}, payload) {
      commit('setLoading', true)
      const updateObj = {}
      if (payload.title) {
        updateObj.title = payload.title
      }
      if (payload.description) {
        updateObj.description = payload.description
      }
      if (payload.date) {
        updateObj.date = payload.date
      }
      firebase.database().ref('meetups').child(payload.id).update(updateObj)
        .then(() => {
          commit('setLoading', false)
          commit('updateMeetup', payload)
        })
        .catch(error => {
          console.log(error)
          commit('setLoading', false)
        })
    }
  },
  getters: {
    loadedMeetups (state) {
      return state.loadedMeetups.sort((meetupA, meetupB) => {
        return meetupA.date > meetupB.date
      })
    },
    featuredMeetups (state, getters) {
      return getters.loadedMeetups.slice(0, 5)
    },
    loadedMeetup (state) {
      return (meetupId) => {
        return state.loadedMeetups.find((meetup) => {
          return meetup.id === meetupId
        })
      }
    },
  }
}