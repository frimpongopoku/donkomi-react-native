import FormGenerator from "../form generator/FormGenerator";

export const FORM_JSONS = {
  routines: [
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
      placeholder: "Which vendor sells this stock",
      label: "Vendors",
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
      name: "routine_description",
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
      fieldType: FormGenerator.TEXTBOX,
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
      keyboardType: "number",
      required: true,
    },

    {
      fieldType: FormGenerator.DROPDOWN,
      placeholder: "Choose vendors you are going to be buying from",
      label: "Vendors",
      name: "Vendors",
      dbName: "vendors",
      required: true,
    },
    {
      fieldType: FormGenerator.IMAGE,
      label: "Image of stock",
      name: "image",
      dbName: "image",
    },
  ],
};
