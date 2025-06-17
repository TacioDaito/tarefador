import axios from 'axios'
// import clientState from '../stores/clientState'
// import router from '../router'
import { ref } from 'vue'

const tasks = ref()
const get = async () => {
    try {
        const response = await axios.get('/api/tasks')
        tasks.value = response.data.tasks
        console.log(tasks)
    } catch (error) {
    }
}

get()


export default tasks
