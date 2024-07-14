"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert("Properties", [
            {
                propertyId: 1,
                propertyName: "Property 1",
                propertyType: "Apartment",
                propertySize: "2BHK",
                propertyRent: 15000,
                propertyStatus: 1,
                propertyPic: "property1.jpg",
                propertyDescription: "Property 1 Description",
                propertyFacility: "Property 1 Facility",
                userId: 1,
                addressId: 1,
                note: "Property 1 Note",
            },
            {
                propertyId: 2,
                propertyName: "Property 2",
                propertyType: "Villa",
                propertySize: "3BHK",
                propertyRent: 25000,
                propertyStatus: 1,
                propertyPic: "property2.jpg",
                propertyDescription: "Property 2 Description",
                propertyFacility: "Property 2 Facility",
                userId: 2,
                addressId: 2,
                note: "Property 2 Note",
            },
            {
                propertyId: 3,
                propertyName: "Property 3",
                propertyType: "Independent House",
                propertySize: "4BHK",
                propertyRent: 35000,
                propertyStatus: 1,
                propertyPic: "property3.jpg",
                propertyDescription: "Property 3 Description",
                propertyFacility: "Property 3 Facility",
                userId: 3,
                addressId: 3,
                note: "Property 3 Note",
            },
        ]);
    }

    }