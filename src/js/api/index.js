const BASE_URL = "http://localhost:3000/api"


const makeError = (response) => {
    if (!response){
        alert("에러가 발쌩!")
    }
}
export const MenuApi = {
    async getAllMenuByCategory(category){
        const response = await fetch(`${BASE_URL}/category/${category}/menu`);
        return response.json();
    },
    async createMenu(category, name){
        const response = await fetch(`${BASE_URL}/category/${category}/menu`, {
            method: "POST",
            headers:{
                "Content-Type" : "application/json",
            },
            body : JSON.stringify({name}),
        });
        makeError(response.ok);
    },
    async UpdateMenu(category, name, menuId){
        const response = await fetch(`${BASE_URL}/category/${category}/menu/${menuId}`,{
            method : "PUT",
            headers:{
                "Content-Type" : "application/json",
            },
            body : JSON.stringify({name}),
        });
        makeError(response.ok);
    },
    async toggleSoldOutMenu(category, menuId){
        const response = await fetch(`${BASE_URL}/category/${category}/menu/${menuId}/soldout`,{
            method : "PUT",
        });
        makeError(response.ok);
    },
    ///category/:category/menu/:menuId
    async deleteMenu(category, menuId){
        const response = await fetch (`${BASE_URL}/category/${category}/menu/${menuId}`,{
            method : "DELETE",
        });
        makeError(response.ok);
    }
}