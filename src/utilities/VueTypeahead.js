export default {
  data() {
    return {
      items: [],
      query: '',
      current: -1,
      loading: false,
      engine: null,
    }
  },

  computed: {
    hasItems() {
      return this.items.length > 0
    },

    isEmpty() {
      return !this.query
    },

    isDirty() {
      return !!this.query
    }
  },

  methods: {

  }
}
