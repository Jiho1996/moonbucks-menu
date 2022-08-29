import View from "./Core/View.js";

export default class MenuList extends View{

    // constructor ($Node, $props, $category){
    //     this.$Node = $Node
    //     this.$props = $props
    //     this.$category = $category
    //     this.template();
    // }
    template (){
        return this.$props[this.$category]
        .map((item) => {
            return `
            <li data-menu-id ="${item.id}"class="menu-list-item d-flex items-center py-2">
            <span class="w-100 pl-2 menu-name ${item.isSoldOut ? "sold-out" : ""}">${item.name}</span>
            <button
                type="button"
                class="bg-gray-50 text-gray-500 text-sm mr-1 menu-sold-out-button"
            >
                품절
            </button>
            <button
                type="button"
                class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"
            >
                수정
            </button>
            <button
                type="button"
                class="bg-gray-50 text-gray-500 text-sm menu-remove-button"
            >
                삭제
            </button>
            </li>
            ` 
    })
    .join("");
    }
}