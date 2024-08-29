export function GetSize (strNumber) {  
    try {
        return parseFloat(strNumber) / 100
    } catch {
        return "Error  GetSize"
    }
}


export function CalculateSize (strNumber,qty) {  
    
    let totalQty = 0;
    try {

        let prodSizeChar = strNumber.slice(-9);
        //console.log('prodSizeChar = ' + prodSizeChar)
        let character = prodSizeChar.slice(2,3);
        //console.log('character = ' + character)
        let size = prodSizeChar.slice(0,2);
        //console.log('size = ' + size)

        if(size.slice(0,1) == 0 ) {
          size = size.slice(1,2)
        }
        

        if(character.toLowerCase() == 'c') {
            totalQty = qty  * size;
        }
        else if(character.toLowerCase() == 'p') {
            totalQty = qty  * size * 2;
        }
        else if(character.toLowerCase() == 't') {
            totalQty = qty  * size * 3;
        }
        // console.log('Qty = ' + qty)
        // console.log('totalQty = ' + totalQty)
        // console.log('character = ' + character.toLowerCase())

        return totalQty;

    } catch {
        return "Error  CalculateSize"
    }
}

export function CalculateBackSize (strNumber,qty) {  
    
    let totalQty = 0;
    try {

        let prodSizeChar = strNumber.slice(-9);
        //console.log('prodSizeChar = ' + prodSizeChar)
        let character = prodSizeChar.slice(2,3);
        //console.log('character = ' + character)
        let size = prodSizeChar.slice(0,2);
        //console.log('size = ' + size)

        if(size.slice(0,1) == 0 ) {
          size = size.slice(1,2)
        }
        

        if(character.toLowerCase() == 'c') {
            totalQty = qty  / size;
        }
        else if(character.toLowerCase() == 'p') {
            totalQty = qty  / size / 2;
        }
        else if(character.toLowerCase() == 't') {
            totalQty = qty  / size / 3;
        }
        
        return totalQty;

    } catch {
        return "Error  CalculateSize"
    }
}


export function FormatDate (date) {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const year = date.getFullYear();
      
        return `${year}-${month}-${day}`;
}


export const TypeWire = {
	Single: "S",
	Multi: "M",
}