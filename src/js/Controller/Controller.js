import { $ } from "../utils/dom.js";
import MenuNavBar from "../View/MenuNavBar.js";


export const handleMenuNavBar = (allMenuList) => {
    const $menuNavBar = $('.flex-wrap')
    new MenuNavBar($menuNavBar, allMenuList);
}