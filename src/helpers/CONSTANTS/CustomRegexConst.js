"use strict";

// ^ and $: Assert the start and end of the string.
// [a-zA-Z0-9\s,.'-]: Allow letters (both uppercase and lowercase), digits, spaces, commas, periods, apostrophes, and hyphens.
// 1,100}: Limit the length of the address to between 1 and 100 characters.
const addressPattern = /^[a-zA-Z0-9\s,.'-]{1,250}$/;

// ^: Start of the string.
// (?!.*[<>(){}[\];:'"`\/\\]): Ensure the string does not contain any of these characters: <>(){}[];:'"`/\.
// If no specific pattern is required then use this regex to prevent from JS injection on user input filed.
const notAllowedChars = /^(?!.*[<>(){}[\];:'"`\/\\]).*$/;

module.exports = { addressPattern, notAllowedChars };
