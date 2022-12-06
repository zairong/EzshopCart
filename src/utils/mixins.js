export const formatNumberFilters = {
  filters: {
    formatNumber(num) {
      return `$${new Intl.NumberFormat().format(num)}`
    }
  },
}

const STORAGE_KEY = 'form-info'
export const formWatch = {
  watch: {
    form: {
      handler() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.form))
      },
      deep: true
    }
  }
}