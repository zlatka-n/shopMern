export const ADDRESSES = "Adresses";
export const ORDERS = "Orders";
export const PERSONAL_DETAILS = "Personal details";

export const sidebarItems = [
 {
  link: "address",
  name: ADDRESSES,
 },
 {
  link: "details",
  name: PERSONAL_DETAILS,
 },
 {
  link: "orders",
  name: ORDERS,
 },
];

enum EditAddress {
 Address = "Address",
 ZipCode = "Zip code",
 Country = "Country",
 City = "City",
 AdditionalInfo = "Additional info",
}

export const editAddressData = [
 {
  name: EditAddress.Address,
  value: "address",
 },
 {
  name: EditAddress.City,
  value: "city",
 },
 {
  name: EditAddress.ZipCode,
  value: "zipCode",
 },
 {
  name: EditAddress.Country,
  value: "country",
 },
 {
  name: EditAddress.AdditionalInfo,
  value: "additionalInfo",
 },
];
