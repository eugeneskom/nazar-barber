export function isFutureDateTime(datetimeString:string) {

  console.log(datetimeString, 'datetimeString')

  const currentDT = new Date();
  
  try {
    const providedDT = parseDateTime(datetimeString);
  
    console.log('providedDT',providedDT)
    
    if(isNaN(providedDT.getTime())) {
      throw new Error('Invalid datetime format');
    }
  
    return currentDT < providedDT;
    
  } catch (error) {
    return false;
  }

}

function parseDateTime(dateTimeStr: string) {
  return new Date(dateTimeStr);
}
