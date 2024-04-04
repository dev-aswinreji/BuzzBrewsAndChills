

const arr = [1,2,3,4,5]

// let count = 0
// const data = arr.map((num)=>{
//      function recursion (){
//         count = 0
//         setTimeout(()=>console.log(num),2000)
//      }
//      if(count > arr.length){
//          recursion()
//      }
//      recursion()
// })
// // setInterval(()=>console.log(data,count++))


for(let i = 0; i<arr.length;i++){
    setTimeout(()=>{
    console.log(arr[i])       
    },i*1000)
}


// for(let i )