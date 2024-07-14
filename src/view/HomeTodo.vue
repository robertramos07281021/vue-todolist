<script setup>
import axios from 'axios';
import { reactive, onMounted, ref } from 'vue'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import 'primeicons/primeicons.css'
import { useRoute } from 'vue-router'

const route = useRoute();

const state = reactive({
  todos: [],
  isLoading: true
})


onMounted(async() => {
  try {
    const response = await axios.get('/api/todo')
    state.todos = response.data.todos;    
  } catch (error) {
    console.log('Error: ', error)
  } finally {
    state.isLoading = false
  }
})





const forUpdate = ref(false)
const todoInfo = reactive({
  id: '',
  name: ''
})

const updateThisTodo = (id,name) => {
  forUpdate.value = !forUpdate.value
  todoInfo.id = id;
  todoInfo.name = name
}

const handleUpdate = async() => {
  const updateTodo = {
    name: todoInfo.name
  }
  try {
    await axios.put(`/api/update/${todoInfo.id}`, updateTodo)
    route.push('/todo')
  } catch (error) {
    console.error('Error updating todo: ', error)
  }
}



const form = reactive({
  name: '',
  done: null,
})

const handleAddTodo = async() => {
  const newTodo = {
    name: form.name
  }
  try {
    await axios.post('/api/add',newTodo)
    route.push('/todo')
  } catch (error) {
    console.error('Error adding todo: ', error)
  }
}



const deleteTodo = async(id) => {
  try {
  await axios.delete(`/api/delete/${id}`)
  route.push('/todo')
  } catch(error) {
    console.error('Error deleting todo: ', error)
  }
}

const reload = () => {
  location.reload()
}
 

const updateTodoDone = async(id,done, name) => {
  const thisIsDone = {
    done: !done,
    name: name
  }
  try {
    await axios.put(`/api/update/${id}`,thisIsDone)
  } catch (error) {
    console.error('Error updating todo: ', error)
  }
}

</script>

<template>
  <div class="w-screen h-screen flex items-center justify-center todoBg bg-no-repeat">
      <main class="h-5/6 w-4/12 shadow-lg bg-gray-500/50 rounded-xl" >
        <div v-if="state.isLoading" class="text-center text-gray-500 py-6">
          <PulseLoader />
        </div>
        <h1 class="text-white font-bold text-5xl text-center pt-5">To Do List</h1>

        <form @submit="handleUpdate" class="flex gap-5 justify-center mt-3" v-if="forUpdate">
            <input type="text" name="todoName" id="todoName" class="p-1 rounded-md ring ring-blue-200" v-model="todoInfo.name" required>
            <button type="submit" class='w-16 rounded text-white bg-blue-500 ring ring-white/60 '>Update</button>
            <p @click="reload" type="submit" class='w-16 rounded text-white bg-blue-500 ring ring-white/60 flex items-center justify-center cursor-pointer'>Cancel</p>
        </form>
        <form @submit="handleAddTodo" class="flex gap-5 justify-center mt-3" v-else>
            <input type="text" name="todoName" id="todoName" class="p-1 rounded-md ring ring-blue-200" v-model="form.name" required>
            <button type="submit" class='w-16 rounded text-white bg-blue-500 ring ring-white/60 '>Add</button>
        </form>
        <div class="flex justify-center flex-col items-center gap-2 mt-5">
            <div v-for="todo in state.todos" :key="todo._id" :class="[`flex`, `justify-between`, `items-center`, `px-10`, `border`, `w-10/12`, `bg-white`, `rounded-md`,'py-1', todo._id === todoInfo.id ? 'bg-green-500 text-white' : '']"> 
                <form @submit="updateTodoDone(todo._id,todo.done,todo.name)" >
                  <button type="submit">
                      <i :class="[`pi`, `pi-check`, `border`, `p-1`, `rounded`, todo.done === true ? 'bg-blue-500 text-white border-blue-200' : 'border-black bg-white text-black']"></i>
                  </button>
                </form>
  
              <p :class="[todo.done ? 'line-through': '', 'font-bold']"> {{ todo.name }}</p>
              <div class="flex gap-5">

                <i class="pi pi-pen-to-square text-lg text-green-500 bg-white p-2 rounded-md cursor-pointer" @click="updateThisTodo(todo._id,todo.name)"></i>
                
                <form @submit="deleteTodo(todo._id)">
                  <button type="submit">
                    <i class="pi pi-trash text-lg text-red-500 bg-white p-2 rounded-md" ></i>
                  </button>
                </form>
              </div>
            </div>
        </div>
      </main>
  </div>

</template>

