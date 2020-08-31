export async function noInteractionWait(time: number|string): Promise<void> {

    // Purpose of this function is to wait for time passed in seconds
    // time will be string if parsed via Step definition, hence the logic below to support both String and number types

    let ms = 0;
    if (typeof time === 'string' ) {
            ms = parseInt(time) * 1000;
    } else {
            ms = time;
    }
    return new Promise( resolve => setTimeout(resolve, ms) );
}