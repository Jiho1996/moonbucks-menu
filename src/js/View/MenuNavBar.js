import View from "./Core/View.js";
import {Icon, TranslateKR} from "../utils/constants.js";

export default class MenuNavBar extends View{

    template(){

        return Object.keys(this.$props).map((item) => {
            return `
            <button
                data-category-name="${item}"
                class="cafe-category-name btn bg-white shadow mx-1">
                ${Icon[item] ? Icon[item] : 'undefined'} ${TranslateKR[item] ? TranslateKR[item] : 'undefined' }
              </button>
              
            `
        }).join("")
        
        }
} 