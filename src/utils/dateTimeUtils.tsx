
export const getDate = () => {
    // Get the current date and time
    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}-${String(
        currentDate.getMonth() + 1
    ).padStart(2, "0")}-${String(currentDate.getDate()).padStart(
        2,
        "0"
    )} ${String(currentDate.getHours()).padStart(2, "0")}:${String(
        currentDate.getMinutes()
    ).padStart(2, "0")}:${String(currentDate.getSeconds()).padStart(2, "0")}`;
    return formattedDate;
}

export const getTime = () => { }
export const getDateTime = (

) => {
    // Get the current date and time
    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}-${String(
        currentDate.getMonth() + 1
    ).padStart(2, "0")}-${String(currentDate.getDate()).padStart(
        2,
        "0"
    )} ${String(currentDate.getHours()).padStart(2, "0")}:${String(
        currentDate.getMinutes()
    ).padStart(2, "0")}:${String(currentDate.getSeconds()).padStart(2, "0")}`;
    console.log ("Formattted current Date time " , formattedDate)
    return formattedDate;
}

export const formatDateTime = (dateStr : string )=>{
    const currentDate = new Date(dateStr);
    const formattedDate = `${currentDate.getFullYear()}-${String(
        currentDate.getMonth() + 1
    ).padStart(2, "0")}-${String(currentDate.getDate()).padStart(
        2,
        "0"
    )} ${String(currentDate.getHours()).padStart(2, "0")}:${String(
        currentDate.getMinutes()
    ).padStart(2, "0")}:${String(currentDate.getSeconds()).padStart(2, "0")}`;
    console.log ("Formattted current Date time " , formattedDate)
    console.log ("From Date : ", dateStr, "; Formatted Date Str :", formattedDate)
    return formattedDate;
}