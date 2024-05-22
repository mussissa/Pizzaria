


class AlgoriService{

    
    execute(s:string){
        let pilha1 = []
        let pilha2= []

      for ( let k=0; k< s.length; k++){
        if (s[k] === '('){
            pilha1.push(s[k]) 
        }  

        if (s[k] === '{'){
            pilha1.push(s[k]) 
        }                 
            
        if (s[k] === '['){
            pilha1.push(s[k]) 
        }    

        if (s[k] === ')'){
            pilha2.push(s[k]) 
        }  

        if (s[k] === '}'){
            pilha2.push(s[k]) 
        }                 
            
        if (s[k] === ']'){
            pilha2.push(s[k]) 
        }    



      }

      console.log(pilha1)
      console.log(pilha2)



      let pilha1Copia = pilha1.slice()

      console.log(pilha1Copia)

      pilha1Copia.forEach(function(elemento){

            
            if(['(','[','{'].includes(elemento)){
                
                let parentese = pilha2.indexOf(')')
                if(parentese!==-1){
                    pilha1.splice(pilha1.indexOf('('),1)
                    pilha2.splice(parentese, 1)
                }

                let colchete = pilha2.indexOf(']')
                if(colchete!==-1){
                    pilha1.splice(pilha1.indexOf('['),1)
                    pilha2.splice(colchete, 1)
                }



                let chave = pilha2.indexOf('}')
                if(chave!==-1){
                    pilha1.splice(pilha1.indexOf('['),1)
                    pilha2.splice(chave, 1)
                }
                
            }
        
      })



        if(pilha1.length ===0 && pilha2.length===0){
            return true 
        }else{
            return false
        }
 
        
    }
}

export {AlgoriService}