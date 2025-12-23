
import { ref } from 'vue'
import { getCategoryLayAPI } from '@/apis/layout';
import { defineStore } from 'pinia';

export const useCategoryStore = defineStore('category', () => {


const categoryList = ref([])

const getCategory = async()=>{
const res =  await getCategoryLayAPI()
console.log(res)
categoryList.value = res.result
}
  return {
    categoryList,
    getCategory
  }
})