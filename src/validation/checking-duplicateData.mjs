


export async function  checkDataDuplication(datasInDataBase){
    return datasInDataBase !== null ? 'EXIST' : 'NOT EXIST'
}