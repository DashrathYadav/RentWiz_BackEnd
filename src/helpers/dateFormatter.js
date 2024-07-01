/**
 * * Function to format the incomming date.
 */

const dateFormatter = (date) => {
    // If the date is null then it will return null.
    if (date === null) {
      return null;
    }
    // Parse the input date string into a Date object
  
    const parsedDate = new Date(date);
  
    // Get the individual components of the date (year, month, and day)
    const year = parsedDate.getFullYear();
    const month = String(parsedDate.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(parsedDate.getDate()).padStart(2, "0");
  
    // Create the formatted date string in "YYYY-MM-DD" format
    const formattedDate = `${year}-${month}-${day}`;
  
    return formattedDate;
  };
  
  module.exports = dateFormatter;
  