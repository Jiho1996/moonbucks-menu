export default class View {
    constructor($targetNode, $props, $category){
        this.$targetNode = $targetNode
        this.$props = $props
        this.$category = $category
        
        this.render();
    }

    template (){return '';}

    render(){
        this.$targetNode.innerHTML = this.template();
        this.mount();
    }

    mount(){}

}