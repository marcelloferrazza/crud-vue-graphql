import { ref } from 'vue';

export const useNotify = () => { 
    const message = ref('');

    const successNotify = (message) => { 
        return  this.$notify({
                title: "Sucesso!",
                text: message,
                type: "success",
              });
        
    }

    const infoNotify = (message) => { 
        return  this.$notify({
                title: "Sucesso!",
                text: message,
                type: "success",
              });
    }


    const warnNotify = (message) => { 
        return this.$notify({
                title: "Sucesso!",
                text: message,
                type: "success",
              });
        
    }


return { successNotify, infoNotify, warnNotify, message}


}
