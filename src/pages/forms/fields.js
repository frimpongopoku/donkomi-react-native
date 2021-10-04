import FormGenerator from "../form generator/FormGenerator";

export const FORM_JSONS = {
  routine: [
    {
      fieldType: FormGenerator.FIELDS.TEXTBOX,
      placeholder: "Eg. Athena's trip to Ricardos",
      label: "Trip Name",
      name: "trip name",
      dbName: "trip_name",
      required: true,
    },
    {
      fieldType: FormGenerator.FIELDS.DROPDOWN,
      label: "Choose vendors you will be buying from on this trip",
      name: "vendors",
      data: ["McDonalds", "Ricardos", "KFC"],
      dbName: "vendors",
      multiple: true,
      required: true,
    },
    {
      fieldType: FormGenerator.FIELDS.TEXTAREA,
      placeholder:
        "What should we tell people when we notify them about your trip?",
      label: "Trip description, which shops are you visiting?",
      name: "description",
      dbName: "routine_description",
      numberOfLines: 6,
      required: true,
    },
    {
      fieldType: FormGenerator.FIELDS.IMAGE,
      label: "Cover photo",
      name: "image",
      dbName: "image",
    },
  ],

  stock: [
    {
      fieldType: FormGenerator.FIELDS.TEXTBOX,
      placeholder: "Eg. Athena's trip to Ricardos",
      label: "Routine Name",
      name: "Routine Name",
      dbName: "routine_name",
      required: true,
    },
    {
      fieldType: FormGenerator.FIELDS.TEXTBOX,
      placeholder: "Eg. 210",
      label: "Price",
      name: "stock name",
      dbName: "stock_name",
      keyboardType: "numeric",
      required: true,
    },

    {
      fieldType: FormGenerator.FIELDS.DROPDOWN,
      placeholder: "Which vendor sells this stock",
      label: "Vendors",
      name: "vendors",
      data: ["McDonalds", "Ricardos", "KFC"],
      dbName: "vendors",
      required: true,
    },
    {
      fieldType: FormGenerator.FIELDS.IMAGE,
      label: "Image of stock",
      name: "image",
      dbName: "image",
    },
  ],
  vendor: [
    {
      fieldType: FormGenerator.FIELDS.TEXTBOX,
      placeholder: "Eg. McDonalds",
      label: "Vendor Name",
      name: "Vendor Name",
      dbName: "vendor_name",
      required: true,
    },
    {
      fieldType: FormGenerator.FIELDS.TEXTBOX,
      placeholder:
        "Briefly describe your vendor. Eg. 'McDonalds sells burgers and chicken",
      label: "Vendor description",
      name: "Vendor description",
      dbName: "vendor_description",
      required: true,
    },

    {
      fieldType: FormGenerator.FIELDS.IMAGE,
      label: "Vendor cover photo",
      name: "image",
      dbName: "image",
    },
  ],
  shop: [
    {
      fieldType: FormGenerator.FIELDS.TEXTBOX,
      placeholder: "Eg. Pongo's Indomie Shop",
      label: "Name of your shop",
      name: " Shop Name",
      dbName: "shop_name",
      required: true,
    },
    {
      fieldType: FormGenerator.FIELDS.TEXTAREA,
      placeholder:
        "Eg. Ama's Jollof House sells jollof rice made the ghanaian way",
      label: "About your shop",
      name: "shop description",
      dbName: "about_shop",
      numberOfLines: 6,
      required: true,
    },
    {
      fieldType: FormGenerator.FIELDS.IMAGE,
      label: "Your shop's cover photo",
      name: "image",
      dbName: "image",
    },
  ],
  "shop-item": [
    {
      fieldType: FormGenerator.FIELDS.TEXTBOX,
      placeholder: "Eg. Leggings",
      label: "Name of item",
      name: " Item Name",
      dbName: "item_name",
      required: true,
    },
    {
      fieldType: FormGenerator.FIELDS.TEXTBOX,
      placeholder: "Eg. Large, or XXL",
      label: "Size",
      name: " Size",
      dbName: "item_size",
    },
    {
      fieldType: FormGenerator.FIELDS.TEXTBOX,
      placeholder: "Eg. Curry flavoured, or Stripped",
      label: "Variation",
      name: "Variation",
      dbName: "item_variation",
    },
    {
      fieldType: FormGenerator.FIELDS.TEXTBOX,
      placeholder: "Eg. 210",
      label: "Price in Rupees(Rs)",
      name: "Item Price",
      dbName: "item_price",
      keyboardType: "numeric",
      required: true,
    },
    {
      fieldType: FormGenerator.FIELDS.IMAGE,
      label: "A Photo of item",
      name: "image",
      dbName: "image",
      required: true,
    },
  ],

  applications: [
    {
      fieldType: FormGenerator.FIELDS.IMAGE,
      name: "Profile Picture",
      dbName: "profile_picture",
    },
  ],
};
